import Table from "sap/m/Table";
import TableManager from "ui5/shaula/core/table/TableManager";
import { ClassMetadata } from "ui5/shaula/types/global/ClassMetadata.types";

/**
 * @namespace ui5.shaula.core.table
 */
export default class ResponsiveTableManager extends TableManager {
    static metadata: ClassMetadata = {
        library: "ui5.shaula",
        final: true,
        properties: {
            extension: { type: "sap.ui.table.AnalyticalTable" },
            tableInstance: { type: "sap.ui.table.AnalyticalTable" }
        }
    };

    public createTableInstance() {
        const extension = this.getExtension();

        if (extension) {
            this.setTableInstance(extension);
        } else {
            this.setTableInstance(new Table());
        }
    }
}