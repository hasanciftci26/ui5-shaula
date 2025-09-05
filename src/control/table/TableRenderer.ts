/* eslint-disable @typescript-eslint/naming-convention */

import RenderManager from "sap/ui/core/RenderManager";
import Table from "ui5/shaula/control/table/Table";
import { SupportedTables } from "ui5/shaula/types/control/table/Table.types";

const TableRenderer = {
    apiVersion: 2,
    render: function (rm: RenderManager, control: Table) {
        rm.renderControl(control.getInnerTable() as SupportedTables);
    }
};

export default TableRenderer;