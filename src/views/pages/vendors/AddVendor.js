import React from 'react'
import {CRow, CCol, CCard, CCardBody, CCardHeader, CInputGroup, CInputGroupPrepend, CLabel, CInput, CForm, CSelect, CTextarea, CButton, CSpinner} from '@coreui/react'
import Styles from '../styles'
import Colors from '../../../config/Colors'
import countriesApi from '../../../api/countries'
import currencyApi from '../../../api/currency'
import stateApi from '../../../api/states'
import vendorApi from '../../../api/vendor'

class AddVendor extends React.Component{
  constructor(props){
    super(props)
    this.state = {
        vendorType: '',
        userInfo:null,
        selectedVendorId: '',
        countries: [],
        states: [],
        currecies: [],
        formData: {},
        loader: false,
        currency: {
            "currencyId":"",
            "name": ""
        },
        addressObj: {
            "addressLine1": "",
            "addressLine2": "",
            "country": {
                "countryId": "",
                "name": ""
            },
            "state": {
                "stateId": "",
                "name": ""
            },
            "city": "",
            "zip_postal_code": "",
            "active":"",
            "deleted":"",
            "billing":true
          }
    }
    this.onCountryChange = this.onCountryChange.bind(this)
    this.onFormSubmit = this.onFormSubmit.bind(this)
  }

  componentDidMount(){
    let user = JSON.parse(localStorage.getItem('userInfo'))
    if(JSON.parse(localStorage.getItem('selectedVendor')) !== null){
        let vendor = JSON.parse(localStorage.getItem('selectedVendor'))
        console.log(">?>?>?>?>?>?>?", vendor)
        this.setState({formData: vendor, addressObj: vendor.address[0], currency: vendor.currency  ,selectedVendorId: vendor.userId})
    }
    this.setState({userInfo: user})
    countriesApi.get().then((res) => {
        console.log(res)
        this.setState({countries: res.data})
    }).catch((err) => {
        alert("Error:"+ err)
    }) 
    currencyApi.get().then((res) => {
        this.setState({currecies: res.data})
    }).catch((error) => {
        alert('Error:' + error)
    })
  }

  componentWillUnmount() {
      localStorage.removeItem('vendorSelected')
  }

  onFormSubmit(){
    this.setState({loader:true})
    this.setState({formData: {...this.state.formData, address: [this.state.addressObj], currency: this.state.currency, organization: {"organizationId": this.state.userInfo.organizationId },"active": true}}, () => {
        console.log('Form Data:', this.state.formData)
        let formData = JSON.stringify(this.state.formData)
        let headers = {
            'Content-Type': 'application/json'
        }
        vendorApi.post(formData,headers).then((response) => {
            console.log("Response:", response)
            this.setState({
                loader:false, 
            })
            this.props.history.push('/vendors')
        }).catch((error) => {
            console.log("Error:", error.response.data[0])
            alert("Failed: "+ error.response.data[0])
            this.setState({loader:false})
        })
    })

}

onCountryChange = (e) => {
    let val = e.target.value
    let countryArr = val.split('-')
    this.setState({addressObj: {...this.state.addressObj, country: { countryId: countryArr[0], name: countryArr[1]}}})
    stateApi.get(countryArr[0]).then((res) => {
        console.log("Response", res)
        this.setState({states: res.data})
    }).catch((err) => {

        console.log("Error", err)
    })

}
onStateChange = (e) => {
    let val = e.target.value
    let stateArr = val.split('-')
    console.log(stateArr)
    this.setState({addressObj: {...this.state.addressObj, state: { stateId: stateArr[0], name: stateArr[1]}}})
}
onCurrencyChange = (e) => {
    let val = e.target.value
    let currencyArr = val.split('-')
    console.log(currencyArr)
    this.setState({currency: {...this.state.currency, currencyId: currencyArr[0], name: currencyArr[1]}})
}

  render(){
    return(
      <CRow>
        <CCol sm="6" lg="12"> 
          <CCard>
              <CCardHeader>
                  <h4>Add Vendor</h4> 
              </CCardHeader>
              <CCardBody>
                  <div className="row d-flex justify-content-center">
                      <CForm className='col-md-7 justify-content-center'>
                          <CInputGroup className="mt-3">
                              <CInputGroupPrepend className="col-md-4">
                                  <CLabel className="mfs-auto align-self-center h6">Vendor Name *</CLabel>
                                  {/* <p>*</p> */}
                              </CInputGroupPrepend>
                              <CInput style={Styles.inputBorderRadius} value={this.state.formData.vendorName}  onChange={(event) => this.setState({formData:{...this.state.formData, vendorName: event.target.value}}) }></CInput>
                            {/* <CFormText className="help-block mb-3" color="danger" >Hello</CFormText> */}
                          </CInputGroup>
                          <CInputGroup className="mt-4">
                            <CInputGroupPrepend className="col-md-4">
                                <CLabel className="mfs-auto align-self-center h6">Type</CLabel>
                            </CInputGroupPrepend>
                                {/* <div style={{marginTop:15}}> */}
                                    <input type="radio" name="vendor_type" value="regular" onChange={(e) => this.setState({vendorType : e.target.value})} style={{margin:5, marginTop:25}}></input>
                                    <CLabel style={{marginTop:20}}>Regular<br/> <p style={{fontSize:12}}>Companion that provide goods and services to your business (e.g. internet utility provider)</p></CLabel>
                                {/* </div> */}
                          </CInputGroup>
                          {/* <CInputGroup className="">
                            <CInputGroupPrepend className="col-md-4">
                            </CInputGroupPrepend>
                                <input type="radio" value="contractor" name="vendor_type" onChange={(e) => this.setState({vendorType : e.target.value})} style={{margin:5}}></input>
                                <CLabel>NEC contractor <br/> <p style={{fontSize:12}}>Companion that perform services for which you pay them and provide a NEC form</p></CLabel>
                          </CInputGroup> */}
                      </CForm>
                  </div>
              </CCardBody>
              
              {
                  this.state.vendorType !== ''?
                    <div>

                        <hr className="mt-0" />
                        <CCardBody>
                            <div className="row d-flex justify-content-center">
                                <CForm className='col-md-7 justify-content-center'>
                                    {
                                        this.state.vendorType === 'contractor'?
                                        <CInputGroup className="mt-3">
                                            <CInputGroupPrepend className="col-md-4">
                                                <CLabel className="mfs-auto align-self-center h6">Contractor type</CLabel>
                                            </CInputGroupPrepend>
                                            <CSelect style={Styles.inputBorderRadius}>
                                                <option value="0">Please select</option>
                                                <option value="1">Contract</option>
                                            </CSelect>
                                        </CInputGroup>
                                        :
                                        <div></div>
                                    }
                                    <CInputGroup className="mt-3">
                                        <CInputGroupPrepend className="col-md-4">
                                            <CLabel className="mfs-auto align-self-center h6" >First Name</CLabel>
                                        </CInputGroupPrepend>
                                        <CInput style={Styles.inputBorderRadius} value={this.state.formData.firstName} onChange={(event) => this.setState({formData:{...this.state.formData, firstName: event.target.value}})}></CInput>        
                                    </CInputGroup>
                                    <CInputGroup className="mt-3">
                                        <CInputGroupPrepend className="col-md-4">
                                            <CLabel className="mfs-auto align-self-center h6">Last Name</CLabel>
                                        </CInputGroupPrepend>
                                        <CInput style={Styles.inputBorderRadius} value={this.state.formData.lastName} onChange={(event) => this.setState({formData:{...this.state.formData, lastName: event.target.value}})}></CInput>        
                                    </CInputGroup>
                                    <CInputGroup className="mt-3">
                                        <CInputGroupPrepend className="col-md-4">
                                            <CLabel className="mfs-auto align-self-center h6">Currency</CLabel>
                                        </CInputGroupPrepend>
                                        <CSelect style={Styles.inputBorderRadius}  value={this.state.currency.currencyId + '-' + this.state.currency.name} onChange={(e) => this.onCurrencyChange(e)}>
                                        <option>Select Currency</option>
                                            {
                                            this.state.currecies.map(element => (
                                                <option value={element.currencyId + '-' + element.name} key={element.currencyId}>{element.name}({element.abbreviation})</option>
                                            ))
                                            }
                                        </CSelect>
                                    </CInputGroup>
                                    <CInputGroup className="mt-3">
                                        <CInputGroupPrepend className="col-md-4">
                                            <CLabel className="mfs-auto align-self-center h6">Email</CLabel>
                                        </CInputGroupPrepend>
                                        <CInput style={Styles.inputBorderRadius} value={this.state.formData.emailAddress} onChange={(event) => this.setState({formData:{...this.state.formData, emailAddress: event.target.value}})}></CInput>        
                                    </CInputGroup>
                                    <CInputGroup className="mt-3">
                                        <CInputGroupPrepend className="col-md-4">
                                            <CLabel className="mfs-auto align-self-center h6">Country</CLabel>
                                        </CInputGroupPrepend>
                                        <CSelect style={Styles.inputBorderRadius} value={this.state.addressObj.country.countryId + '-' + this.state.addressObj.country.name}  onChange={(e) => this.onCountryChange(e)}> 
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
                                        <CSelect style={Styles.inputBorderRadius} value={this.state.addressObj.state.stateId + '-' + this.state.addressObj.state.name} onChange={(e) => this.onStateChange(e)}>
                                        <option value="0">Please select</option>
                                            {
                                            this.state.states.map(element => (
                                                <option value={element.stateId + '-' + element.name} key={element.stateId}>{element.name}</option>
                                            ))
                                            }
                                        </CSelect>        
                                    </CInputGroup>
                                    <CInputGroup className="mt-3">
                                        <CInputGroupPrepend className="col-md-4 align-self-right"> 
                                            <CLabel className="mfs-auto align-self-center h6">Address Line 1</CLabel>
                                        </CInputGroupPrepend>
                                        <CTextarea style={Styles.inputBorderRadius}  value={this.state.addressObj.addressLine1} onChange={(event) => this.setState({addressObj:{...this.state.addressObj, addressLine1: event.target.value}})}></CTextarea>
                                    </CInputGroup>
                                    <CInputGroup className="mt-3">
                                        <CInputGroupPrepend className="col-md-4"> 
                                            <CLabel className="mfs-auto align-self-center h6">Address Line 2</CLabel>
                                        </CInputGroupPrepend>
                                        <CTextarea style={Styles.inputBorderRadius} value={this.state.addressObj.addressLine2} onChange={(event) => this.setState({addressObj:{...this.state.addressObj, addressLine2: event.target.value}})}></CTextarea>
                                    </CInputGroup>
                                    <CInputGroup className="mt-3">
                                        <CInputGroupPrepend className="col-md-4">
                                            <CLabel className="mfs-auto align-self-center h6">City</CLabel>
                                        </CInputGroupPrepend>
                                        <CInput style={Styles.inputBorderRadius} value={this.state.addressObj.city} onChange={(event) => this.setState({addressObj:{...this.state.addressObj, city: event.target.value}})}></CInput>        
                                    </CInputGroup>
                                    <CInputGroup className="mt-3">
                                        <CInputGroupPrepend className="col-md-4">
                                            <CLabel className="mfs-auto align-self-center h6">Postal/Zip Code</CLabel>
                                        </CInputGroupPrepend>
                                        <CInput style={Styles.inputBorderRadius} value={this.state.addressObj.zip_postal_code} onChange={(event) => this.setState({addressObj:{...this.state.addressObj, zip_postal_code: event.target.value}})}></CInput>        
                                    </CInputGroup>
                                    <div className="row d-flex justify-content-center mt-4">      
                                        <CButton onClick={this.onFormSubmit} value="Save" disabled={this.state.loader} className="col-md-3 h5" style={{backgroundColor: Colors.themeDark, color: Colors.lightText}}>
                                            {this.state.loader? <CSpinner size="sm"></CSpinner>: ''} Save</CButton>
                                    </div>
                                </CForm>
                            </div>
                        </CCardBody>
                    </div>
                    :
                    <div></div>

              }

          </CCard>                       
        </CCol>
      </CRow>
    )
  }
}

export default AddVendor;