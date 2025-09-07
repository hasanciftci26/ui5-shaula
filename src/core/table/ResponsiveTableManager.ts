import Table from "sap/m/Table";
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
        return this.getOwnerParent().getInnerTable() as Table;
    }

    public generateInnerTable() {
        this.getOwnerParent().setAggregation("innerTable", new Table());
    }

    public async configureTable() {

    }

    public bindTable() {

    }    
}