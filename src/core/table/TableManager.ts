import OverflowToolbar from "sap/m/OverflowToolbar";
import Toolbar from "sap/m/Toolbar";
import ToolbarSpacer from "sap/m/ToolbarSpacer";
import ManagedObject, { $ManagedObjectSettings } from "sap/ui/base/ManagedObject";
import Table from "ui5/shaula/control/table/Table";
import MetadataManager from "ui5/shaula/odata/metadata/MetadataManager";
import { SupportedTables } from "ui5/shaula/types/control/table/Table.types";
import { Settings } from "ui5/shaula/types/core/table/TableManager.types";
import { ClassMetadata } from "ui5/shaula/types/global/ClassMetadata.types";

/**
 * @namespace ui5.shaula.core.table
 */
export default abstract class TableManager extends ManagedObject {
    static metadata: ClassMetadata = {
        library: "ui5.shaula",
        abstract: true,
        properties: {
            entitySet: { type: "string" }
        },
        aggregations: {
            metadataManager: { type: "ui5.shaula.odata.metadata.MetadataManager", multiple: false, visibility: "hidden" }
        }
    };

    public abstract getNewInstance(): SupportedTables;
    public abstract configureTable(): Promise<void>;
    public abstract getTableInstance(): SupportedTables;
    public abstract bindInnerTable(): void;
    public abstract placeToolbar(toolbar: Toolbar): void;

    constructor(settings: Settings) {
        super(settings as $ManagedObjectSettings);

        this.setAggregation("metadataManager", new MetadataManager({
            entitySet: this.getEntitySet()
        }));
    }

    public getNewToolbarInstance() {
        return new OverflowToolbar();
    }

    public configureToolbar(toolbar: Toolbar) {
        this.addToolbarSpacer(toolbar);
        this.addExportButton(toolbar);
        this.addTablePersonalizationButton(toolbar);
    }

    protected async loadEntityTypeProperties() {
        await this.getMetadataManager().loadProperties();
    }

    protected getMetadataManager() {
        return this.getAggregation("metadataManager") as MetadataManager;
    }

    protected getOwnerParent() {
        return this.getParent() as Table;
    }

    private addToolbarSpacer(toolbar: Toolbar) {
        let hasSpacer = false;

        for (const control of toolbar.getContent()) {
            if (control instanceof ToolbarSpacer) {
                hasSpacer = true;
                break;
            }
        }

        if (!hasSpacer) {
            toolbar.addContent(new ToolbarSpacer());
        }
    }

    private addExportButton(toolbar: Toolbar) {
        if (!this.getOwnerParent().getEnableExport()) {
            return;
        }
    }

    private addTablePersonalizationButton(toolbar: Toolbar) {
        if (!this.getOwnerParent().getShowTablePersonalization()) {
            return;
        }
    }
}