/* eslint-disable semi */


import AnalyticalTable from "sap/ui/table/AnalyticalTable";
import { PropertyGetter, PropertySetter } from "ui5/shaula/types/global/ClassMetadata.types";

declare module "ui5/shaula/core/table/AnalyticalTableManager" {
    export default interface AnalyticalTableManager {
        getExtension: PropertyGetter<AnalyticalTable | undefined>;
        setExtension: PropertySetter<AnalyticalTable>;
        getTableInstance: PropertyGetter<AnalyticalTable>;
        setTableInstance: PropertySetter<AnalyticalTable>;
    }
}