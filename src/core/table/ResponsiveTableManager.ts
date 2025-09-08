import Table from "sap/m/Table";
import Toolbar from "sap/m/Toolbar";
import TableManager from "ui5/shaula/core/table/TableManager";
import { ClassMetadata } from "ui5/shaula/types/global/ClassMetadata.types";

/**
 * @namespace ui5.shaula.core.table
 */
export default class ResponsiveTableManager extends TableManager {
    static metadata: ClassMetadata = {
        library: "ui5.shaula",
        final: true
    };

    public getTableInstance() {
        const table = this.getOwnerParent().getTable();

        if (!table) {
            throw new Error("Table is not initialized yet.");
        }

        return table as Table;
    }

    public getNewInstance() {
        return new Table();
    }

    public async configureTable() {

    }

    public bindInnerTable() {

    }

    public placeToolbar(toolbar: Toolbar) {
        this.getTableInstance().setHeaderToolbar(toolbar);
    }
}