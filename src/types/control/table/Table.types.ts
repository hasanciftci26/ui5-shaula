/* eslint-disable semi */

import Control from "sap/ui/core/Control";
import GridTable from "sap/ui/table/Table";
import ResponsiveTable from "sap/m/Table";
import AnalyticalTable from "sap/ui/table/AnalyticalTable";
import TableType from "ui5/shaula/control/table/TableType";
import { AggregationGetter, PropertyGetter, PropertySetter } from "ui5/shaula/types/global/ClassMetadata.types";

declare module "ui5/shaula/control/table/Table" {
    export default interface Table {
        getTableType: PropertyGetter<typeof TableType[keyof typeof TableType]>;
        setTableType: PropertySetter<typeof TableType[keyof typeof TableType]>;
        getExtension: AggregationGetter<Control | undefined>;
    }
}

export type SupportedTables = ResponsiveTable | GridTable | AnalyticalTable;