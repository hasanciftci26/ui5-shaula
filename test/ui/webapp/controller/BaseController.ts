import Controller from "sap/ui/core/mvc/Controller";
import UIComponent from "test/ui/ui5/shaula/Component";
import View from "sap/ui/core/mvc/View";
import UI5Element from "sap/ui/core/Element";
import ODataModel from "sap/ui/model/odata/v4/ODataModel";
import ResourceModel from "sap/ui/model/resource/ResourceModel";
import ResourceBundle from "sap/base/i18n/ResourceBundle";
import formatter from "test/ui/ui5/shaula/model/formatter";
import Router from "sap/m/routing/Router";

/**
 * @namespace test.ui.ui5.shaula.controller
 */
export default class BaseController extends Controller {
    /* ============================================================================================================== */
    /* Properties                                                                                                     */
    /* ============================================================================================================== */

    public formatter = formatter;

    /* ======================================================================================================================= */
    /* Global Methods                                                                                                          */
    /* ======================================================================================================================= */

    public getRouter() {
        return this.getOwnerComponent().getRouter() as Router;
    }

    public override getOwnerComponent() {
        return super.getOwnerComponent() as UIComponent;
    }

    public getCurrentView() {
        return this.getView() as View;
    }

    public getById<T extends UI5Element = UI5Element>(id: string) {
        const element = this.getCurrentView().byId(id);

        if (!element) {
            throw new Error(`The UI5 Element with the following id was not found: ${id}`);
        }

        return element as T;
    }

    public getODataModel(name?: string) {
        const model = this.getOwnerComponent().getModel(name);

        if (model instanceof ODataModel === false) {
            throw new Error(`The sap.ui.model.odata.v4.ODataModel with the following name was not found: ${name}`);
        }

        return model;
    }

    public navTo(route: string, parameters?: object, replace?: boolean) {
        this.getRouter().navTo(route, parameters, replace);
    }

    public getText(key: string, args?: any[]) {
        const model = this.getOwnerComponent().getModel("i18n") as ResourceModel;
        const bundle = model.getResourceBundle() as ResourceBundle;
        return bundle.getText(key, args, false) as string;
    }

    /* ======================================================================================================================= */
    /* Global Event Handlers                                                                                                   */
    /* ======================================================================================================================= */

    public onNavigation(route: string) {
        this.navTo(route);
    }
}