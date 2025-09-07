using CompanyManagement from './data-provider';

annotate CompanyManagement.Employees with @(UI: {
    SelectionFields: [
        ID,
        countryCode
    ],
    LineItem       : [
        {
            $Type: 'UI.DataField',
            Value: firstName
        },
        {
            $Type: 'UI.DataField',
            Value: lastName
        }
    ]
});

annotate CompanyManagement.Employees with {
    ID           @Common.Label: 'Employee ID';
    firstName    @Common.Label: 'First Name';
    lastName     @Common.Label: 'Last Name';
    countryCode  @Common.Label: 'Country'  @UI.Hidden;
};

annotate CompanyManagement.Employees with @(Capabilities.FilterRestrictions: {
    NonFilterableProperties     : [ID],
    FilterExpressionRestrictions: [{
        $Type             : 'Capabilities.FilterExpressionRestrictionType',
        AllowedExpressions: 'SingleValue',
        Property          : countryCode
    }]
});
