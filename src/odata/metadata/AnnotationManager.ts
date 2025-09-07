import ManagedObject from "sap/ui/base/ManagedObject";
import MetadataManager from "ui5/shaula/odata/metadata/MetadataManager";
import { ClassMetadata } from "ui5/shaula/types/global/ClassMetadata.types";
import { FilterExpressionRestriction, LineItem, PropertyPath } from "ui5/shaula/types/odata/metadata/AnnotationManager.types";

/**
 * @namespace ui5.shaula.odata.metadata
 */
export default class AnnotationManager extends ManagedObject {
    static metadata: ClassMetadata = {
        library: "ui5.shaula",
        final: true
    };

    public async getLabel(property: string) {
        const entityTypeName = await this.getOwnerParent().getEntityTypeName();
        const label = await this.getOwnerParent().getMetaModel().requestObject(
            "/" + entityTypeName + "/" + property + "@com.sap.vocabularies.Common.v1.Label"
        ) as string | undefined;

        return label || property;
    }

    public async getSelectionFields() {
        const entityTypeName = await this.getOwnerParent().getEntityTypeName();
        const selectionFields = await this.getOwnerParent().getMetaModel().requestObject(
            "/" + entityTypeName + "@com.sap.vocabularies.UI.v1.SelectionFields"
        ) as PropertyPath[] | undefined;

        if (selectionFields == null) {
            return [];
        }

        return selectionFields.map(field => field.$PropertyPath);
    }

    public async getLineItems() {
        const entityTypeName = await this.getOwnerParent().getEntityTypeName();
        const lineItems = await this.getOwnerParent().getMetaModel().requestObject(
            "/" + entityTypeName + "@com.sap.vocabularies.UI.v1.LineItem"
        ) as LineItem[] | undefined;

        if (lineItems == null) {
            return [];
        }

        return lineItems;
    }

    public async getFilterRequiredProperties() {
        const filterRequiredProperties = await this.getOwnerParent().getMetaModel().requestObject(
            "/$EntityContainer/" + this.getOwnerParent().getEntitySet() + "@Org.OData.Capabilities.V1.FilterRestrictions/RequiredProperties"
        ) as PropertyPath[] | undefined;

        if (filterRequiredProperties == null) {
            return [];
        }

        return filterRequiredProperties.map(property => property.$PropertyPath);
    }

    public async getNonFilterableProperties() {
        const nonFilterableProperties = await this.getOwnerParent().getMetaModel().requestObject(
            "/$EntityContainer/" + this.getOwnerParent().getEntitySet() + "@Org.OData.Capabilities.V1.FilterRestrictions/NonFilterableProperties"
        ) as PropertyPath[] | undefined;

        if (nonFilterableProperties == null) {
            return [];
        }

        return nonFilterableProperties.map(property => property.$PropertyPath);
    }

    public async getFilterExpressionRestrictions() {
        const filterExpressionRestrictions = await this.getOwnerParent().getMetaModel().requestObject(
            "/$EntityContainer/" + this.getOwnerParent().getEntitySet() + "@Org.OData.Capabilities.V1.FilterRestrictions/FilterExpressionRestrictions"
        ) as FilterExpressionRestriction[] | undefined;

        if (filterExpressionRestrictions == null) {
            return [];
        }

        return filterExpressionRestrictions;
    }

    public async getFilterExpressionRestrictionType(property: string,) {
        const filterExpressionRestrictions = await this.getFilterExpressionRestrictions();
        const restriction = filterExpressionRestrictions.find(restriction => restriction.Property.$PropertyPath === property);
        return restriction?.AllowedExpressions || "MultiRangeOrSearchExpression";
    }

    public async isPropertyHidden(property: string) {
        const entityTypeName = await this.getOwnerParent().getEntityTypeName();
        const hidden = await this.getOwnerParent().getMetaModel().requestObject(
            "/" + entityTypeName + "/" + property + "@com.sap.vocabularies.UI.v1.Hidden"
        ) as boolean | undefined;

        return hidden === true;
    }

    private getOwnerParent() {
        return this.getParent() as MetadataManager;
    }
}