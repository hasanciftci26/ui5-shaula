/* eslint-disable semi */

import { PropertyGetter, PropertySetter } from "ui5/shaula/types/global/ClassMetadata.types";

declare module "ui5/shaula/core/table/TableManager" {
    export default interface TableManager {
        getEntitySet: PropertyGetter<string>;
        setEntitySet: PropertySetter<string>;
    }
}

export type Settings = {
    entitySet: string;
};