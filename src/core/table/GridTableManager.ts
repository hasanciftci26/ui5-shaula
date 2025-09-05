import Table from "sap/ui/table/Table";
import TableManager from "ui5/shaula/core/table/TableManager";
import { ClassMetadata } from "ui5/shaula/types/global/ClassMetadata.types";

/**
 * @namespace ui5.shaula.core.table
 */
export default class GridTableManager extends TableManager {
    static metadata: ClassMetadata = {
        library: "ui5.shaula",
        final: true,
        properties: {
            tableInstance: { type: "object", visibility: "hidden" }
        }
    };

    public createTableInstance() {
        const extension = this.getOwnerParent().getExtension();

        if (extension) {
            this.setTableInstance(extension as Table);
        } else {
            this.setTableInstance(new Table());
        }
    }

    public getTableInstance() {
        return this.getProperty("tableInstance") as Table;
    }

    public async createColumns() {

    }

    private setTableInstance(tableInstance: Table) {
        this.setProperty("tableInstance", tableInstance);
    }
}