/* eslint-disable semi */

import GridTable from "sap/ui/table/Table";
import ResponsiveTable from "sap/m/Table";
import AnalyticalTable from "sap/ui/table/AnalyticalTable";
import TableType from "ui5/shaula/control/table/TableType";
import { AggregationGetter, PropertyGetter, PropertySetter } from "ui5/shaula/types/global/ClassMetadata.types";

declare module "ui5/shaula/control/table/Table" {
    export default interface Table {
        getEntitySet: PropertyGetter<string>;
        setEntitySet: PropertySetter<string>;
        getTableType: PropertyGetter<typeof TableType[keyof typeof TableType]>;
        setTableType: PropertySetter<typeof TableType[keyof typeof TableType]>;
        getInnerTable: AggregationGetter<SupportedTables | undefined>;
    }
}

export type SupportedTables = ResponsiveTable | GridTable | AnalyticalTable;