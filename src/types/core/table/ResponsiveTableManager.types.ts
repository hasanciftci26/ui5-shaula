/* eslint-disable semi */

import Table from "sap/m/Table";
import { AggregationGetter, AggregationSetter } from "ui5/shaula/types/global/ClassMetadata.types";

declare module "ui5/shaula/core/table/ResponsiveTableManager" {
    export default interface ResponsiveTableManager {
        getExtension: AggregationGetter<Table | undefined>;
        setExtension: AggregationSetter<Table>;
    }
}