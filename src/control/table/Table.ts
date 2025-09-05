import Control from "sap/ui/core/Control";
import GridTable from "sap/ui/table/Table";
import ResponsiveTable from "sap/m/Table";
import AnalyticalTable from "sap/ui/table/AnalyticalTable";
import TableType from "ui5/shaula/control/table/TableType";
import { SupportedTables } from "ui5/shaula/types/control/table/Table.types";
import { ClassMetadata } from "ui5/shaula/types/global/ClassMetadata.types";
import TableManager from "ui5/shaula/core/table/TableManager";
import GridTableManager from "ui5/shaula/core/table/GridTableManager";
import ResponsiveTableManager from "ui5/shaula/core/table/ResponsiveTableManager";
import AnalyticalTableManager from "ui5/shaula/core/table/AnalyticalTableManager";

/**
 * @namespace ui5.shaula.control.table
 */
export default class Table extends Control {
    static metadata: ClassMetadata = {
        library: "ui5.shaula",
        properties: {
            tableType: { type: "ui5.shaula.control.table.TableType", defaultValue: TableType.Table },
            initialized: { type: "boolean", visibility: "hidden" }
        },
        aggregations: {
            extension: { type: "sap.ui.core.Control", multiple: false },
            innerTable: { type: "sap.ui.core.Control", multiple: false, visibility: "hidden" },
            tableManager: { type: "ui5.shaula.core.table.TableManager", multiple: false, visibility: "hidden" }
        }
    };

    public override init() {
        this.initializeTableManager();
        this.getTableManager().createTableInstance();
        this.setInnerTable(this.getTableManager().getTableInstance());
    }

    public isInitialized() {
        return this.getProperty("initialized") as boolean;
    }

    public setExtension(extension: Control) {
        if (this.isInitialized()) {
            throw new Error(
                "Setting the extension aggregation is not allowed after the control has been initialized. It can only be set during initialization."
            );
        }

        if (![GridTable, ResponsiveTable, AnalyticalTable].some(tableClass => extension instanceof tableClass)) {
            throw new Error(
                "Invalid aggregation: only sap.ui.table.Table, sap.m.Table, or sap.ui.table.AnalyticalTable instances can be used as an extension."
            );
        }

        this.setAggregation("extension", extension);
    }

    public getInnerTable() {
        return this.getAggregation("innerTable") as SupportedTables;
    }

    private setInitialized(initialized: boolean) {
        this.setProperty("initialized", initialized);
    }

    private setInnerTable(innerTable: SupportedTables) {
        this.setAggregation("innerTable", innerTable);
    }

    private getTableManager() {
        return this.getAggregation("tableManager") as TableManager;
    }

    private setTableManager(tableManager: TableManager) {
        this.setAggregation("tableManager", tableManager);
    }

    private initializeTableManager() {
        const extension = this.getExtension();

        if (extension) {
            switch (true) {
                case extension instanceof GridTable:
                    this.setTableManager(new GridTableManager());
                    break;
                case extension instanceof ResponsiveTable:
                    this.setTableManager(new ResponsiveTableManager());
                    break;
                case extension instanceof AnalyticalTable:
                    this.setTableManager(new AnalyticalTableManager());
                    break;
            }
        } else {
            switch (this.getTableType()) {
                case "Table":
                    this.setTableManager(new GridTableManager());
                    break;
                case "ResponsiveTable":
                    this.setTableManager(new ResponsiveTableManager());
                    break;
                case "AnalyticalTable":
                    this.setTableManager(new AnalyticalTableManager());
                    break;
            }
        }
    }
}