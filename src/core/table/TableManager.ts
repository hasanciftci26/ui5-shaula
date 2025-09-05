import ManagedObject from "sap/ui/base/ManagedObject";
import { SupportedTables } from "ui5/shaula/types/control/table/Table.types";
import { ClassMetadata } from "ui5/shaula/types/global/ClassMetadata.types";

/**
 * @namespace ui5.shaula.core.table
 */
export default abstract class TableManager extends ManagedObject {
    static metadata: ClassMetadata = {
        library: "ui5.shaula",
        abstract: true
    };

    public abstract createTableInstance(): void;
    public abstract getTableInstance(): SupportedTables;
    public abstract createColumns(): Promise<void>;
}