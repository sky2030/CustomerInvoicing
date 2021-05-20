import { CCard, CCol, CNav, CNavItem, CNavLink, CRow, CTabContent, CTabPane, CTabs } from '@coreui/react';
import NewInvoice from './NewInvoice'
import SelectTemplate from './SelectTemplate'
import {RecurringInvoice} from './RecurringInvoice'
import React from 'react'
import invoiceTemplateApi from '../../../api/invoiceTemplate'

class Sales extends React.Component{
  constructor(props){
    super(props);
    this.state={
      templateSelected: false
    }
    this.handleSelection = this.handleSelection.bind(this)
  }

  componentDidMount(){
    let userInfo = JSON.parse(localStorage.getItem('userInfo'))
    let params = {
      organizationId: userInfo.organizationId
    }
    invoiceTemplateApi.get(userInfo.userId,params).then((response) => {
      if(response.data !== ''){
        this.setState({templateSelected: true})
      }
    }).catch((err) => {
     // alert("Error:" + err.response.data[0])
    })
  }

  handleSelection(val){
    this.setState({templateSelected: val})
  }

  render(){
    return(
      <CRow>
        <CCol sm="12" lg="12" style={{marginTop: 30}}> 
          <CCard>
            <CTabs>
              <CNav variant="tabs">
                <CNavItem>
                  <CNavLink>
                    Invoices
                  </CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink>
                    Recurring Invoice
                  </CNavLink>
                </CNavItem>
              </CNav>
              <CTabContent>
                <CTabPane>
                  {
                    !this.state.templateSelected ?
                    <SelectTemplate templateSelected={this.handleSelection}></SelectTemplate>
                    :
                    <NewInvoice></NewInvoice>
                  }
                </CTabPane>
                <CTabPane>
                  <RecurringInvoice></RecurringInvoice>
                </CTabPane>
              </CTabContent>
            </CTabs>
          </CCard>
      </CCol>
      </CRow>
    )
  }
}

export default Sales