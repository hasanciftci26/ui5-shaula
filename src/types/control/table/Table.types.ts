/* eslint-disable semi */

import GridTable from "sap/ui/table/Table";
import ResponsiveTable from "sap/m/Table";
import AnalyticalTable from "sap/ui/table/AnalyticalTable";
import TableType from "ui5/shaula/control/table/TableType";
import { AggregationGetter, AggregationSetter, PropertyGetter, PropertySetter } from "ui5/shaula/types/global/ClassMetadata.types";
import { $VBoxSettings } from "sap/m/VBox";
import { TitleLevel } from "sap/ui/core/library";
import Toolbar from "sap/m/Toolbar";

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
        getShowRowCount: PropertyGetter<boolean>;
        setShowRowCount: PropertySetter<boolean>;        
        getShowTablePersonalization: PropertyGetter<boolean>;
        setShowTablePersonalization: PropertySetter<boolean>;
        getPlaceToolbarInTable: PropertyGetter<boolean>;
        setPlaceToolbarInTable: PropertySetter<boolean>;
        getEnableExport: PropertyGetter<boolean>;
        setEnableExport: PropertySetter<boolean>;
        getCustomToolbar: AggregationGetter<Toolbar | undefined>;
        setCustomToolbar: AggregationSetter<Toolbar>;
    }
}

export type SupportedTables = ResponsiveTable | GridTable | AnalyticalTable;

export type Settings = $VBoxSettings & {
    entitySet: string;
    tableType?: TableTypeValues;
    enableAutoBinding?: boolean;
    header?: string;
    headerLevel?: TitleLevel;
    showRowCount?: boolean;
    showTablePersonalization?: boolean;
    placeToolbarInTable?: boolean;
    enableExport?: boolean
    customToolbar?: Toolbar;
};

export type TableTypeValues = typeof TableType[keyof typeof TableType];