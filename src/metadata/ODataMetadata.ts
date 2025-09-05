import ManagedObject, { $ManagedObjectSettings } from "sap/ui/base/ManagedObject";
import ODataModel from "sap/ui/model/odata/v4/ODataModel";
import { ClassMetadata } from "ui5/shaula/types/global/ClassMetadata.types";
import {
    EntityType,
    EntityTypeElement,
    EntityTypeProperty,
    FilterExpressionRestriction,
    LineItem,
    Property,
    PropertyPath,
    Settings
} from "ui5/shaula/types/metadata/ODataMetadata.types";

/**
 * @namespace ui5.shaula.metadata
 */
export default class ODataMetadata extends ManagedObject {
    static metadata: ClassMetadata = {
        library: "ui5.shaula",
        final: true,
        properties: {
            entitySet: { type: "string" }
        }
    };

    constructor(settings: Settings) {
        super(settings as $ManagedObjectSettings);
    }

    public async extractProperties() {
        const metaModel = this.getODataModel().getMetaModel();
        const entityTypeName = await metaModel.requestObject("/$EntityContainer/" + this.getEntitySet() + "/$Type") as string | undefined;

        if (!entityTypeName) {
            throw new Error("EntitySet: " + this.getEntitySet() + " was not found in the ODataModel.");
        }

        const entityType: EntityType = await metaModel.requestObject("/" + entityTypeName);
        const selectionFields = await this.getSelectionFields(entityTypeName);
        const lineItems = await this.getLineItems(entityTypeName);
        const filterRequiredProperties = await this.getFilterRequiredProperties();
        const nonFilterableProperties = await this.getNonFilterableProperties();
        const filterExpressionRestrictions = await this.getFilterExpressionRestrictions();
        const properties: Property[] = [];

        for (const key in entityType) {
            const element = entityType[key];

            if (this.isEntityTypeProperty(element)) {
                if (element.$kind !== "Property") {
                    continue;
                }

                properties.push({
                    name: key,
                    type: element.$Type,
                    label: await this.extractLabel(key, entityTypeName),
                    visibleInFilterBar: selectionFields.includes(key),
                    visibleInTable: lineItems.some(item => item.Value.$Path === key),
                    filterRequired: filterRequiredProperties.includes(key),
                    filterable: nonFilterableProperties.includes(key) === false,
                    filterExpressionRestrictionType: this.getFilterExpressionRestrictionType(key, filterExpressionRestrictions)
                });
            }
        }

        return properties;
    }

    private async extractLabel(property: string, entityTypeName: string) {
        const metaModel = this.getODataModel().getMetaModel();
        const label = await metaModel.requestObject(
            "/" + entityTypeName + "/" + property + "@com.sap.vocabularies.Common.v1.Label"
        ) as string | undefined;

        return label || property;
    }

    private async getSelectionFields(entityTypeName: string) {
        const metaModel = this.getODataModel().getMetaModel();
        const selectionFields = await metaModel.requestObject(
            "/" + entityTypeName + "@com.sap.vocabularies.UI.v1.SelectionFields"
        ) as PropertyPath[] | undefined;

        if (selectionFields == null) {
            return [];
        }

        return selectionFields.map(field => field.$PropertyPath);
    }

    private async getLineItems(entityTypeName: string) {
        const metaModel = this.getODataModel().getMetaModel();
        const lineItems = await metaModel.requestObject(
            "/" + entityTypeName + "@com.sap.vocabularies.UI.v1.LineItem"
        ) as LineItem[] | undefined;

        if (lineItems == null) {
            return [];
        }

        return lineItems;
    }

    private async getFilterRequiredProperties() {
        const metaModel = this.getODataModel().getMetaModel();
        const filterRequiredProperties = await metaModel.requestObject(
            "/$EntityContainer/" + this.getEntitySet() + "@Org.OData.Capabilities.V1.FilterRestrictions/RequiredProperties"
        ) as PropertyPath[] | undefined;

        if (filterRequiredProperties == null) {
            return [];
        }

        return filterRequiredProperties.map(property => property.$PropertyPath);
    }

    private async getNonFilterableProperties() {
        const metaModel = this.getODataModel().getMetaModel();
        const nonFilterableProperties = await metaModel.requestObject(
            "/$EntityContainer/" + this.getEntitySet() + "@Org.OData.Capabilities.V1.FilterRestrictions/NonFilterableProperties"
        ) as PropertyPath[] | undefined;

        if (nonFilterableProperties == null) {
            return [];
        }

        return nonFilterableProperties.map(property => property.$PropertyPath);
    }

    private async getFilterExpressionRestrictions() {
        const metaModel = this.getODataModel().getMetaModel();
        const filterExpressionRestrictions = await metaModel.requestObject(
            "/$EntityContainer/" + this.getEntitySet() + "@Org.OData.Capabilities.V1.FilterRestrictions/FilterExpressionRestrictions"
        ) as FilterExpressionRestriction[] | undefined;

        if (filterExpressionRestrictions == null) {
            return [];
        }

        return filterExpressionRestrictions;
    }

    private getFilterExpressionRestrictionType(property: string, filterExpressionRestrictions: FilterExpressionRestriction[]) {
        const restriction = filterExpressionRestrictions.find(restriction => restriction.Property.$PropertyPath === property);
        return restriction?.AllowedExpressions || "MultiRangeOrSearchExpression";
    }

    private getODataModel() {
        const model = this.getModel();

        if (model instanceof ODataModel === false) {
            throw new Error(
                "ODataModel not detected. Use setModel(yourODataModel) to assign an sap.ui.model.odata.v4.ODataModel instance to the table control."
            );
        }

        return model;
    }

    private isEntityTypeProperty(element: EntityTypeElement): element is EntityTypeProperty {
        return element != null && typeof element === "object" && "$kind" in element;
    }
}