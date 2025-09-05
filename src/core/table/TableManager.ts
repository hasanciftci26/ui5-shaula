import ManagedObject from "sap/ui/base/ManagedObject";
import Table from "ui5/shaula/control/table/Table";
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

    public abstract generateInnerTable(): void;
    public abstract createColumns(): Promise<void>;
    public abstract getTableInstance(): SupportedTables;

    protected getOwnerParent() {
        return this.getParent() as Table;
    }
}