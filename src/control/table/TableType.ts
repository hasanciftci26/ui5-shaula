/* eslint-disable @typescript-eslint/naming-convention */

import DataType from "sap/ui/base/DataType";

const TableType = {
    Table: "Table",
    ResponsiveTable: "ResponsiveTable",
    AnalyticalTable: "AnalyticalTable"
};

DataType.registerEnum("ui5.shaula.control.table.TableType", TableType);

export default TableType;