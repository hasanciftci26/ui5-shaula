import AnalyticalTable from "sap/ui/table/AnalyticalTable";
import TableManager from "ui5/shaula/core/table/TableManager";
import { ClassMetadata } from "ui5/shaula/types/global/ClassMetadata.types";

/**
 * @namespace ui5.shaula.core.table
 */
export default class AnalyticalTableManager extends TableManager {
    static metadata: ClassMetadata = {
        library: "ui5.shaula",
        final: true
    };

    public getTableInstance() {
        const table = this.getOwnerParent().getTable();

        if (!table) {
            throw new Error("Table is not initialized yet.");
        }

        return table as AnalyticalTable;
    }

    public getNewInstance() {
        return new AnalyticalTable();
    }

    public async configureTable() {

    }

    public bindInnerTable() {

    }
}