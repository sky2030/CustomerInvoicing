// import CIcon from '@coreui/icons-react';
import { CCol, CInput, CInputGroup, CRow,CCard, CCardBody, CDataTable, CButton, CSpinner, CDropdownToggle, CDropdown, CDropdownMenu, CDropdownItem, CModal, CModalHeader, CModalBody, CModalFooter } from '@coreui/react';
import React from 'react'
import DarkThemeButton from '../../../../components/Buttons.js';
import Colors from '../../../../config/Colors.js';
import productApi from '../../../../api/product'

// import customerApi from '../../../api/customer'
// var axios = require('axios')
let productsFields = [
    { key: 'productName', label: 'Name'},
    {key: 'productDescription', label:"Description"},
    { key: 'productPrice', label: 'Price'},
    { key: 'actions', label: 'Actions'}
    
]
class Product extends React.Component {
    constructor(props){
        super(props)
        this.state = {
          organizationId: '',
          productsTableData: [],
          selectedProductId: '',
          showDeleteModal: false,
          loader: false
        }
    }

    componentDidMount(){
        this.setState({loader: true})
        let userInfo = JSON.parse(localStorage.getItem('userInfo'))
        productApi.get(userInfo.organizationId).then((res) => {
            console.log("Products...", res.data)
            this.setState({productsTableData: res.data, loader: false})
        }).catch((error) => {
            this.setState({loader: false})
            console.log("Error", error)
        })

    }

    deleteProduct = () => {
        console.log("Clicked...", this.state.selectedCustomerId)
        productApi.delete(this.state.selectedProductId).then((response) => {
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
            Are you sure you want to delete this product? This action can't be undone.
            </CModalBody>
            <CModalFooter>
            <CButton color="danger" onClick={this.deleteProduct}>Delete</CButton>
            <CButton
                color="secondary"
                onClick={this.toggleDeleteModal}
            >Cancel</CButton>
            </CModalFooter>
        </CModal>
                <CCol sm="6" lg="6">
                    <h5 style={{fontWeight:"bold"}}>Products & Services (Sales)</h5>
                </CCol>
                <CCol sm="6" lg="6">
                  <DarkThemeButton 
                  shape="pill"
                  style={{float:'right'}}
                  label='Add a product or service'
                  click={() => this.props.history.push({pathname:'/sales/products/add'})} 
                  className={'float-right'}></DarkThemeButton>                  
                </CCol>

                <CCol sm="6" lg="12" style={{marginTop: 30}}> 
                    <CCard>
                        {
                          !this.state.loader ?
                            <CCardBody>
                                <CDataTable
                                    items={this.state.productsTableData}
                                    fields={productsFields}
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
                                                            {/* <CDropdownItem onClick={() => {
                                                                localStorage.setItem('selectedCustomer', JSON.stringify(item))
                                                                this.props.history.push({pathname:'/sales/customers/view'})}
                                                            }
                                                            >View</CDropdownItem> */}
                                                            <CDropdownItem onClick={() => {
                                                                localStorage.setItem('selectedProduct', JSON.stringify(item))
                                                                this.props.history.push({pathname:'/sales/products/add'})}
                                                            } 
                                                            >Edit</CDropdownItem>
                                                            <CDropdownItem style={{color:'red'}} onClick={() => this.setState({showDeleteModal: true, selectedProductId: item.productId})}>Delete</CDropdownItem>
                                                        </CDropdownMenu>
                                                    </CDropdown>
                                                </td>

                                            )
                                        
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

export default Product;