/* eslint-disable semi */

import GridTable from "sap/ui/table/Table";
import ResponsiveTable from "sap/m/Table";
import AnalyticalTable from "sap/ui/table/AnalyticalTable";
import TableType from "ui5/shaula/control/table/TableType";
import { PropertyGetter, PropertySetter } from "ui5/shaula/types/global/ClassMetadata.types";
import { $VBoxSettings } from "sap/m/VBox";
import { TitleLevel } from "sap/ui/core/library";

declare module "ui5/shaula/control/table/Table" {
    export default interface Table {
        getEntitySet: PropertyGetter<string>;
        setEntitySet: PropertySetter<string>;
        getTableType: PropertyGetter<TableTypeValues>;
        setTableType: PropertySetter<TableTypeValues>;
        getEnableAutoBinding: PropertyGetter<boolean>;
        setEnableAutoBinding: PropertySetter<boolean>;
        getHeader: PropertyGetter<string | undefined>;
        setHeader: PropertySetter<string>;
        getHeaderLevel: PropertyGetter<TitleLevel>;
        setHeaderLevel: PropertySetter<TitleLevel>;
        getShowTablePersonalisation: PropertyGetter<boolean>;
        setShowTablePersonalisation: PropertySetter<boolean>;
    }
}

export type SupportedTables = ResponsiveTable | GridTable | AnalyticalTable;

export type Settings = $VBoxSettings & {
    entitySet: string;
    tableType?: TableTypeValues;
    enableAutoBinding?: boolean;
    header?: string;
    headerLevel?: TitleLevel;
    showTablePersonalisation?: boolean;
};

export type TableTypeValues = typeof TableType[keyof typeof TableType];