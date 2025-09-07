import Control from "sap/ui/core/Control";
import GridTable from "sap/ui/table/Table";
import ResponsiveTable from "sap/m/Table";
import AnalyticalTable from "sap/ui/table/AnalyticalTable";
import TableType from "ui5/shaula/control/table/TableType";
import { ClassMetadata } from "ui5/shaula/types/global/ClassMetadata.types";
import TableManager from "ui5/shaula/core/table/TableManager";
import GridTableManager from "ui5/shaula/core/table/GridTableManager";
import ResponsiveTableManager from "ui5/shaula/core/table/ResponsiveTableManager";
import AnalyticalTableManager from "ui5/shaula/core/table/AnalyticalTableManager";
import { SupportedTables } from "ui5/shaula/types/control/table/Table.types";

/**
 * @namespace ui5.shaula.control.table
 */
export default class Table extends Control {
    static metadata: ClassMetadata = {
        library: "ui5.shaula",
        defaultAggregation: "innerTable",
        properties: {
            entitySet: { type: "string" },
            tableType: { type: "ui5.shaula.control.table.TableType", defaultValue: TableType.Table },
            enableAutoBinding: { type: "boolean", defaultValue: false },
            initialized: { type: "boolean", visibility: "hidden" }
        },
        aggregations: {
            innerTable: { type: "sap.ui.core.Control", multiple: false },
            tableManager: { type: "ui5.shaula.core.table.TableManager", multiple: false, visibility: "hidden" }
        }
    };

    public override init() {
        this.setInitialized(false);
    }

    public override onBeforeRendering() {
        this.initializeTableManager();

        if (!this.getInnerTable()) {
            this.getTableManager().generateInnerTable();
        }

        (this.getInnerTable() as SupportedTables).setBusyIndicatorDelay(0);
    }

    public override onAfterRendering() {
        this.setTableBusy();
        this.getTableManager().configureTable().then(() => {
            this.setInitialized(true);

            if (this.getEnableAutoBinding()) {
                this.getTableManager().bindTable();
            } else {
                this.setTableBusy(false);
            }
        });
    }

    public isInitialized() {
        return this.getProperty("initialized") as boolean;
    }

    public setInnerTable(innerTable: SupportedTables) {
        if (this.isInitialized()) {
            throw new Error(
                "Setting the innerTable aggregation is not allowed after the control has been initialized. It can only be set during initialization."
            );
        }

        if (![GridTable, ResponsiveTable, AnalyticalTable].some(tableClass => innerTable instanceof tableClass)) {
            throw new Error(
                "Invalid aggregation: only sap.ui.table.Table, sap.m.Table, or sap.ui.table.AnalyticalTable instances can be used as an inner table."
            );
        }

        this.setAggregation("innerTable", innerTable);
    }

    public rebindTable() {
        this.getTableManager().bindTable();
    }

    private setInitialized(initialized: boolean) {
        this.setProperty("initialized", initialized);
    }

    private getTableManager() {
        return this.getAggregation("tableManager") as TableManager;
    }

    private setTableManager(tableManager: TableManager) {
        this.setAggregation("tableManager", tableManager);
    }

    private setTableBusy(busy = true) {
        (this.getInnerTable() as SupportedTables).setBusy(busy);
    }

    private initializeTableManager() {
        const innerTable = this.getInnerTable();

        if (innerTable) {
            switch (true) {
                case innerTable instanceof GridTable:
                    this.setTableManager(new GridTableManager({ entitySet: this.getEntitySet() }));
                    break;
                case innerTable instanceof ResponsiveTable:
                    this.setTableManager(new ResponsiveTableManager({ entitySet: this.getEntitySet() }));
                    break;
                case innerTable instanceof AnalyticalTable:
                    this.setTableManager(new AnalyticalTableManager({ entitySet: this.getEntitySet() }));
                    break;
            }
        } else {
            switch (this.getTableType()) {
                case "Table":
                    this.setTableManager(new GridTableManager({ entitySet: this.getEntitySet() }));
                    break;
                case "ResponsiveTable":
                    this.setTableManager(new ResponsiveTableManager({ entitySet: this.getEntitySet() }));
                    break;
                case "AnalyticalTable":
                    this.setTableManager(new AnalyticalTableManager({ entitySet: this.getEntitySet() }));
                    break;
            }
        }
    }
}