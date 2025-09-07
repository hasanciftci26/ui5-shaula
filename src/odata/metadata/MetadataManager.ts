import ManagedObject, { $ManagedObjectSettings } from "sap/ui/base/ManagedObject";
import ODataModel from "sap/ui/model/odata/v4/ODataModel";
import AnnotationManager from "ui5/shaula/odata/metadata/AnnotationManager";
import { ClassMetadata } from "ui5/shaula/types/global/ClassMetadata.types";
import {
    EntityType,
    EntityTypeElement,
    EntityTypeProperty,
    Property,
    Settings
} from "ui5/shaula/types/odata/metadata/MetadataManager.types";

/**
 * @namespace ui5.shaula.odata.metadata
 */
export default class MetadataManager extends ManagedObject {
    static metadata: ClassMetadata = {
        library: "ui5.shaula",
        final: true,
        properties: {
            entitySet: { type: "string" }
        },
        aggregations: {
            annotationManager: { type: "ui5.shaula.odata.metadata.AnnotationManager", multiple: false }
        }
    };

    constructor(settings: Settings) {
        super(settings as $ManagedObjectSettings);
        this.setAnnotationManager(new AnnotationManager());
    }

    public getODataModel() {
        const model = this.getModel();

        if (model instanceof ODataModel === false) {
            throw new Error(
                "ODataModel not detected. Use setModel(yourODataModel) to assign an sap.ui.model.odata.v4.ODataModel instance to the table control."
            );
        }

        return model;
    }

    public getMetaModel() {
        return this.getODataModel().getMetaModel();
    }

    public async getEntityType(): Promise<EntityType> {
        const entityTypeName = await this.getEntityTypeName();
        return this.getMetaModel().requestObject("/" + entityTypeName);
    }

    public async getEntityTypeName() {
        const entityTypeName = await this.getMetaModel().requestObject("/$EntityContainer/" + this.getEntitySet() + "/$Type") as string | undefined;

        if (!entityTypeName) {
            throw new Error("EntitySet: " + this.getEntitySet() + " was not found in the ODataModel.");
        }

        return entityTypeName;
    }

    public async extractProperties() {
        const entityType = await this.getEntityType();
        const selectionFields = await this.getAnnotationManager().getSelectionFields();
        const lineItems = await this.getAnnotationManager().getLineItems();
        const filterRequiredProperties = await this.getAnnotationManager().getFilterRequiredProperties();
        const nonFilterableProperties = await this.getAnnotationManager().getNonFilterableProperties();
        const properties: Property[] = [];

        for (const key in entityType) {
            const element = entityType[key];

            if (this.isEntityTypeProperty(element)) {
                if (element.$kind !== "Property") {
                    continue;
                }

                const isPropertyHidden = await this.getAnnotationManager().isPropertyHidden(key);

                properties.push({
                    name: key,
                    type: element.$Type,
                    label: await this.getAnnotationManager().getLabel(key),
                    visibleInTable: isPropertyHidden ? false : lineItems.some(item => item.Value.$Path === key),
                    includeInTable: isPropertyHidden === false,
                    visibleInFilterBar: nonFilterableProperties.includes(key) ? false : selectionFields.includes(key),
                    filterRequired: filterRequiredProperties.includes(key),
                    includeInFilterBar: nonFilterableProperties.includes(key) === false,
                    filterExpressionRestrictionType: await this.getAnnotationManager().getFilterExpressionRestrictionType(key)
                });
            }
        }

        return properties;
    }

    private isEntityTypeProperty(element: EntityTypeElement): element is EntityTypeProperty {
        return element != null && typeof element === "object" && "$kind" in element;
    }
}