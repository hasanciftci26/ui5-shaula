/* eslint-disable semi */

import Table from "sap/ui/table/Table";
import { AggregationGetter, AggregationSetter } from "ui5/shaula/types/global/ClassMetadata.types";

declare module "ui5/shaula/core/table/GridTableManager" {
    export default interface GridTableManager {
        getExtension: AggregationGetter<Table | undefined>;
        setExtension: AggregationSetter<Table>;
    }
}