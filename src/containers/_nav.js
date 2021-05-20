import React from 'react'
import CIcon from '@coreui/icons-react'
const _nav = [
    {
        _tag: 'CSidebarNavItem',
        name: 'Dashboard',
        to: '/dashboard',
        icon: <CIcon name="cil-border-clear" customClasses="c-sidebar-nav-icon"/>,
        badge: {
            color: 'info'
        }
    },
    // {
    //     _tag: 'CSidebarNavItem',
    //     name: 'Customer',
    //     to: '/customer',
    //     icon: <CIcon name="cil-user" customClasses="c-sidebar-nav-icon"/>,
    //     badge: {
    //         color: 'info'
    //     },
    // },
    {
        _tag: 'CSidebarNavItem',
        name: 'Vendors',
        to: '/vendors',
        icon: <CIcon name="cil-people" customClasses="c-sidebar-nav-icon"/>,
        badge: {
            color: 'info'
        },
    },
    {
        _tag: 'CSidebarNavItem',
        name: 'Banking',
        to: '/banking',
        icon: <CIcon name="cil-bank" customClasses="c-sidebar-nav-icon"/>,
        badge: {
            color: 'info'
        },
    },
    {
        _tag: 'CSidebarNavItem',
        name: 'Purchases',
        to: '/purchases',
        icon: <CIcon name="cil-briefcase" customClasses="c-sidebar-nav-icon"/>,
        badge: {
            color: 'info'
        },
    },
    {
        _tag: 'CSidebarNavDropdown',
        name: 'Sales',
        to: '/sales',
        icon: <CIcon name="cil-people" customClasses="c-sidebar-nav-icon"/>,
        badge: {
            color: 'info'
        },
        _children: [
            {
                _tag: 'CSidebarNavItem',
                name: 'Estimates',
                to: '/sales/estimates',
              },
            {
              _tag: 'CSidebarNavItem',
              name: 'Invoices',
              to: '/sales/invoice/new',
            },
            {
                _tag: 'CSidebarNavItem',
                name: 'Recurring Invoice',
                to: '/sales/recurringInvoice',
            },
            {
                _tag: 'CSidebarNavItem',
                name: 'Customers',
                to: '/sales/customers',
                exact: false
            },
            {
                _tag: 'CSidebarNavItem',
                name: 'Products & Services',
                to: '/sales/products',
            }
        ]
    },
    {
        _tag: 'CSidebarNavItem',
        name: 'Accounting',
        to: '/accounting',
        icon: <CIcon name="cil-wallet" customClasses="c-sidebar-nav-icon"/>,
        badge: {
            color: 'info'
        },
    },
    {
        _tag: 'CSidebarNavItem',
        name: 'User Profile',
        to: '/profile',
        icon: <CIcon name="cil-user" customClasses="c-sidebar-nav-icon"/>,
        badge: {
            color: 'info'
        },
    },
    {
        _tag: 'CSidebarNavItem',
        name: 'Reports',
        to: '/reports',
        icon: <CIcon name="cil-short-text" customClasses="c-sidebar-nav-icon"/>,
        badge: {
            color: 'info'
        },
    }
]

export default _nav