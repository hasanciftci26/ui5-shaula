import Label from "sap/m/Label";
import Text from "sap/m/Text";
import Column from "sap/ui/table/Column";
import Table from "sap/ui/table/Table";
import TableManager from "ui5/shaula/core/table/TableManager";
import { ClassMetadata } from "ui5/shaula/types/global/ClassMetadata.types";
import { Property } from "ui5/shaula/types/odata/metadata/MetadataManager.types";

/**
 * @namespace ui5.shaula.core.table
 */
export default class GridTableManager extends TableManager {
    static metadata: ClassMetadata = {
        library: "ui5.shaula",
        final: true
    };

    public getTableInstance() {
        return this.getOwnerParent().getInnerTable() as Table;
    }

    public generateInnerTable() {
        this.getOwnerParent().setAggregation("innerTable", new Table());
    }

    public async configureTable() {
        await this.loadEntityTypeProperties();
        this.createColumns();
    }

    public bindTable() {
        this.getTableInstance().bindRows({
            path: "/" + this.getEntitySet(),
            events: {
                dataReceived: () => {
                    this.getTableInstance().setBusy(false);
                }
            }
        });
    }

    private createColumns() {
        for (const property of this.getMetadataManager().getEntityTypeProperties()) {
            if (!property.includeInTable) {
                continue;
            }

            this.getTableInstance().addColumn(new Column({
                label: new Label({
                    text: property.label
                }),
                template: this.getColumnTemplate(property)
            }));
        }
    }

    private getColumnTemplate(property: Property) {
        return new Text({
            text: {
                path: property.name
            }
        });
    }
}