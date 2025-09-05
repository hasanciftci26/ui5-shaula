/* eslint-disable semi */

import Table from "sap/ui/table/Table";
import { PropertyGetter, PropertySetter } from "ui5/shaula/types/global/ClassMetadata.types";

declare module "ui5/shaula/core/table/GridTableManager" {
    export default interface GridTableManager {
        getExtension: PropertyGetter<Table | undefined>;
        setExtension: PropertySetter<Table>;
        getTableInstance: PropertyGetter<Table>;
        setTableInstance: PropertySetter<Table>;
    }
}