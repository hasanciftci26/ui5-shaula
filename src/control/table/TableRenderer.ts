/* eslint-disable @typescript-eslint/naming-convention */

import RenderManager from "sap/ui/core/RenderManager";
import Table from "ui5/shaula/control/table/Table";

const TableRenderer = {
    apiVersion: 2,
    render: function (rm: RenderManager, control: Table) {
        rm.openStart("div");
        rm.openEnd();
        rm.text("Test");
        rm.close("div");
    }
};

export default TableRenderer;