/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable semi */

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

export type FilterExpressionRestrictionType =
    "SingleValue" |
    "SingleRange" |
    "MultiValue" |
    "MultiRange" |
    "SearchExpression" |
    "MultiRangeOrSearchExpression";

type LineItemType = "com.sap.vocabularies.UI.v1.DataField";