import ManagedObject, { $ManagedObjectSettings } from "sap/ui/base/ManagedObject";
import Table from "ui5/shaula/control/table/Table";
import ODataMetadata from "ui5/shaula/metadata/ODataMetadata";
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
            oDataMetadata: { type: "ui5.shaula.metadata.ODataMetadata", multiple: false, visibility: "hidden" }
        }
    };

    public abstract generateInnerTable(): void;
    public abstract configureTable(): Promise<void>;
    public abstract getTableInstance(): SupportedTables;

    constructor(settings: Settings) {
        super(settings as $ManagedObjectSettings);
        
        this.setAggregation("oDataMetadata", new ODataMetadata({
            entitySet: this.getEntitySet()
        }));
    }

    protected getODataMetadata() {
        return this.getAggregation("oDataMetadata") as ODataMetadata;
    }

    protected getOwnerParent() {
        return this.getParent() as Table;
    }
}