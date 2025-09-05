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
        aggregations: {
            extension: { type: "sap.ui.table.AnalyticalTable", multiple: false },
            tableInstance: { type: "sap.ui.table.AnalyticalTable", multiple: false, visibility: "hidden" }
        }
    };

    public createTableInstance() {
        const extension = this.getExtension();

        if (extension) {
            this.setTableInstance(extension);
        } else {
            this.setTableInstance(new AnalyticalTable());
        }
    }

    public getTableInstance() {
        return this.getAggregation("tableInstance") as AnalyticalTable;
    }

    private setTableInstance(tableInstance: AnalyticalTable) {
        this.setAggregation("tableInstance", tableInstance);
    }
}