// import CIcon from '@coreui/icons-react';
import { CCol, CInput, CInputGroup, CRow,CCard, CCardBody, CDataTable, CButton, CSpinner, CDropdownToggle, CDropdown, CDropdownMenu, CDropdownItem, CModal, CModalHeader, CModalBody, CModalFooter } from '@coreui/react';
import React from 'react'
import Colors from '../../../config/Colors';
import customerApi from '../../../api/customer'
// var axios = require('axios')
let customersField = [
    { key: 'firstName', label: 'First Name'},
    { key: 'emailAddress', label: 'Email'},
    { key: 'mobileNumber', label: 'Phone'},
    { key: 'saveCards', label: 'Save Cards'},
    { key: 'balance', label:'Balance/Overdue'},
    { key: 'actions', label: ''}
    
]
class Customer extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            organizationId: '',
            importButtonBgColor: Colors.themeDark,
            addButtonBgColor: Colors.themeDark,
            loader: false,
            customersData: [],
            customersTableData: [],
            showDeleteModal: false,
            selectedCustomerId: '',
            
            // payableData: [
            //     {id: 0, 'Name': 'Customer1', 'Email': 'customer1@gmail.com', 'Phone': '9993339399','Saved Cards': 'Card Here', 'Balance/Overdue': '$0.0'},
            //     {id: 1, 'Name': 'Customer2', 'Email': 'customer2@gmail.com', 'Phone': '9993339399','Saved Cards': 'Card Here', 'Balance/Overdue': '$0.0'},
            //     {id: 2, 'Name': 'Customer3', 'Email': 'customer3@gmail.com', 'Phone': '9993339399','Saved Cards': 'Card Here', 'Balance/Overdue': '$0.0'},
            //     {id: 3, 'Name': 'Customer4', 'Email': 'customer4@gmail.com', 'Phone': '9993339399','Saved Cards': 'Card Here', 'Balance/Overdue': '$0.0'},
            //     {id: 0, 'Name': 'Customer1', 'Email': 'customer1@gmail.com', 'Phone': '9993339399','Saved Cards': 'Card Here', 'Balance/Overdue': '$0.0'},
            //     {id: 1, 'Name': 'Customer2', 'Email': 'customer2@gmail.com', 'Phone': '9993339399','Saved Cards': 'Card Here', 'Balance/Overdue': '$0.0'},
            //     {id: 2, 'Name': 'Customer3', 'Email': 'customer3@gmail.com', 'Phone': '9993339399','Saved Cards': 'Card Here', 'Balance/Overdue': '$0.0'},
            //     {id: 3, 'Name': 'Customer4', 'Email': 'customer4@gmail.com', 'Phone': '9993339399','Saved Cards': 'Card Here', 'Balance/Overdue': '$0.0'},
            //     {id: 0, 'Name': 'Customer1', 'Email': 'customer1@gmail.com', 'Phone': '9993339399','Saved Cards': 'Card Here', 'Balance/Overdue': '$0.0'},
            //     {id: 1, 'Name': 'Customer2', 'Email': 'customer2@gmail.com', 'Phone': '9993339399','Saved Cards': 'Card Here', 'Balance/Overdue': '$0.0'},
            //     {id: 2, 'Name': 'Customer3', 'Email': 'customer3@gmail.com', 'Phone': '9993339399','Saved Cards': 'Card Here', 'Balance/Overdue': '$0.0'},
            //     {id: 3, 'Name': 'Customer4', 'Email': 'customer4@gmail.com', 'Phone': '9993339399','Saved Cards': 'Card Here', 'Balance/Overdue': '$0.0'},
                
            // ],
            // payableFields:  [
            //     { key: 'Name'},
            //     'Email',
            //     { key: 'Phone'},
            //     { key: 'Saved Cards'},
            //     { key: 'Balance/Overdue'},
            // ],
        }
    }

    componentDidMount(){
        
        this.setState({loader: true})
        let userInfo = JSON.parse(localStorage.getItem('userInfo'))
        console.log("UserInfo", userInfo.organizationId)
        
        console.log("Here..................................")
        // let headers = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJqYXltYFieldsWhldGEiLCJ1c2VybmFtZSI6ImpheW1haGV0YSIsInVzZXJJZCI6IjQiLCJvcmdhbml6YXRpb25JZCI6IjMiLCJvcmdhbml6YXRpb25EaXNwbGF5TmFtZSI6ImFkbWluT3JnIiwiaWF0IjoxNjE4Njg4NTQzLCJleHAiOjE2MTg2OTAzNDN9.tuFDaGxhSCkEbavPfZU4UFytS0Chn_n5O_fxc0V1er0'
        customerApi.get(userInfo.organizationId).then((response) => {
            console.log("Response Customers........",response.data.length)
            // response.data.forEach((customer) => {
            //     tdata.push({
            //         'Name': customer.firstName + ' ' + customer.lastName,
            //         'Email': customer.emailAddress,
            //         'Phone': customer.mobileNumber,
            //         'Save Cards': '',
            //         // 'Balance/Overdue': ''
            //     })
            // })
            this.setState({loader:false, customersTableData: response.data,customersData: response.data, organizationId: userInfo.organizationId})
        }).catch((err) =>{
            console.log("Error HERE",err)
            this.setState({loader:false})
        })
    }

    deleteCustomer = () => {
        console.log("Clicked...", this.state.selectedCustomerId)
        customerApi.delete(this.state.selectedCustomerId).then((response) => {
            console.log("Delete Response", response)
            window.location.reload()
        }).catch((err) => {
            console.log("Err:", err)
            alert('Something went wrong')
        })

    }
    toggleDeleteModal = () => {
        this.setState({showDeleteModal: !this.state.showDeleteModal})
    }
    
    

    render(){
        return(
            <CRow>
                <CModal
            show={this.state.showDeleteModal}
            onClose={this.toggleDeleteModal}
        >
            <CModalHeader style={{backgroundColor:'red', color: 'white', fontSize:20}} closeButton>Delete Customer</CModalHeader>
            <CModalBody>
            Are you sure you want to delete this customer? This action can't be undone.
            </CModalBody>
            <CModalFooter>
            <CButton color="danger" onClick={this.deleteCustomer}>Delete</CButton>
            <CButton
                color="secondary"
                onClick={this.toggleDeleteModal}
            >Cancel</CButton>
            </CModalFooter>
        </CModal>
                <CCol sm="6" lg="6">
                    <h5 style={{fontWeight:"bold"}}>Customers</h5>
                    <CInputGroup>
                        {/* <CInputGroupPrepend>
                            <CInputGroupText className={'bg-info text-white'}>
                                <CIcon name='cil-zoom'/>
                            </CInputGroupText>
                        </CInputGroupPrepend> */}
                        <CInput className="col-lg-6" type="input" placeholder="Search">
                        </CInput>
                        <h6 style={{padding:10}}>{this.state.customersData.length !== 0 ? this.state.customersData.length + " customers found": "No customers found"}</h6>
                    </CInputGroup>
                </CCol>
                <CCol sm="6" lg="6">
                    <CButton 
                    shape="pill"
                    onMouseEnter={() => this.setState({addButtonBgColor: Colors.themeGreen})} 
                    onMouseLeave={() => this.setState({addButtonBgColor: Colors.themeDark})} 
                    style={{margin:10, backgroundColor: this.state.addButtonBgColor, color: Colors.lightText}} 
                    onClick={() => this.props.history.push({pathname:'/sales/customers/add', state:{organizationId: this.state.organizationId }})} 
                    className={'float-right'}>Add Customer</CButton>

                    <CDropdown
                    className={'float-right'}> 
                        <CDropdownToggle caret color="info" variant="outline" shape="pill" onMouseEnter={() => this.setState({importButtonBgColor: Colors.themeGreen})} 
                    onMouseLeave={() => this.setState({importButtonBgColor: Colors.themeDark})} 
                    style={{margin:10, backgroundColor: this.state.importButtonBgColor, color: Colors.lightText}} > 
                        Import From...
                        </CDropdownToggle>
                        <CDropdownMenu>
                            <CDropdownItem 
                            onClick={() => this.props.history.push({pathname:'/sales/customers/import'})}
                            >CSV</CDropdownItem>
                            
                           </CDropdownMenu>
                    </CDropdown>                   
                </CCol>

                <CCol sm="6" lg="12" style={{marginTop: 30}}> 
                    <CCard>
                        {
                            !this.state.loader ?
                            <CCardBody>
                                <CDataTable
                                        items={this.state.customersTableData}
                                        fields={customersField}
                                        hover
                                        striped
                                        bordered
                                        itemsPerPage={7}
                                        pagination
                                        style={{innerHeight:500}}
                                        scopedSlots={{
                                            'actions' : (item) => 
                                                 (
                                                    <td>
                                                        <CDropdown style={{borderRadius:20}} >
                                                            <CDropdownToggle caret color="info" variant="outline" shape="pill"> 
                                                            </CDropdownToggle>
                                                            <CDropdownMenu>
                                                                <CDropdownItem onClick={() => {
                                                                    localStorage.setItem('selectedCustomer', JSON.stringify(item))
                                                                    this.props.history.push({pathname:'/sales/customers/view'})}
                                                                }
                                                                >View</CDropdownItem>
                                                                <CDropdownItem onClick={() => {
                                                                    localStorage.setItem('selectedCustomer', JSON.stringify(item))
                                                                    this.props.history.push({pathname:'/sales/customers/add'})}
                                                                } 
                                                                >Edit</CDropdownItem>
                                                                <CDropdownItem style={{color:'red'}} onClick={() => this.setState({showDeleteModal: true, selectedCustomerId: item.userId})}>Delete</CDropdownItem>
                                                            </CDropdownMenu>
                                                        </CDropdown>
                                                    </td>

                                                ),
                                            'saveCards': (item) => {
                                                return(
                                                    <td>-</td>
                                                )
                                            },
                                            'balance': (item) => {
                                                return(
                                                    <td>-</td>
                                                )
                                            }
                                            
                                        }}
                                    />
                            </CCardBody>
                            :
                            <div className="row d-flex justify-content-center mt-3 mb-3">
                                <CSpinner color="info"></CSpinner>
                            </div>
                        }
                    </CCard>
                </CCol>

            </CRow>
        )
    }
    
}

export default Customer;