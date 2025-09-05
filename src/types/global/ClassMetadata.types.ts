import ManagedObject from "sap/ui/base/ManagedObject";

export type PropertyGetter<T> = () => T;
export type PropertySetter<T> = (newValue: T) => void;
export type AggregationGetter<T extends ManagedObject | ManagedObject[] | undefined> = () => T;
export type AggregationSetter<T extends ManagedObject> = (aggregation: T) => void;

export type ClassMetadata = {
    library: "ui5.shaula";
    properties?: Property;
    defaultProperty?: string;
    aggregations?: Aggregation;
    defaultAggregation?: string;
    associations?: Association;
    events?: Event;
    abstract?: boolean;
    final?: boolean;
    deprecated?: boolean;
};

type Property = {
    [key: string]: {
        type: DataType;
        defaultValue?: any;
        visibility?: Visibility;
        deprecated?: boolean;
    };
};

type Aggregation = {
    [key: string]: {
        type: string;
        bindable?: boolean | "bindable";
        visibility?: Visibility;
        deprecated?: boolean;
    } & AggregationAssociationType;
};

type Association = {
    [key: string]: {
        type: string;
        visibility?: Visibility;
        deprecated?: boolean;
    } & AggregationAssociationType;
};

type Event = {
    [key: string]: {
        parameters?: {
            [key: string]: {
                type: DataType;
            };
        };
        allowPreventDefault?: boolean;
        deprecated?: boolean;
    };
};

type AggregationAssociationType = {
    multiple: false;
} | {
    multiple: true;
    singularName: string;
}

type DataType =
    "string" |
    "boolean" |
    "int" |
    "float" |
    "object" |
    "function" |
    "any" |
    "string[]" |
    "boolean[]" |
    "int[]" |
    "float[]" |
    "object[]" |
    "function[]" |
    "any[]" |
    `ui5.shaula.${string}` |
    `sap.${string}`;

type Visibility = "hidden" | "public";