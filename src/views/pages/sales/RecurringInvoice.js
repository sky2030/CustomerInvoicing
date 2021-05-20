import {  CContainer } from '@coreui/react'
import React from 'react'
import Colors from '../../../config/Colors'
import autoPaymentAsset from '../../../assets/RecurringInvoice/1.png'
import customizeAsset from '../../../assets/RecurringInvoice/2.png'
import cashFlowAsset from '../../../assets/RecurringInvoice/3.png'


function RecurringInvoice(){

  return(
    <CContainer>
      <h4 className='mt-4 text-center font-weight-bold'>Get paid without lifting finger</h4>
      <h4 className='mt-4 text-center '>Automate your Invoices on a schedule that works for you and customers</h4>
      {/* <CButton >Create a recurring Invoice</CButton> */}
      <div style={{display:'flex', flexDirection: 'row', justifyContent:'space-between', margin: 30 }}>
        <div style={{border:`1px dotted ${Colors.themeGreen}`, borderRadius: 10, width:'40%', padding:30, margin:20}}>
          <div style={{display: 'flex',justifyContent: 'center', margin:5}}>
            <img src={autoPaymentAsset} style={{height:50, width:50}} alt=""></img>
          </div>
          <h5 className="text-center mt-3">Automatic Payments</h5>
          <p className="text-center p-6">
            Securely save you customers credit card to get paid instantly
          </p>
        </div>
        <div style={{border:`1px dotted ${Colors.themeGreen}`, borderRadius: 10, width:'40%', padding:30, margin:20}}>
          <div style={{display: 'flex',justifyContent: 'center', margin:5}}>
            <img src={customizeAsset} style={{height:50, width:50}} alt=""></img>
          </div>
          <h5 className="text-center mt-3">Customizable scheduling</h5>
          <p className="text-center p-6">
            You're in control. Your customers get your invoices exactly when you want them to.
          </p>
        </div>
        <div style={{border:`1px dotted ${Colors.themeGreen}`, borderRadius: 10, width:'40%', padding:30, margin:20}}>
          <div style={{display: 'flex',justifyContent: 'center', margin:5}}>
            <img src={cashFlowAsset} style={{height:50, width:50}} alt=""></img>
          </div>
          <h5 className="text-center mt-3">Consistent cashflow</h5>
          <p className="text-center p-6">
            Create installment plans that work for your customers, so payment is easy and reliable.
          </p>
        </div>
      </div>
    </CContainer>
  )
}  

export {
  RecurringInvoice
}