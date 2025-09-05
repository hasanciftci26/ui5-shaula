import Table from "sap/ui/table/Table";
import TableManager from "ui5/shaula/core/table/TableManager";
import { ClassMetadata } from "ui5/shaula/types/global/ClassMetadata.types";

/**
 * @namespace ui5.shaula.core.table
 */
export default class GridTableManager extends TableManager {
    static metadata: ClassMetadata = {
        library: "ui5.shaula",
        final: true
    };

    public getTableInstance() {
        return this.getOwnerParent().getInnerTable() as Table;
    }

    public generateInnerTable() {
        this.getOwnerParent().setAggregation("innerTable", new Table());
    }

    public async configureTable() {
        const properties = await this.getODataMetadata().extractProperties();
    }
}