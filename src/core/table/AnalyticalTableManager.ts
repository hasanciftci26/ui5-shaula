import AnalyticalTable from "sap/ui/table/AnalyticalTable";
import TableManager from "ui5/shaula/core/table/TableManager";
import { ClassMetadata } from "ui5/shaula/types/global/ClassMetadata.types";

/**
 * @namespace ui5.shaula.core.table
 */
export default class AnalyticalTableManager extends TableManager {
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
            this.setTableInstance(extension as AnalyticalTable);
        } else {
            this.setTableInstance(new AnalyticalTable());
        }
    }

    public getTableInstance() {
        return this.getProperty("tableInstance") as AnalyticalTable;
    }

    public async createColumns() {

    }

    private setTableInstance(tableInstance: AnalyticalTable) {
        this.setProperty("tableInstance", tableInstance);
    }
}