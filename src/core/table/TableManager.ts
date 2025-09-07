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

    public abstract generateInnerTable(): void;
    public abstract configureTable(): Promise<void>;
    public abstract getTableInstance(): SupportedTables;
    public abstract bindTable(): void;

    constructor(settings: Settings) {
        super(settings as $ManagedObjectSettings);

        this.setAggregation("metadataManager", new MetadataManager({
            entitySet: this.getEntitySet()
        }));
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
}