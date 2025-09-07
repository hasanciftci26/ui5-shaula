import GridTable from "sap/ui/table/Table";
import ResponsiveTable from "sap/m/Table";
import AnalyticalTable from "sap/ui/table/AnalyticalTable";
import TableType from "ui5/shaula/control/table/TableType";
import { ClassMetadata } from "ui5/shaula/types/global/ClassMetadata.types";
import TableManager from "ui5/shaula/core/table/TableManager";
import GridTableManager from "ui5/shaula/core/table/GridTableManager";
import ResponsiveTableManager from "ui5/shaula/core/table/ResponsiveTableManager";
import AnalyticalTableManager from "ui5/shaula/core/table/AnalyticalTableManager";
import { Settings, SupportedTables, TableTypeValues } from "ui5/shaula/types/control/table/Table.types";
import VBox from "sap/m/VBox";
import { TitleLevel } from "sap/ui/core/library";

/**
 * @namespace ui5.shaula.control.table
 */
export default class Table extends VBox {
    static metadata: ClassMetadata = {
        library: "ui5.shaula",
        properties: {
            entitySet: { type: "string" },
            tableType: { type: "ui5.shaula.control.table.TableType", defaultValue: TableType.Table },
            enableAutoBinding: { type: "boolean", defaultValue: false },
            header: { type: "string" },
            headerLevel: { type: "sap.ui.core.TitleLevel", defaultValue: TitleLevel.Auto },
            showTablePersonalisation: { type: "boolean", defaultValue: true },
            initialized: { type: "boolean", visibility: "hidden" }
        },
        aggregations: {
            tableManager: { type: "ui5.shaula.core.table.TableManager", multiple: false, visibility: "hidden" }
        }
    };
    static renderer = {
        apiVersion: 2
    };
    private table?: SupportedTables;

    constructor(settings: Settings) {
        super(settings);
        this.setInitialized(false);
        this.initializeTableManager();

        if (!this.table) {
            this.table = this.getTableManager().getNewInstance();
            this.insertItem(this.table, 2);
        }

        this.table.setBusyIndicatorDelay(0);
        this.setTableBusy(true);
        this.attachModelContextChange(this.onModelContextChange, this);
    }

    public onModelContextChange() {
        if (this.isInitialized()) {
            return;
        }

        this.getTableManager().configureTable().then(() => {
            this.setInitialized(true);

            if (this.getEnableAutoBinding()) {
                this.getTableManager().bindInnerTable();
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
        this.getTableManager().bindInnerTable();
    }

    public getTable() {
        return this.table;
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

    private initializeTableManager() {
        this.table = this.getUserProvidedTable();
        const tableType = this.getTableTypeForManager();

        switch (tableType) {
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

    private getUserProvidedTable(): SupportedTables | undefined {
        const items = this.getItems() || [];

        for (const item of items) {
            if (item instanceof GridTable || item instanceof ResponsiveTable || item instanceof AnalyticalTable) {
                return item;
            }
        }
    }

    private getTableTypeForManager(): TableTypeValues {
        if (this.table) {
            switch (true) {
                case this.table instanceof ResponsiveTable:
                    return "ResponsiveTable";
                case this.table instanceof AnalyticalTable:
                    return "AnalyticalTable";
                default:
                    return "Table";
            }
        } else {
            return this.getTableType();
        }
    }

    private setTableBusy(busy = true) {
        if (this.table) {
            this.table.setBusy(busy);
        }
    }
}