import React from 'react'
import { CCol, CRow,CCard, CCardBody, CDataTable, CButton, CSpinner, CDropdown, CDropdownToggle, CDropdownMenu, CDropdownItem, CModal, CModalHeader, CModalBody, CModalFooter } from '@coreui/react';
import vendorApi from '../../../api/vendor'
import Colors from '../../../config/Colors';

class Vendors extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      addButtonBgColor: Colors.themeDark,
      importButtonBgColor: Colors.themeDark,
      vendorsTableData: [],
      vendorsField: [
        { key: 'userType', label: 'Type'},
        { key: 'name', label: 'Name'},
        { key: 'emailAddress', label:'Email'},
        { key: 'directDeposit', label:'Direct Deposit'},
        { key: 'action', label:'Action'}
      ],
      showDeleteModal: false,
      selectedCustomerId: ''
      
    }
    
  }
  componentDidMount(){
    this.setState({loader: true})
    let userInfo = JSON.parse(localStorage.getItem('userInfo'))
    vendorApi.get(userInfo.organizationId).then((response) => {
      console.log("Vendors: ", response)
        this.setState({vendorsTableData: response.data, loader:false})
    }).catch((error) => {
      console.log("Error from vendor: ", error)
    })
  }

  deleteVendor = () => {
    console.log("Clicked...", this.state.selectedCustomerId)
    vendorApi.delete(this.state.selectedCustomerId).then((response) => {
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
      {/* <CCol sm="6" lg="6">
          <h5 style={{fontWeight:"bold"}}>Customers</h5>
          <CInputGroup>
              <CInputGroupPrepend>
                  <CInputGroupText className={'bg-info text-white'}>
                      <CIcon name='cil-zoom'/>
                  </CInputGroupText>
              </CInputGroupPrepend>
              <CInput className="col-lg-6" type="input" placeholder="Search">
              </CInput>
          </CInputGroup>
      </CCol> */}
      <CCol sm="12" lg="12">
          <CButton
          onMouseEnter={() => this.setState({addButtonBgColor: Colors.themeGreen})} 
          onMouseLeave={() => this.setState({addButtonBgColor: Colors.themeDark})} 
          style={{margin:5, backgroundColor: this.state.addButtonBgColor, color: Colors.lightText}} 
          onClick={() => this.props.history.push({pathname:'/vendor/add', state:{organizationId: this.state.organizationId }})} 
          className={'float-right'}>Add Vendor</CButton>

          <CButton 
          onMouseEnter={() => this.setState({importButtonBgColor: Colors.themeGreen})} 
          onMouseLeave={() => this.setState({importButtonBgColor: Colors.themeDark})} 
          style={{margin:5, backgroundColor: this.state.importButtonBgColor, color: Colors.lightText}} 
          className={'float-right'}>Import From</CButton>                   
      </CCol>

      <CCol sm="12" lg="12" style={{marginTop: 30}}> 
          <CCard>
          <h5 style={{fontWeight:"bold", margin: 15}}>Vendors</h5>
            {
                  !this.state.loader ?
                  <CCardBody>
                      <CDataTable
                              items={this.state.vendorsTableData}
                              fields={this.state.vendorsField}
                              hover
                              striped
                              bordered
                              itemsPerPage={7}
                              pagination
                              scopedSlots={{
                                'name': (item) => {
                                  return(
                                    <td>{item.firstName} {item.lastName}</td>
                                  )
                                },
                                'directDeposit': (item) => {
                                  return(
                                    <td>-</td>
                                  )
                                },
                                'action': (item) => {
                                  return(
                                    <td>
                                      <CDropdown style={{borderRadius:20}} >
                                          <CDropdownToggle caret color="info" variant="outline" shape="pill"> 
                                          </CDropdownToggle>
                                          <CDropdownMenu>
                                              <CDropdownItem onClick={() => {
                                                  localStorage.setItem('selectedVendor', JSON.stringify(item))
                                                  this.props.history.push({pathname:'/vendor/add'})}
                                              } 
                                              >Edit</CDropdownItem>
                                              <CDropdownItem style={{color:'red'}} onClick={() => this.setState({showDeleteModal: true, selectedCustomerId: item.userId})}>Delete</CDropdownItem>
                                          </CDropdownMenu>
                                      </CDropdown>
                                    </td>
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

      <CModal
            show={this.state.showDeleteModal}
            onClose={this.toggleDeleteModal}
        >
            <CModalHeader style={{backgroundColor:'red', color: 'white', fontSize:20}} closeButton>Delete Vendor</CModalHeader>
            <CModalBody>
            Are you sure you want to delete this vendor? This action can't be undone.
            </CModalBody>
            <CModalFooter>
            <CButton color="danger" onClick={this.deleteVendor}>Delete</CButton>
            <CButton
                color="secondary"
                onClick={this.toggleDeleteModal}
            >Cancel</CButton>
            </CModalFooter>
        </CModal>
  </CRow>
    )
  }
}

export default Vendors