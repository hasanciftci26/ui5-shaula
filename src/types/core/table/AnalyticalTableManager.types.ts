/* eslint-disable semi */


import AnalyticalTable from "sap/ui/table/AnalyticalTable";
import { AggregationGetter, AggregationSetter } from "ui5/shaula/types/global/ClassMetadata.types";

declare module "ui5/shaula/core/table/AnalyticalTableManager" {
    export default interface AnalyticalTableManager {
        getExtension: AggregationGetter<AnalyticalTable | undefined>;
        setExtension: AggregationSetter<AnalyticalTable>;
    }
}