import React from 'react';
import { Redirect, Route } from 'react-router';
import {isUserAuthenticated} from './helpers/authUtils'
import ImportCustomer from './views/pages/customer/ImportCustomer';
import ViewCustomer from './views/pages/customer/ViewCustomer';

const Dashboard = React.lazy(() => import('./views/pages/dashboard/Dashboard.js'));
const Customer = React.lazy(() => import('./views/pages/customer/Customer.js') )
const AddCustomer = React.lazy(() => import('./views/pages/customer/AddCustomer.js'));
const Vendors = React.lazy(() => import('./views/pages/vendors/Vendors.js'));
const AddVendor = React.lazy(() => import('./views/pages/vendors/AddVendor.js'))
const Sales = React.lazy(() => import('./views/pages/sales/Sales.js') )
const Estimates = React.lazy(() => import('./views/pages/sales/estimates/Estimates.js'))
const Products = React.lazy(() => import('./views/pages/sales/products/Products.js'))

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props => {
            // if (!isUserAuthenticated()) {
            //     // not logged in so redirect to login page with the return url
            //     return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />;
            // }
            console.log("USer.......", isUserAuthenticated())
            if(!isUserAuthenticated()){
                return <Redirect to={{pathname:'/login'}}/>;
            }

            //const loggedInUser = getLoggedInUser();

            // authorised so return component
            return <Component {...props} />;
        }}
    />
);

const routes = [
    { path: '/dashboard', name: 'Dashboard', component: Dashboard, route: PrivateRoute},
    { path: '/sales/customers', exact: true , name: 'Customer', component: Customer, route: PrivateRoute},
    { path: '/sales/customers/add', name: 'AddCustomer', component: AddCustomer, route: PrivateRoute },
    { path: '/sales/customers/view', name: 'ViewCustomer', component: ViewCustomer, route: PrivateRoute },
    { path: '/sales/customers/import', name: 'ViewCustomer', component: ImportCustomer, route: PrivateRoute },
    { path: '/vendors', exact: true , name: 'Vendors', component: Vendors, route:PrivateRoute},
    { path: '/vendor/add', name: 'AddVendor', component: AddVendor, route: PrivateRoute },
    {path: '/sales/invoice/:id', exact:true, name:'Sales', component:Sales, route:PrivateRoute},
    {path: '/sales/estimates/', exact: true, name: 'Estimates', component: Estimates, route: PrivateRoute},
    {path: '/sales/products/', exact: true, name:'Products', component: Products, route: PrivateRoute }
]
export default routes