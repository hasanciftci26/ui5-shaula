/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable semi */

import { PropertyGetter, PropertySetter } from "ui5/shaula/types/global/ClassMetadata.types";

declare module "ui5/shaula/metadata/ODataMetadata" {
    export default interface ODataMetadata {
        getEntitySet: PropertyGetter<string>;
        setEntitySet: PropertySetter<string>;
    }
}

export type Settings = {
    entitySet: string;
};

export type Property = {
    name: string;
    type: EdmType;
    label: string;
    visibleInTable: boolean;
    visibleInFilterBar: boolean;
    filterRequired: boolean;
    filterable: boolean;
    filterExpressionRestrictionType: FilterExpressionRestrictionType;
};

export type PropertyPath = {
    $PropertyPath: string;
};

export type LineItem = {
    $Type: LineItemType;
    Value: {
        $Path: string;
    };
};

export type FilterExpressionRestriction = {
    $Type: "Org.OData.Capabilities.V1.FilterExpressionRestrictionType";
    AllowedExpressions: FilterExpressionRestrictionType;
    Property: PropertyPath;
};

export type EntityType = Record<string, EntityTypeElement>;
export type EntityTypeElement = string | string[] | EntityTypeProperty;

export type EntityTypeProperty = {
    $kind: "Property";
    $Type: EdmType;
} | {
    $kind: "NavigationProperty";
    $Type: string;
};

type FilterExpressionRestrictionType =
    "SingleValue" |
    "SingleRange" |
    "MultiValue" |
    "MultiRange" |
    "SearchExpression" |
    "MultiRangeOrSearchExpression";

type LineItemType = "com.sap.vocabularies.UI.v1.DataField";

type EdmType =
    "Edm.Binary" |
    "Edm.Boolean" |
    "Edm.Byte" |
    "Edm.DateTime" |
    "Edm.DateTimeOffset" |
    "Edm.Decimal" |
    "Edm.Double" |
    "Edm.Guid" |
    "Edm.Int16" |
    "Edm.Int32" |
    "Edm.Int64" |
    "Edm.SByte" |
    "Edm.Single" |
    "Edm.Stream" |
    "Edm.String" |
    "Edm.Time";