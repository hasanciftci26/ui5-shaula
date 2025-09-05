/* eslint-disable semi */

import Table from "sap/m/Table";
import { PropertyGetter, PropertySetter } from "ui5/shaula/types/global/ClassMetadata.types";

declare module "ui5/shaula/core/table/ResponsiveTableManager" {
    export default interface ResponsiveTableManager {
        getExtension: PropertyGetter<Table | undefined>;
        setExtension: PropertySetter<Table>;
        getTableInstance: PropertyGetter<Table>;
        setTableInstance: PropertySetter<Table>;
    }
}