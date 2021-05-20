import React from 'react'
import {CRow, CCol, CCard, CCardBody, CCardHeader, CInputGroup, CInputGroupPrepend, CLabel, CInput, CForm, CSelect, CTextarea, CButton, CSpinner, CToaster, CToast, CToastHeader, CToastBody} from '@coreui/react'
import customerApi from '../../../api/customer'
import Styles from '../styles'
import Colors from '../../../config/Colors';
import countriesApi from '../../../api/countries'
import stateApi from '../../../api/states'
import currencyApi from '../../../api/currency'

class AddCustomer extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            loader: false,
            userInfo: null,
            formData: {},
            countries: [],
            currecies: [],
            billingStates: [],
            shippingStates: [],
            selectedCustomerId: '',
            currency: null,
            // {
            //     "currencyId":"",
            //     "name": ""
            // },
            billingAddress:{
                "addressLine1":"",
                "addressLine2":"",
                "country":null,
                // {
                //     "countryId":"",
                //     "name":""
                // },
                "state":null,
                // {
                //     "stateId":"",
                //     "name":""
                // },
                "city":"",
                "zip_postal_code":"",
                "deliveryInstructions":"",
                "active":"",
                "deleted":"",
                "billing":true,
                "shipping":false,
            },
            shippingAddress: {
                "addressLine1":"",
                "addressLine2":"",
                "country":null,
                // {
            
                //     "countryId":"",
                //     "name":""
                // },
                "state": null,
                // {
            
                //     "stateId":"",
                //     "name":""
                // },
                "city":"",
                "zip_postal_code":"",
                "deliveryInstructions":"",
                "active":"",
                "deleted":"",
                "billing":false,
                "shipping":true,
            },
            toast: {
                showToast: false,
                toastHeader: '',
                toastBody: '',
                toastTextClass: '',
                toasterKey: 0
            },

        }
        this.onFormSubmit = this.onFormSubmit.bind(this)
        this.onBillingCountryChange = this.onBillingCountryChange.bind(this)
        this.onBillingStateChange = this.onBillingStateChange.bind(this)
        this.onShippingCountryChange = this.onShippingCountryChange.bind(this)
        this.onShippingStateChange = this.onShippingStateChange.bind(this)
    }

    componentDidMount(){
        console.log("Selected Customer::", JSON.parse(localStorage.getItem('selectedCustomer')))
        if(JSON.parse(localStorage.getItem('selectedCustomer')) !== null){
            let customer = JSON.parse(localStorage.getItem('selectedCustomer'))
            console.log("Here in customer././//////./......///////")

            this.setState({formData: customer, billingAddress: customer.address[0], shippingAddress: customer.address[1], currency: customer.currency  ,selectedCustomerId: customer.userId})
            this.setState({formData: customer, billingAddress: customer.address[0], shippingAddress: customer.address[1]})

        }
        let user = JSON.parse(localStorage.getItem('userInfo'))
        // Promise.all([countriesApi.get().th]).then((response) => {
        //     console.log("><><><><><", response)
        // }).catch((err) => {
        //     console.log("Error:", err)
        // })
        countriesApi.get().then((res) => {
            this.setState({countries: res.data})
        }).catch((err) => {
            console.log("Error:", err)
        }) 
        currencyApi.get().then((res) => {
            this.setState({currecies: res.data})
        }).catch((error) => {
            alert('Error:' + error)
        })


        this.setState({userInfo: user })
    }

    componentWillUnmount(){
        localStorage.removeItem('selectedCustomer')
    }

    onFormSubmit(){
        let address = [this.state.billingAddress, this.state.shippingAddress]
        this.setState({loader:true})

        if (localStorage.getItem('selectedCustomer') !== null){
            this.setState({formData: {...this.state.formData, address: address, currency: this.state.currency, userId: this.state.selectedCustomerId}} , () => {
            console.log("Address:", address)
            console.log('Form Data:', this.state.formData)
            let headers = {
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + localStorage.getItem('token')
            }
            let formData = JSON.stringify(this.state.formData)
                customerApi.put(formData, headers).then((response) => {
                    this.setState({loader:false})
                    this.props.history.push('/sales/customers')
                }).catch((error) => {
                    console.log("Error:", error.response.data[0])
                    alert("Failed: "+ error.response.data[0])
                    this.setState({loader:false})
                })
            })
        }else {
            this.setState({formData: {...this.state.formData, address: address, currency: this.state.currency, organization: {"organizationId": this.state.userInfo.organizationId },"active": true}} , () => {
            console.log("Address:", address)
            console.log('Form Data:', this.state.formData)
    
            let formData = JSON.stringify(this.state.formData)
            let headers = {
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + localStorage.getItem('token')
            }
            customerApi.post(formData,headers).then((response) => {
                console.log("Response:", response)
                this.setState({
                    loader:false
                })
                this.props.history.push('/sales/customers')
            }).catch((error) => {
                console.log("Error:", error)
                // alert("Failed: "+ error.response.data[0])

                console.log("Error:", error.response.data[0])
                alert("Failed: "+ error.response.data[0])
                this.setState({loader:false})
            })
        })
    
    }
}

    

    onCurrencyChange = (e) => {
        let val = e.target.value
        let currencyArr = val.split('-')
        console.log(currencyArr)
        this.setState({currency: {...this.state.currency, currencyId: currencyArr[0], name: currencyArr[1]}})
    }

    onBillingCountryChange(e){
        console.log("><><><><?????????????",e.target.value)
        let val = e.target.value
        let countryArr = val.split('-')
        this.setState({billingAddress: {...this.state.billingAddress, country: { countryId: countryArr[0], name: countryArr[1]}}})
        stateApi.get(countryArr[0]).then((res) => {
            console.log("Response", res)
            this.setState({billingStates: res.data})
        }).catch((err) => {

            console.log("Error", err)
        })
 
    }
    onBillingStateChange(e){
        let val = e.target.value
        let stateArr = val.split('-')
        console.log(stateArr)
        this.setState({billingAddress: {...this.state.billingAddress, state: { stateId: stateArr[0], name: stateArr[1]}}})
    }
    
    onShippingCountryChange(e){
        let val = e.target.value
        let countryArr = val.split('-')
        this.setState({shippingAddress: {...this.state.shippingAddress, country: { countryId: countryArr[0], name: countryArr[1]}}})
        stateApi.get(countryArr[0]).then((res) => {
            console.log("Response", res)
            this.setState({shippingStates: res.data})
        }).catch((err) => {
            console.log("Error", err)
        })
 
    }
    onShippingStateChange(e){
        let val = e.target.value
        let stateArr = val.split('-')
        this.setState({shippingAddress: {...this.state.shippingAddress, state: { stateId: stateArr[0], name: stateArr[1]}}})
    }


    render(){
        return(
            <CRow>
                <CCol>
                    <CToaster position={'top-right'} key={this.state.toast.toasterKey}>
                        <CToast
                            show={this.state.toast.showToast}
                            autohide={3000}
                            fade={true}
                         >
                            <CToastHeader closeButton={true} className={`h4 m-4 ${this.state.toast.toastTextClass}`}>
                                {this.state.toast.toastHeader}
                            </CToastHeader>
                            <CToastBody className={`h5 m-3 ${this.state.toast.toastTextClass}`}>
                            {this.state.toast.toastBody}
                            </CToastBody>
                        </CToast>
                    </CToaster>
                </CCol>
                <CCol sm="6" lg="12"> 
                    <CCard>
                        <CCardHeader>
                           <h4>Add Customer</h4> 
                        </CCardHeader>
                        <CCardBody>
                            <h5>Contact</h5>
                            <div className="row d-flex justify-content-center">
                                <CForm className='col-md-7 justify-content-center'>
                                    <CInputGroup className="mt-3">
                                        <CInputGroupPrepend className="col-md-4">
                                            <CLabel className="mfs-auto align-self-center h6">First Name *</CLabel>
                                            {/* <p>*</p> */}
                                        </CInputGroupPrepend>
                                        <CInput style={Styles.inputBorderRadius} value={this.state.formData.firstName}  onChange={(event) => this.setState({formData:{...this.state.formData, firstName: event.target.value}})}></CInput>
                                    </CInputGroup>
                                    <CInputGroup className="mt-3">
                                        <CInputGroupPrepend className="col-md-4">
                                            <CLabel className="mfs-auto align-self-center h6">Last Name *</CLabel>
                                            {/* <p>*</p> */}
                                        </CInputGroupPrepend>
                                        <CInput style={Styles.inputBorderRadius} value={this.state.formData.lastName} onChange={(event) => this.setState({formData:{...this.state.formData, lastName: event.target.value}}) }></CInput>
                                    </CInputGroup>
                                    <CInputGroup className="mt-3">
                                        <CInputGroupPrepend className="col-md-4"> 
                                            <CLabel className="mfs-auto align-self-center h6">Email *</CLabel>
                                        </CInputGroupPrepend>
                                        <CInput style={Styles.inputBorderRadius} value={this.state.formData.emailAddress} onChange={(event) => this.setState({formData:{...this.state.formData, emailAddress: event.target.value}})}></CInput>
                                    </CInputGroup>
                                    <CInputGroup className="mt-3">
                                        <CInputGroupPrepend className="col-md-4"> 
                                            <CLabel className="mfs-auto align-self-center h6">Phone</CLabel>
                                        </CInputGroupPrepend>
                                        <CInput style={Styles.inputBorderRadius} value={this.state.formData.mobileNumber} onChange={(event) => this.setState({formData:{...this.state.formData, mobileNumber: event.target.value}})}></CInput>
                                    </CInputGroup>
                                    {/* <CInputGroup className="mt-3">  
                                        <CInputGroupPrepend className="col-md-4">
                                            <CLabel className="mfs-auto align-self-center h6">Contact</CLabel>
                                        </CInputGroupPrepend>
                                    <CInput style={Styles.inputBorderRadius} onChange={(event) => this.setState({formData:{...this.state.formData, emailAddress: event.target.value}})}></CInput>
                                            
                                    </CInputGroup> */}
                                </CForm>
                            </div>
                        </CCardBody>
                        <hr className="mt-0" />

                    {/* Billing */}

                        <CCardBody>
                            <h5>Billing</h5>
                            <div className="row d-flex justify-content-center">
                                <CForm className='col-md-7 justify-content-center'>
                                    <CInputGroup className="mt-3">
                                        <CInputGroupPrepend className="col-md-4">
                                            <CLabel className="mfs-auto align-self-center h6">Currency</CLabel>
                                            
                                        </CInputGroupPrepend>
                                        <CSelect style={Styles.inputBorderRadius} value={this.state.currency !== null ? this.state.currency.currencyId + '-' + this.state.currency.name: ''} onChange={(e) => this.onCurrencyChange(e)}>
                                        <option>Select Currency</option>
                                            {
                                            this.state.currecies.map(element => (
                                                <option value={element.currencyId + '-' + element.name} key={element.currencyId}>{element.name}({element.abbreviation})</option>
                                                ))
                                            }   
                                        </CSelect>
                                    </CInputGroup>
                                    <CInputGroup className="mt-3">
                                        <CInputGroupPrepend className="col-md-4 align-self-right"> 
                                            <CLabel className="mfs-auto align-self-center h6">Address Line 1</CLabel>
                                        </CInputGroupPrepend>
                                        <CTextarea style={Styles.inputBorderRadius} value={this.state.billingAddress.addressLine1} onChange={(event) => this.setState({ billingAddress:{...this.state.billingAddress, addressLine1: event.target.value}})}></CTextarea>
                                    </CInputGroup>
                                    <CInputGroup className="mt-3">
                                        <CInputGroupPrepend className="col-md-4"> 
                                            <CLabel className="mfs-auto align-self-center h6">Address Line 2</CLabel>
                                        </CInputGroupPrepend>
                                        <CTextarea style={Styles.inputBorderRadius} value={this.state.billingAddress.addressLine2} onChange={(event) => this.setState({billingAddress:{...this.state.billingAddress, addressLine2: event.target.value}})}></CTextarea>
                                    </CInputGroup>
                                    <CInputGroup className="mt-3">
                                        <CInputGroupPrepend className="col-md-4">
                                            <CLabel className="mfs-auto align-self-center h6">City</CLabel>
                                        </CInputGroupPrepend>
                                        <CInput style={Styles.inputBorderRadius} value={this.state.billingAddress.city} onChange={(event) => this.setState({billingAddress:{...this.state.billingAddress, city: event.target.value}})}></CInput>        
                                    </CInputGroup>
                                    <CInputGroup className="mt-3">
                                        <CInputGroupPrepend className="col-md-4">
                                            <CLabel className="mfs-auto align-self-center h6">Postal/Zip Code</CLabel>
                                        </CInputGroupPrepend>
                                        <CInput style={Styles.inputBorderRadius} value={this.state.billingAddress.zip_postal_code} onChange={(event) => this.setState({billingAddress:{...this.state.billingAddress, zip_postal_code: event.target.value}})}></CInput>        
                                    </CInputGroup>
                                    <CInputGroup className="mt-3">
                                        <CInputGroupPrepend className="col-md-4">
                                            <CLabel className="mfs-auto align-self-center h6">Country</CLabel>
                                        </CInputGroupPrepend>

                                        <CSelect style={Styles.inputBorderRadius} value={this.state.billingAddress.country !== null ? this.state.billingAddress.country.countryId + '-' + this.state.billingAddress.country.name:''}  onChange={(e) => this.onBillingCountryChange(e)}> 

                                        <option>Select Country</option>
                                            {
                                            this.state.countries.map(element => (
                                                <option value={element.countryId + '-' + element.name}>{element.name}</option>
                                            ))
                                            }
                                        </CSelect>        
                                    </CInputGroup>
                                    <CInputGroup className="mt-3">
                                        <CInputGroupPrepend className="col-md-4">
                                            <CLabel className="mfs-auto align-self-center h6">Province / State</CLabel>
                                        </CInputGroupPrepend>

                                        <CSelect style={Styles.inputBorderRadius} value={this.state.billingAddress.state !== null?this.state.billingAddress.state.stateId + '-' + this.state.billingAddress.state.name: ''} onChange={(e) => this.onBillingStateChange(e)}>
                                            <option value="">Please select</option>
                                            {
                                            this.state.billingStates.map(element => (
                                                <option value={element.stateId + '-' + element.name}>{element.name}</option>
                                            ))
                                            }
                                        </CSelect>        
                                    </CInputGroup>
                                </CForm>
                            </div>
                        </CCardBody>
                        <hr className="mt-0" />

                    {/* Shipping  */}
                        <CCardBody>
                            <h5>Shipping</h5>
                            <div className="row d-flex justify-content-center">
                                <CForm className='col-md-7 justify-content-center'>
                                    <CInputGroup className="mt-3">
                                        <CInputGroupPrepend className="col-md-4">
                                            <CLabel className="mfs-auto align-self-center h6">Ship to contact</CLabel>
                                            {/* <p>*</p> */}
                                        </CInputGroupPrepend>
                                        <CInput style={Styles.inputBorderRadius}></CInput>
                                    </CInputGroup>
                                    <CInputGroup className="mt-3">
                                        <CInputGroupPrepend className="col-md-4">
                                            <CLabel className="mfs-auto align-self-center h6">Country</CLabel>
                                        </CInputGroupPrepend>

                                        <CSelect style={Styles.inputBorderRadius} value={this.state.shippingAddress.country !== null ? this.state.shippingAddress.country.countryId + '-' + this.state.shippingAddress.country.name : '' } onChange={(e) => this.onShippingCountryChange(e)}>  
                                            <option>Select Country</option>
                                            {
                                            this.state.countries.map(element => (
                                                <option value={element.countryId + '-' + element.name}>{element.name}</option>
                                            ))
                                            }

                                        </CSelect>        
                                    </CInputGroup>
                                    <CInputGroup className="mt-3">
                                        <CInputGroupPrepend className="col-md-4">
                                            <CLabel className="mfs-auto align-self-center h6">Province / State</CLabel>
                                        </CInputGroupPrepend>

                                        <CSelect style={Styles.inputBorderRadius} value={this.state.shippingAddress.country !== null?this.state.shippingAddress.state.stateId + '-' + this.state.shippingAddress.state.name : ''} onChange={(e) => this.onShippingStateChange(e)}>

                                            <option value="0">Please select</option>
                                            {
                                            this.state.shippingStates.map(element => (
                                                <option value={element.stateId + '-' + element.name}>{element.name}</option>
                                            ))
                                            }
                                        </CSelect>        
                                    </CInputGroup>
                                    <CInputGroup className="mt-3">
                                        <CInputGroupPrepend className="col-md-4 align-self-right"> 
                                            <CLabel className="mfs-auto align-self-center h6">Address Line 1</CLabel>
                                        </CInputGroupPrepend>
                                        <CTextarea style={Styles.inputBorderRadius} value={this.state.shippingAddress.addressLine1} onChange={(event) => this.setState({ shippingAddress:{...this.state.shippingAddress, addressLine1: event.target.value}})}></CTextarea>
                                    </CInputGroup>
                                    <CInputGroup className="mt-3">
                                        <CInputGroupPrepend className="col-md-4"> 
                                            <CLabel className="mfs-auto align-self-center h6">Address Line 2</CLabel>
                                        </CInputGroupPrepend>
                                        <CTextarea style={Styles.inputBorderRadius} value={this.state.shippingAddress.addressLine2} onChange={(event) => this.setState({ shippingAddress:{...this.state.shippingAddress, addressLine2: event.target.value}})}></CTextarea>
                                    </CInputGroup>
                                    <CInputGroup className="mt-3">
                                        <CInputGroupPrepend className="col-md-4">
                                            <CLabel className="mfs-auto align-self-center h6">City</CLabel>
                                        </CInputGroupPrepend>
                                        <CInput style={Styles.inputBorderRadius} value={this.state.shippingAddress.city} onChange={(event) => this.setState({ shippingAddress:{...this.state.shippingAddress, city: event.target.value}})}></CInput>        
                                    </CInputGroup>
                                    <CInputGroup className="mt-3">
                                        <CInputGroupPrepend className="col-md-4">
                                            <CLabel className="mfs-auto align-self-center h6">Postal/Zip Code</CLabel>
                                        </CInputGroupPrepend>
                                        <CInput style={Styles.inputBorderRadius} value={this.state.shippingAddress.zip_postal_code} onChange={(event) => this.setState({ shippingAddress:{...this.state.shippingAddress, zip_postal_code: event.target.value}})}></CInput>        
                                    </CInputGroup>
                                    {/* <CInputGroup className="mt-3">
                                        <CInputGroupPrepend className="col-md-4">
                                            <CLabel className="mfs-auto align-self-center h6">Phone</CLabel>
                                        </CInputGroupPrepend>
                                        <CInput style={Styles.inputBorderRadius}></CInput>        
                                    </CInputGroup> */}
                                    <CInputGroup className="mt-3">
                                        <CInputGroupPrepend className="col-md-4">
                                            <CLabel className="mfs-auto align-self-center h6">Delivery Instructions</CLabel>
                                        </CInputGroupPrepend>
                                        <CTextarea style={Styles.inputBorderRadius} value={this.state.shippingAddress.deliveryInstructions} onChange={(event) => this.setState({ shippingAddress:{...this.state.shippingAddress, deliveryInstructions: event.target.value}})}></CTextarea>
                                    </CInputGroup>
                                </CForm>
                            </div>
                        </CCardBody>
                        <hr className="mt-0" />

                    {/* Shipping 2 */}

                    <CCardBody>
                            <h5>More</h5>
                            <div className="row d-flex justify-content-center">
                                <CForm className='col-md-7 justify-content-center'>
                                    {/* <CInputGroup className="mt-3">
                                        <CInputGroupPrepend className="col-md-4">
                                            <CLabel className="mfs-auto align-self-center h6">Account Number</CLabel>
                                        </CInputGroupPrepend>
                                        <CInput style={Styles.inputBorderRadius}></CInput>
                                    </CInputGroup> */}
                                    <CInputGroup className="mt-3">
                                        <CInputGroupPrepend className="col-md-4">
                                            <CLabel className="mfs-auto align-self-center h6">Fax</CLabel>
                                        </CInputGroupPrepend>
                                        <CInput style={Styles.inputBorderRadius} value={this.state.formData.fax} onChange={(event) => this.setState({formData:{...this.state.formData, fax: event.target.value}})}></CInput>
                                        {/* <CSelect style={Styles.inputBorderRadius}>
                                            <option value="0">Please select</option>
                                            <option value="1">First</option>
                                        </CSelect>         */}
                                    </CInputGroup>
                                    {/* <CInputGroup className="mt-3">
                                        <CInputGroupPrepend className="col-md-4">
                                            <CLabel className="mfs-auto align-self-center h6">Mobile</CLabel>
                                        </CInputGroupPrepend>
                                        <CSelect style={Styles.inputBorderRadius}>
                                            <option value="0">Please select</option>
                                            <option value="1">First</option>
                                        </CSelect>        
                                    </CInputGroup> */}
                                    {/* <CInputGroup className="mt-3">
                                        <CInputGroupPrepend className="col-md-4 align-self-right"> 
                                            <CLabel className="mfs-auto align-self-center h6">Toll-Free</CLabel>
                                        </CInputGroupPrepend>
                                        <CInput style={Styles.inputBorderRadius}></CInput>
                                    </CInputGroup>
                                    <CInputGroup className="mt-3">
                                        <CInputGroupPrepend className="col-md-4"> 
                                            <CLabel className="mfs-auto align-self-center h6">Website</CLabel>
                                        </CInputGroupPrepend>
                                        <CInput style={Styles.inputBorderRadius}></CInput>
                                    </CInputGroup>
                                    <CInputGroup className="mt-3">
                                        <CInputGroupPrepend className="col-md-4">
                                            <CLabel className="mfs-auto align-self-center h6">Internal Notes</CLabel>
                                        </CInputGroupPrepend>
                                        <CTextarea style={Styles.inputBorderRadius}></CTextarea>        
                                    </CInputGroup> */}
                                    <div className="row d-flex justify-content-center mt-4">      
                                        <CButton onClick={this.onFormSubmit} value="Save" disabled={this.state.loader} className="col-md-3 h5" style={{backgroundColor: Colors.themeDark, color: Colors.lightText}}>
                                            {this.state.loader? <CSpinner size="sm"></CSpinner>: ''} Save</CButton>
                                    </div>
                                </CForm>
                            </div>
                        </CCardBody>

                    </CCard>
                </CCol>
            </CRow>
        )
    }
}

export default AddCustomer;