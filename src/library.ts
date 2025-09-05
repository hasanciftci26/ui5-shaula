import Lib from "sap/ui/core/Lib";

const library = Lib.init({
    name: "ui5.shaula",
    apiVersion: 2,
    dependencies: [
        "sap.ui.core",
        "sap.m",
        "sap.ui.table"
    ],
    controls: [
        "ui5.shaula.control.table.Table"
    ],
    noLibraryCSS: true,
    version: "1.0.0"
});

export default library;