using Descent.Web.Models;
using Microsoft.Azure;
using Microsoft.Azure.Documents;
using Microsoft.Azure.Documents.Client;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace Descent.Web.Managers

{
    public class AzureDocumentDbManager : IGamesDocumentDbManager
    {
        private readonly DocumentClient _documentClient;
        private readonly string _database;
        private readonly string _collection;

        public AzureDocumentDbManager()
        {
            _documentClient = new DocumentClient(new Uri(CloudConfigurationManager.GetSetting("db:uri", false)), CloudConfigurationManager.GetSetting("db:key", false));
            _database = CloudConfigurationManager.GetSetting("db:name", false);
            _collection = CloudConfigurationManager.GetSetting("db:collection", false);


            CreateDocumentCollectionIfNotExists(_documentClient, _database, _collection).GetAwaiter().GetResult();
        }

        public async Task AddGamesAsync(GamesModel games)
        {
            AssertEntity(games);

            try
            {
                Trace.TraceInformation($"Creating document: {JsonConvert.SerializeObject(games, Formatting.Indented)}");
                await _documentClient.CreateDocumentAsync(CreateCollectionUri(), games, null, true);
            }
            catch (Exception ex)
            {
                Trace.TraceError($"ERROR CREATING DOCUMENT: {ex}");
            }
        }

        public async Task UpdateGamesAsync(GamesModel games)
        {
            AssertEntity(games);

            try
            {
                Trace.TraceInformation($"Replacing document: {JsonConvert.SerializeObject(games, Formatting.Indented)}");
                GamesModel record = await GetRecord(games.Id);

                if (record == null)
                {
                    Trace.TraceWarning($"Document not found");
                    await AddGamesAsync(games);
                }
                else
                {
                    await _documentClient.ReplaceDocumentAsync(CreateDocumentUri(games.Id), games);
                }
            }
            catch (Exception ex)
            {
                Trace.TraceError($"ERROR REPLACING DOCUMENT: {ex}");
            }
        }

        public async Task DeleteGamesAsync(GamesModel games)
        {
            AssertEntity(games);

            try
            {
                GamesModel deletedDocument = null;
                ResourceResponse<Document> response = await _documentClient.DeleteDocumentAsync(CreateDocumentUri(games.Id));

                if (response.StatusCode == HttpStatusCode.OK)
                {
                    deletedDocument = (GamesModel)(dynamic)response.Resource;
                }
                else
                {
                    Trace.TraceWarning($"Document not deleted: response code {response.StatusCode}");
                }
            }
            catch (Exception ex)
            {
                Trace.TraceError($"ERROR DELETING DOCUMENT: {ex}");
            }
        }

        public GamesModel GetGames(string id)
        {
            try
            {
                List<GamesModel> games = _documentClient.CreateDocumentQuery<GamesModel>(CreateCollectionUri())
                    .Where(tn => tn.Id == id)
                    .ToList();

                if (games.Count > 1)
                {
                    Trace.TraceWarning($"Found {games.Count} matches for given criteria: Id:{id}");
                }
                else if (games.Count <= 0)
                {
                    Trace.TraceWarning($"Document not found for given criteria: id:{id}");
                    return null;
                }

                return games.First();
            }
            catch (Exception ex)
            {
                Trace.TraceError($"ERROR QUERYING NOTIFICATION: {ex}");
            }

            return null;
        }
        

        #region DB Helpers

        private async Task<GamesModel> GetRecord(string id)
        {
            GamesModel record = null;

            try
            {
                ResourceResponse<Document> response = await _documentClient.ReadDocumentAsync(CreateDocumentUri(id));

                if (response.StatusCode == HttpStatusCode.OK)
                {
                    record = (GamesModel)(dynamic)response.Resource;
                }
            }
            catch (Exception ex)
            {
                Trace.TraceError($"ERROR READING DOCUMENT {id}: {ex}");
            }

            return record;
        }

        private Uri CreateCollectionUri()
        {
            return UriFactory.CreateDocumentCollectionUri(_database, _collection);
        }

        private Uri CreateDocumentUri(string id)
        {
            return UriFactory.CreateDocumentUri(_database, _collection, id);
        }

        private static async Task CreateDatabaseIfNotExists(DocumentClient client, string databaseName)
        {
            try
            {
                await client.ReadDatabaseAsync(UriFactory.CreateDatabaseUri(databaseName));
            }
            catch (DocumentClientException documentException)
            {
                if (documentException.StatusCode == HttpStatusCode.NotFound)
                {
                    await client.CreateDatabaseAsync(new Database { Id = databaseName });
                }
                else
                {
                    throw;
                }
            }
        }

        private static async Task CreateDocumentCollectionIfNotExists(DocumentClient client, string databaseName, string collectionName)
        {
            await CreateDatabaseIfNotExists(client, databaseName);

            try
            {
                await client.ReadDocumentCollectionAsync(UriFactory.CreateDocumentCollectionUri(databaseName, collectionName));
            }
            catch (DocumentClientException documentException)
            {
                if (documentException.StatusCode == HttpStatusCode.NotFound)
                {
                    var collectionInfo = new DocumentCollection();
                    collectionInfo.Id = collectionName;
                    collectionInfo.IndexingPolicy = new IndexingPolicy(new RangeIndex(DataType.String) { Precision = -1 });

                    await client.CreateDocumentCollectionAsync(
                        UriFactory.CreateDatabaseUri(databaseName),
                        collectionInfo,
                        new RequestOptions { OfferThroughput = 400 });
                }
                else
                {
                    throw;
                }
            }
        }

        #endregion

        private static void AssertEntity(GamesModel entity)
        {
            if (entity == null)
            {
                throw new ArgumentNullException(nameof(entity), "Entity can not be null");
            }

            if (string.IsNullOrEmpty(entity.Id))
            {
                throw new ArgumentException(nameof(entity), $"Properties id can not be null or empty");
            }
        }
    }
}
