var flatten = (array: any): any => Array.isArray(array) ? [].concat(...array.map(flatten)) : array;

export function schemaToProperties(schema: Schema, prefix = '', root: Schema = null): any[] {
    if (!schema) {
        return [];
    }

    const properties: any[] = [];

    root = root || schema;

    Object.keys(schema.properties)
        .forEach((propertyName: any) => {
            const property = schema.properties[propertyName];
            if (property.oneOf) {
                const refElem = property.oneOf.find((x: any) => x.$ref);
                const ref = refElem.$ref.substr('#/definitions/'.length);
                properties.push(schemaToProperties(root.definitions[ref], prefix + propertyName + '.', root));
            } else {
                properties.push(prefix + propertyName);
            }
        });

    return flatten(properties);
}

export interface Schema {
    properties: Object;
    required: Array<string>;
    definitions: Object;
}