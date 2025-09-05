using {Employees as DBEmployees} from '../db/data-models';

service CompanyManagement {
    entity Employees as select from DBEmployees;
};
