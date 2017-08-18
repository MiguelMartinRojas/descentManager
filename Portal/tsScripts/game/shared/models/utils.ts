import { CardDefinition } from './card.model'
import { UserDefinition } from './user.model'
export class Utils {
    static clone (src: object) {
        return JSON.parse(JSON.stringify(src));
    }
    static isEqual (src1: Array<CardDefinition>, src2: Array<CardDefinition>) {
        for (var key in src1) {
            if (!src1.hasOwnProperty(key) || !src2.hasOwnProperty(key) || !(src1[key].Id === src2[key].Id)) {
                return false
            }
        }
        return true;

    }

    static isEqualUsers (src1: Array<UserDefinition>, src2: Array<UserDefinition>) {
        for (var key in src1) {
            if (!src1.hasOwnProperty(key) || !src2.hasOwnProperty(key) || !(src1[key].Id === src2[key].Id)) {
                return false
            }
        }
        return true;

    }
}