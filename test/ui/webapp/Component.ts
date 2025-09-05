import UIComponent from "sap/ui/core/UIComponent";
import { createDeviceModel } from "test/ui/ui5/shaula/model/models";

/**
 * @namespace test.ui.ui5.shaula
 */
export default class Component extends UIComponent {
    public static metadata = {
        manifest: "json"
    };

    public override init(): void {
        super.init();
        this.getRouter().initialize();
        this.setModel(createDeviceModel(), "device");
    }
}