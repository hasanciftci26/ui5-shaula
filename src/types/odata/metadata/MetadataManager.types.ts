/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable semi */

import AnnotationManager from "ui5/shaula/odata/metadata/AnnotationManager";
import { AggregationGetter, AggregationSetter, PropertyGetter, PropertySetter } from "ui5/shaula/types/global/ClassMetadata.types";
import { FilterExpressionRestrictionType } from "ui5/shaula/types/odata/metadata/AnnotationManager.types";

declare module "ui5/shaula/odata/metadata/MetadataManager" {
    export default interface MetadataManager {
        getEntitySet: PropertyGetter<string>;
        setEntitySet: PropertySetter<string>;
        getEntityTypeProperties: PropertyGetter<Property[]>;
        setEntityTypeProperties: PropertySetter<Property[]>;
        getAnnotationManager: AggregationGetter<AnnotationManager>;
        setAnnotationManager: AggregationSetter<AnnotationManager>;
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
    includeInTable: boolean;
    visibleInFilterBar: boolean;
    filterRequired: boolean;
    includeInFilterBar: boolean;
    filterExpressionRestrictionType: FilterExpressionRestrictionType;
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