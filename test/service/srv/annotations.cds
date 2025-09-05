using CompanyManagement from './data-provider';

annotate CompanyManagement.Employees with @(UI: {LineItem: [
    {
        $Type: 'UI.DataField',
        Value: firstName
    },
    {
        $Type: 'UI.DataField',
        Value: lastName
    }
]});

annotate CompanyManagement.Employees with {
    ID        @Common.Label: 'Employee ID';
    firstName @Common.Label: 'First Name';
    lastName  @Common.Label: 'Last Name';
};
