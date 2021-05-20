import { CButton, CCard, CCardBody, CCol, CNav, CNavItem, CNavLink, CRow, CTabContent, CTabPane, CTabs } from '@coreui/react'
import React from 'react'
import NoInvoice from '../../../assets/ViewCustomer/noInvoices.png'
import Profile from '../../../assets/ViewCustomer/profile.png'
import savedCards from '../../../assets/ViewCustomer/savedCards.png'
import Colors from '../../../config/Colors'

class ViewCustomer extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      customer: null
    }
  }

  componentDidMount(){
    let custerInfo = JSON.parse(localStorage.getItem('selectedCustomer'))
    this.setState({customer: custerInfo}, () => {
      console.log("Customer", this.state.customer)
    })
  }


  componentWillUnmount(){
    localStorage.removeItem('selectedCustomer')
  }
   render(){
     return(
       //  <div>View Customer</div>
       <div>

        <CRow>
          <h3 className="m-3" style={{fontWeight:'bold'}}>{this.state.customer !== null ? this.state.customer.firstName + ' ' + this.state.customer.lastName: '' }</h3>
        </CRow>
        <CRow>
          <CCol className='col-3'>
            <CCard>
              <CCardBody>
              <div style={{ margin:'auto'}}>
                <div style={{display: 'flex',justifyContent: 'center', margin:5}}>
                  <img src={Profile} style={{height:100, width:100}} alt=""></img>
                </div>
                {
                  this.state.customer !== null?
                  <div>
                    <div className='p-3' > 
                      <p>Primary Contact</p>
                      <p>{this.state.customer.emailAddress}<br/> 
                        {this.state.customer.mobileNumber}
                      </p>
                    </div>
                    {
                      this.state.customer.address[0] !== undefined?
                    <div>
                      <hr className="mt-4"></hr>
                      <div className='p-3' > 

                        <p>Billing Address</p>
                        <p>{this.state.customer.address[0].addressLine1}<br/> 
                          {this.state.customer.address[0].addressLine2}<br/> 
                          {this.state.customer.address[0].city}, {this.state.customer.address[0].state.name} <br/>
                          {this.state.customer.address[0].zip_postal_code}
                        </p>
                        <p>Currency</p>
                      </div>
                    </div>
                    :
                    <div></div>
                    }
                    {
                      this.state.customer.address[0] !== undefined?
                      <div>
                        <hr className="mt-4"></hr>
                        <div className='p-3' > 
                          <p>Shipping</p>
                          <p>{this.state.customer.address[1].addressLine1}<br/> 
                            {this.state.customer.address[1].addressLine2}<br/> 
                            {this.state.customer.address[1].city}, {this.state.customer.address[1].state.name} <br/>
                            {this.state.customer.address[1].zip_postal_code}
                          </p>
                          <p style={{color:Colors.themeGreen, cursor:'pointer'}}>View delivery Instruction</p>
                        </div>
                      </div>
                    : 
                    <div></div>
                    }
                    </div>
                  :
                  <div></div>
                }
              </div>
              </CCardBody>
            </CCard>
          </CCol>
          <CCol className='col-9'>  
            <CCard>
              <CTabs>
                <CNav variant="tabs">
                  <CNavItem>
                    <CNavLink>
                      Overview
                    </CNavLink>
                  </CNavItem>
                  <CNavItem>
                    <CNavLink>
                      Invoices
                    </CNavLink>
                  </CNavItem>
                </CNav>
                <CTabContent>
                  <CTabPane>
                    <div>
                      <div className='m-5'>  
                        <div style={{border:`1px dotted ${Colors.themeGreen}`, borderRadius: 10, padding:30, margin:'auto'}}>
                          <div style={{display: 'flex',justifyContent: 'center', margin:5}}>
                            <img src={NoInvoice} style={{height:100, width:100}} alt=""></img>
                          </div>
                          <h4 className="text-center p-6 mt-4">
                            No Unpaid Invoices
                          </h4>
                          <div style={{display: 'flex',justifyContent: 'center', margin:15}}>
                            <CButton color='info' variant='outline' shape='pill'>Create new Invoice</CButton>
                          </div>
                        </div>
                      </div>
                      <div className='m-5'>  
                        <div style={{border:`1px dotted ${Colors.themeGreen}`, borderRadius: 10, padding:30, margin:'auto'}}>
                          <div style={{display: 'flex',justifyContent: 'center', margin:5}}>
                            <img src={savedCards} style={{height:100, width:100}} alt=""></img>
                          </div>
                          <h4 className="text-center p-6 mt-4">
                            No Saved Cards
                          </h4>
                          <p className="text-center p-6 mt-3">Accept credit cards and get paid up to 3x faster</p>
                          <div style={{display: 'flex',justifyContent: 'center', margin:15}}>
                            <CButton color='info' variant='outline' shape='pill'>Turn on Payments</CButton>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CTabPane>
                  <CTabPane>
                    
                  </CTabPane>
                </CTabContent>
              </CTabs>
            </CCard>
          </CCol>
          {/* <CCol></CCol>
          <CCol></CCol> */}
        </CRow>
       </div>
     )
   }
}

export default ViewCustomer;