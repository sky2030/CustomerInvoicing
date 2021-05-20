import React from 'react'
import {CRow, CCol, CCard, CCardBody, CCardHeader, CInputGroup, CInputGroupPrepend, CLabel, CInput, CForm, CSelect, CTextarea, CSpinner, CFormText,CMultiSelect, CCardText, CModal, CModalHeader, CModalBody, CModalFooter, CButton} from '@coreui/react'
import styles from '../../styles';
import Colors from '../../../../config/Colors';
import DarkThemeButton from '../../../../components/Buttons';
import taxApi from '../../../../api/tax'
import {  Trash2 } from 'react-feather';
import productApi from '../../../../api/product'
import { Input, Label } from 'reactstrap';


class AddProduct extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      productName:'',
      productNameError: '', 
      productDescription: '',
      productPrice: '',
      taxes: [],
      selectedTaxes: [],
      buyChecked: false,
      sellChecked: false,
      userInfo:null,
      spinner: false,
      showmodal: false,
      taxName: '',
      taxNameError: '',
      taxRate: '',
      taxRateError: '',
      taxNo: '',
      taxAbb: '',
      taxAbbError: '',
      taxDesc: '',
      taxRecoverable: true,
      compoundTax: false,
      showtaxNumberOnInvoice: true
    }
    this.wrapperRef = React.createRef();
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }
  validate = () => {
    let productNameError = "";

    const{productName}=this.state;
    
    if (!productName) {
      productNameError = "*Name is required";
    }
    
    if ( productNameError) {

      this.setState({productNameError:productNameError })  
      return false

    }
    return true;
  };

  componentDidMount(){
    document.addEventListener('mousedown', this.handleClickOutside);
    let userInfo = JSON.parse(localStorage.getItem('userInfo'))
    this.setState({userInfo: userInfo})

    if(localStorage.getItem('selectedProduct') !== null){
      let product = JSON.parse(localStorage.getItem('selectedProduct'))
      console.log(">>>>>?", product)
      this.setState({
        productName: product.productName,
        productPrice: product.productPrice,
        productDescription: product.productDescription,
        sellChecked: product.productSellThis,
        buyChecked: product.productBuyThis,
        selectedTaxes: product.salesTax
      })
    }

    taxApi.get(userInfo.organizationId).then((response) => {
      console.log("Taxes...", response.data)
      this.setState({taxes: response.data})
    }).catch((error) => {
      console.log("Error:", error)
    })
  }

  componentWillUnmount(){
    document.removeEventListener('mousedown', this.handleClickOutside);
    localStorage.removeItem('selectedProduct')
  }

  handleClickOutside(event) {
    if (this.wrapperRef && !this.wrapperRef.current.contains(event.target)) {
        this.setState({showTaxesDropdown: false})
    }
  }

  handleProductSubmit = () => {
    this.setState({spinner:true})
    const isValid = this.validate()
    if(isValid){

      if(localStorage.getItem('selectedProduct') !== null){
        this.handleEditProduct()
      } else {
        let headers ={
          'Content-Type': 'application/json'
        }
        let data = {
          productName: this.state.productName,
          productDescription: this.state.productDescription,
          productPrice: this.state.productPrice,
          productSellThis: this.state.sellChecked,
          productBuyThis: this.state.buyChecked,
          organization: {
            organizationId: this.state.userInfo.organizationId,
            name: this.state.userInfo.organizationName,
            active: true
          },
          salesTax: this.state.selectedTaxes,
          active: true,
          deleted: false
        }
        console.log("Data......", JSON.stringify(data))
        productApi.post(JSON.stringify(data), headers).then((res) => {
          console.log("Response", res)
          this.setState({spinner:false})
          this.props.history.push('/sales/products')
        }).catch((err) => {
          this.setState({spinner:false})
          console.log("Error", err)
        })
      }
    }else{
      this.setState({spinner:false})
    }
  } 

  handleEditProduct(){
    let selectedItem = JSON.parse(localStorage.getItem('selectedProduct'))
    selectedItem.productName = this.state.productName
    selectedItem.productDescription = this.state.productDescription
    selectedItem.productPrice = this.state.productPrice
    selectedItem.productSellThis =  this.state.sellChecked
    selectedItem.productBuyThis = this.state.buyChecked
    selectedItem.salesTax = this.state.selectedTaxes

    let headers ={
      'Content-Type': 'application/json'
    }

    productApi.put(JSON.stringify(selectedItem), headers).then((res) => {
      console.log("Edited Successfully")
      this.setState({spinner:false})
      this.props.history.push('/sales/products')
    }).catch((err) => {
      this.setState({spinner:false})
      console.log("Error", err)
    })
  
  }
  handleSelectedTax = (tax) => {
    console.log("Tax", tax)
    let selectedTaxes = this.state.selectedTaxes
    selectedTaxes.push(tax)
    this.setState({selectedTaxes:selectedTaxes})
  }
  showTaxesDropdown = () => {
    this.setState({showDropdown: true})
  }

  deleteTax = (index) => {
    let selectedTaxes = this.state.selectedTaxes
    selectedTaxes.splice(index)
    this.setState({selectedTaxes:selectedTaxes})
  }

  toggle = () => {
    const{showmodal}=this.state
      this.setState({showmodal:!showmodal})
      this.setState({
        taxNameError:'',
        taxRateError:'',
        taxAbbError:''
      })
    }
    AddTax = () => {
      const {taxName,taxRate,taxAbb,taxActive,taxDesc,taxNo,taxRecoverable,compoundTax,showtaxNumberOnInvoice }= this.state
      let userInfo = JSON.parse(localStorage.getItem('userInfo'))
      
      let payload = {
        name:taxName,
        abbreviation:taxAbb,
        rate:taxRate,
        description:taxDesc,
        taxNumber:taxNo,
        showtaxNumberOnInvoice:showtaxNumberOnInvoice,
        taxRecoverable:taxRecoverable,
        compoundTax:compoundTax,
        active:taxActive,
        deleted:false,
        organization:{
          organizationId:userInfo.organizationId,
          name:userInfo.organizationName
        }      
      }

      let headers = {
        'Content-Type': 'application/json'
      }
      const isValid = this.validate();
      if(isValid){
        taxApi.post(payload,headers).then((response) => {
          console.log(JSON.stringify(response))
          this.setState({showmodal:false})
      }).catch((error) => {
        // console(JSON.stringify(error))
          console.log("Error:", error.response.data[0])
          alert("Failed: "+ JSON.stringify(error.response.data[0]))
          this.setState({showmodal:false})
      })
    } 
                 

  }

  render(){
    return(
      <CRow>
        <CCol sm="6" lg="12"> 
          <CCard>
              <CCardHeader>
                  <h2 className="text-center m-3">Add a product or Service</h2> 
                  <div style={{width:'50%', margin:'auto'}}>
                    <p className="text-center">Products and services that you buy from vendors are used as items on Bills to record those purchases, and the ones that you sell to customers are used as items on Invoices to record those sales.</p>
                  </div>
              </CCardHeader>
            <CCardBody>
                {/* <div className="row d-flex justify-content-center">
                    <CForm className='col-md-7 justify-content-center'>
                        <CInputGroup className="mt-3">
                            <CInputGroupPrepend className="col-md-4">
                                <CLabel className="mfs-auto align-self-center">Name</CLabel>
                                <p className="align-self-center">*</p>
                            </CInputGroupPrepend>
                            <CInput style={styles.inputBorderRadius}></CInput>
                          <CFormText className="help-block mb-3" color="danger" >Hello</CFormText>
                        </CInputGroup>
                    </CForm>
                </div> */}

                <div style={{display:'flex', flexDirection:'column', margin:'auto', width:'50%'}}>
                  <div >
                    <CInputGroup className="mt-3">
                        <CInputGroupPrepend className="col-md-4">
                            <CLabel className="mfs-auto align-self-center">Name</CLabel>
                            <CLabel className="ml-1 align-self-center" style={{color: Colors.red}}>*</CLabel>
                        </CInputGroupPrepend>
                        <CInput style={styles.inputBorderRadius} value={this.state.productName} onChange={(e) => this.setState({productName: e.target.value})}></CInput>
                    </CInputGroup>
                    <CFormText className="help-block col-4" style={{margin:'auto'}} color="danger">{this.state.productNameError}</CFormText>
                  </div>
                  <div >
                    <CInputGroup className="mt-3">
                        <CInputGroupPrepend className="col-md-4">
                            <CLabel className="mfs-auto align-self-center">Description</CLabel>
                        </CInputGroupPrepend>
                        <CTextarea style={styles.inputBorderRadius} value={this.state.productDescription} onChange={(e) => this.setState({productDescription: e.target.value})}></CTextarea>
                    </CInputGroup>
                  </div>
                  <div >
                    <CInputGroup className="mt-3">
                        <CInputGroupPrepend className="col-md-4">
                            <CLabel className="mfs-auto align-self-center">Price</CLabel>
                        </CInputGroupPrepend>
                        <CInput style={styles.inputBorderRadius} value={this.state.productPrice} onChange={(e) => this.setState({productPrice: e.target.value})}></CInput>
                    </CInputGroup>
                  </div>
                  <div >
                    <CInputGroup className="mt-3">
                        <CInputGroupPrepend className="col-md-4">
                            <CLabel className="mfs-auto align-self-center">Sell this</CLabel>
                        </CInputGroupPrepend>
                        <input type="checkbox" className='m-1' checked={this.state.sellChecked} onClick={(e) => this.setState({sellChecked: e.target.checked})}></input>
                    </CInputGroup>
                  </div>
                  {
                    this.state.sellChecked ? 
                    <div >
                      <CInputGroup className="mt-3">
                          <CInputGroupPrepend className="col-md-4">
                              <CLabel className="mfs-auto align-self-center">Income account</CLabel>
                              <CLabel className="ml-1 align-self-center" style={{color: Colors.red}}>*</CLabel>
                          </CInputGroupPrepend>
                          <CSelect style={styles.inputBorderRadius}>
                            <option>-------------</option>
                            <option>Sales</option>
                            <option>Shipping & Delivery</option>
                          </CSelect>
                      </CInputGroup>
                    </div>
                    :
                    <div></div>
                  }
                  <div >
                    <CInputGroup className="mt-3">
                        <CInputGroupPrepend className="col-md-4">
                            <CLabel className="mfs-auto align-self-center">Buy this</CLabel>
                        </CInputGroupPrepend>
                        <input type="checkbox" className='m-1' checked={this.state.buyChecked} onClick={(e) => this.setState({buyChecked: e.target.checked})}></input>
                    </CInputGroup>
                  </div>
                  {
                    this.state.buyChecked ? 
                    <div >
                      <CInputGroup className="mt-3">
                          <CInputGroupPrepend className="col-md-4">
                              <CLabel className="mfs-auto align-self-center">Expense account</CLabel>
                              <CLabel className="ml-1 align-self-center" style={{color: Colors.red}}>*</CLabel>
                          </CInputGroupPrepend>
                          <CSelect style={styles.inputBorderRadius}>
                            <option>-------------</option>
                            <option>Accounting Fees</option>
                            <option>Advertising & Promotion</option>
                          </CSelect>
                      </CInputGroup>
                    </div>
                    :
                    <div></div>
                  }
                  <div >
                    <CInputGroup className="mt-3">
                        <CInputGroupPrepend className="col-md-4">
                            <CLabel className="mfs-auto align-self-center">Sales Tax</CLabel>
                        </CInputGroupPrepend>
                          <div>
                            {
                              this.state.selectedTaxes.length !== 0 ?
                              this.state.selectedTaxes.map((item, index) => (
                                <div style={{display: 'flex', flexDirection:'column',justifyContent: 'center'}} key={item.taxId}>
                                  <div className='ml-2' style={{display: 'flex', flexDirection:'row'}}>
                                    <CCardText style={{fontSize: 16}}>{item.abbreviation}</CCardText>
                                    <Trash2 size={18} className="ml-2" onClick={() => this.deleteTax(index)}></Trash2>
                                  </div>
                                </div>
                              ))
                              :
                              <div></div>
                            }
                            <div ref={this.wrapperRef}  className="vertical-center">
                              <div style={{display: 'flex', flexDirection:'column',justifyContent: 'center'}}>
                              <CInput onFocus={() => this.setState({showTaxesDropdown: true}) } style={styles.inputBorderRadius}></CInput>
                            {
                            this.state.showTaxesDropdown ? 
                              <div style={{border: `1px solid ${Colors.inputBorder}`}}>
                                {
                                    this.state.taxes.map((tax) => (
                                      <div onClick={() => this.handleSelectedTax(tax)} style={{padding:5, cursor: 'pointer'}} key={tax.taxId}>{tax.abbreviation}</div>
                                    ))
                                }
                                <div onClick={this.toggle} style={{padding:5, borderTop:`1px solid ${Colors.themeDark}`, color: Colors.themeGreen, cursor:'pointer' }}>Create a new Tax</div>
                              </div>
                            :
                            <div></div>
                              }
                            </div>
                            </div>
                          </div>
                        
                    </CInputGroup>
                  </div>
                  <div className="mt-3" style={{margin:'auto'}}>
                    <DarkThemeButton disabled={this.state.spinner} shape='pill' label="Save" style={{width: 100}} click={() => this.handleProductSubmit()}>
                      
                    </DarkThemeButton>
                  </div>
                </div>
                  <CModal show={this.state.showmodal} onClose={this.toggle} size='lg'>
                      <CModalHeader closeButton style={{backgroundColor:"lightgrey"}}> <h2>Create a new Tax</h2></CModalHeader>

                      <CModalBody>

                        <CLabel>Tax Name</CLabel>
                        <CInput  placeholder="for example GST..." onChange={(e) => this.setState({taxName:e.target.value})} value={this.state.taxName}/>                                              
                        <div style={{ fontSize: 10, color: "red" }}>
                            {this.state.taxNameError}
                        </div>
                        <CLabel>Rate</CLabel>
                        <CInput onChange={(e) => this.setState({taxRate:e.target.value})} value={this.state.taxRate}/>
                        <div style={{ fontSize: 10, color: "red" }}>
                                  {this.state.taxRateError}
                              </div>
                        <CLabel>Tax Number </CLabel>
                        <CInput  onChange={(e) => this.setState({taxNo:e.target.value})}  value={this.state.taxNo}/>                                              
                        <CLabel>Abbreviation</CLabel>
                        <CInput  onChange={(e) => this.setState({taxAbb:e.target.value})} value={this.state.taxAbb}/>
                        <div style={{ fontSize: 10, color: "red" }}>
                                  {this.state.taxAbbError}
                              </div>
                        <CLabel>Description</CLabel>
                        <CInput  onChange={(e) => this.setState({taxDesc:e.target.value})} value={this.state.taxDesc}/>
                      
                      <div style={{marginTop:'20px'}}>

                      
                        <Label style={{marginLeft:"1rem",fontSize:'14px'}}> <Input type="checkbox"checked={this.state.taxRecoverable} 
                        onChange={(target) => this.setState({taxRecoverable:target.checked})} 
                        /> Tax Recoverable  </Label>
                        <Label style={{marginLeft:"2rem",fontSize:'14px'}}> <Input type="checkbox" checked={this.state.compoundTax}
                        onChange={(target) => this.setState({compoundTax:target.checked})} 
                        /> compound Tax  </Label>
                        <Label style={{marginLeft:"2rem",fontSize:'14px'}}> <Input type="checkbox" checked={this.state.showtaxNumberOnInvoice}
                        onChange={(target) => this.setState({showtaxNumberOnInvoice:target.checked})}  
                        /> Show tax Number on Invoice  </Label>
                        
                        </div>
                
                        
                      </CModalBody>
                      <CModalFooter>
                        <CButton color="primary" onClick={this.AddTax}>Save</CButton>{' '}
                        <CButton
                          color="secondary"
                          onClick={this.toggle}
                        >Cancel</CButton>
                      </CModalFooter>
              </CModal>
            </CCardBody>
          </CCard>                       
        </CCol>
      </CRow>
    )
  }
}

export default AddProduct