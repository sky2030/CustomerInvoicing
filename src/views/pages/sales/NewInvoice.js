import { CModal, CModalHeader, CModalBody,CModalFooter, CCard, CCardBody, CCardHeader, CCardText, CFormText, CCol, CContainer, CInput, CInputGroup,CTextarea, CInputGroupPrepend, CLabel, CRow, CSelect,CButton } from '@coreui/react';
import React from 'react'
import InvoiceLogoSelector from '../../../components/InvoiceLogoSelector';
import Colors from '../../../config/Colors';
import styles from '../styles';
import addCustomer from '../../../assets/NewInvoice/addCustomer.png'
import customersApi from '../../../api/customer';
import taxApi from '../../../api/tax';
import DarkThemeButton from '../../../components/Buttons';

//Product API
import productApi from '../../../api/product'

import { ChevronsDown,Trash2,PlusSquare} from 'react-feather';

import {Input, Label} from 'reactstrap';
// import { theme } from 'highcharts';

//Style CSS
import '../../../App.css'

let Itemdetail = { 
                  name:'', 
                  description:'',
                  quantity:1, 
                  price:0,  
                  taxrate:[],
                  showdrop:false,
                  productdrop:false,
                  
};
class NewInvoice extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      addItemBgColor: Colors.white,
      invoiceItem: [],
      ItemVisible:false,
      invoiceHeader: "Invoice",
      invoiceSummary: '',
      userInfo: null,
      customers: [],
      showCustomerList: false,
      selectedCustomer: null,
      taxes:[],
      productsTableData: [],
      showselectedTax:false,
      selectedTaxRate:[],
      subTotal:[],
      showProducts:false,
      ShowTaxdrop:false,
      showmodal:false,
      productmodal:false,
      showInsidemodal:false,
      taxName:'',
      taxAbb:'',
      taxRate:undefined,
      taxDesc:'',
      taxNo:'',
      taxActive:true,
      taxRecoverable:true,
      compoundTax:false,
      showtaxNumberOnInvoice:true,
      taxNameError:'',
      taxAbbError:'',
      taxRateError:'',
      productName:'',
      productPrice:'',
      productDescription:'',
      sellChecked:false,
      buyChecked:false,
      productSelectedTaxes:[],
      productNameError:''

    }
   // this.addItem = this.addItem.bind(this)
    this.wrapperRef = React.createRef();
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.handleSelectedCustomer = this.handleSelectedCustomer.bind(this)
  }

  componentDidMount(){
    document.addEventListener('mousedown', this.handleClickOutside);
    let userInfo = JSON.parse(localStorage.getItem('userInfo'))
    this.setState({userInfo: userInfo})
    this.setState({selectedTaxRate:[]})
    customersApi.get(userInfo.organizationId).then((res) => {
      console.log("Customers::", res) 
      this.setState({customers: res.data})
    }).catch((err) => {
      console.log("Error:", err)
    })
    this.getTaxes();
    this.getProduct();
  }

  getProduct = () =>{
    let userInfo = JSON.parse(localStorage.getItem('userInfo'))
        productApi.get(userInfo.organizationId).then((res) => {
           // console.log("Products...", res.data)
            this.setState({productsTableData: res.data})
        }).catch((error) => {
            console.log("Error", error)
        })
  }

  getTaxes = () => {
    
    let userInfo = JSON.parse(localStorage.getItem('userInfo'))
    taxApi.get(userInfo.organizationId).then((res) => {
      //console.log("Taxes::", res.data) 
    this.setState({taxes: res.data})
  //  this.setState({ invoiceItem: [...this.state.invoiceItem, taxes.push(res.data)]})
    }).catch((err) => {
      console.log("Error:", err)
    })
  }

  handleSelectedTax = (tax) => {
          console.log("Tax", tax)
          let selectedTaxes = this.state.productSelectedTaxes
          selectedTaxes.push(tax)
          this.setState({productSelectedTaxes:selectedTaxes})
          this.setState({ShowTaxdrop:false})
  }

  ProductValidation = () => {
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

 validate = () => {
    let taxNameError = "";
    let taxRateError = "";
    let taxAbbError = "";

    const{taxName,taxRate,taxAbb}=this.state;
    
    if (!taxName) {
      taxNameError = "****Tax name is required";
    }
    if (!taxRate) {
      taxRateError = "****Tax rate is required";
    }
    if (!taxAbb) {
      taxAbbError = "****Tax abbreviation is required";
    } 

    if (taxAbbError ||
      taxNameError ||
      taxRateError 
    ) {

        this.setState({taxNameError:taxNameError })  
        this.setState({taxRateError:taxRateError})        
        this.setState({taxAbbError:taxAbbError})
        
        
        
       
        return false

    }
    return true;
};

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
                    'Content-Type': 'application/json',
                    "Authorization": "Bearer " + localStorage.getItem('token')
                }
              console.log("Tax is Ready to Save : ...." + JSON.stringify(payload))

              const isValid = this.validate();
               if(isValid){
                taxApi.post(payload,headers).then((response) => {
                  console.log(JSON.stringify(response))
                  this.setState({showmodal:false,showInsidemodal:false})
              }).catch((error) => {
               // console(JSON.stringify(error))
                  console.log("Error:", error.response.data[0])
                  alert("Failed: "+ JSON.stringify(error.response.data[0]))
                  this.setState({showmodal:false,showInsidemodal:false})
              })
               } 
                 

  }

  handleProductSubmit = async () => {
    const isValid = this.ProductValidation()
    if(isValid){
        let headers ={
          'Content-Type': 'application/json'
        }
        let userInfo = JSON.parse(localStorage.getItem('userInfo'))
        let data = {
          productName: this.state.productName,
          productDescription: this.state.productDescription,
          productPrice: this.state.productPrice,
          productSellThis: this.state.sellChecked,
          productBuyThis: this.state.buyChecked,
          organization: {
            organizationId: userInfo.organizationId,
            name: userInfo.organizationName,
            active: true
          },
          salesTax: this.state.productSelectedTaxes,
          active: true,
          deleted: false
        }
        console.log("Data......", JSON.stringify(data))
     await   productApi.post(JSON.stringify(data), headers).then((res) => {
          console.log("Response", res)
          this.props.history.push('/sales/products')
          this.setState({productmodal:false})
        }).catch((err) => {
          this.setState({productmodal:false})
          console.log("Error", err)
        })
      }
    this.getProduct();
  } 

  componentWillUnmount(){
    document.removeEventListener('mousedown', this.handleClickOutside);
  }
  handleClickOutside(event) {
    if (this.wrapperRef && !this.wrapperRef.current.contains(event.target)) {
        this.setState({showCustomerList: false})
    }
  }

  // addItem = () => {
  //   const {ItemVisible} = this.state
  //   this.setState({ItemVisible:!ItemVisible})
  //   this.setState({invoiceItem: [...this.state.invoiceItem, this.state.invoiceItem.push(Itemdetail)]}, () => {
  //    console.log("State", this.state.invoiceItem)
  //   })
  // }

  addMore = () => {
    
    this.setState(prevState => ({ invoiceItem: [...prevState.invoiceItem, Itemdetail]}))
    console.log(">?>?>?>?>?", this.state.invoiceItem)
  }

  AddExistingProducts =  (item) =>{
    const {invoiceItem,showProducts,subTotal} = this.state;

   // console.log(item.productName)
    let Tempobj = {
                name:item.productName, 
                description:item.productDescription,
                quantity:1, 
                price:item.productPrice, 
                taxrate:item.salesTax,
                showdrop:false,
                productdrop:false,
                productID:item.id
    }
    this.setState(prevState => ({ invoiceItem: [...prevState.invoiceItem, Tempobj]}))
    console.log("Length of Invoice items ....... " + invoiceItem.length)
    this.setState({showProducts:!showProducts})

    let total = 1 * item.productPrice;

    subTotal.push(total);
    //  if(invoiceItem.length === 1){
    //    this.setState({ invoiceItem: [Tempobj]},() => {
    //      console.log("Update Tax Rate is going to be called ............", invoiceItem)
    //       this.UpdateTaxRateInItems();
    //  })
     
       
    //  }
    //  else{
    //   this.setState(prevState => ({ invoiceItem: [...prevState.invoiceItem, Tempobj]}))
    //  }
   
  }

 

  UpdateTaxRateInItems = (e, index) => {
    const {invoiceItem} = this.state;
         let tempArray = invoiceItem
         let TaxesRates = tempArray[index].taxrate
         let updatedArray = tempArray.map((item, indexValue) => {
             if (indexValue === index) {
                 return { ...item, taxrate: 
                TaxesRates.map(rate => {
                    console.log("Tax Rate inside Method ........... " , rate)
                })
                
                }
             }
             else {
                 return {
                     ...item
                 }
             }
         })
         this.setState({invoiceItem:updatedArray})
     }
 
 UpdateInvoiceItemName = (e, index) => {
   const {invoiceItem} = this.state;
        let tempArray = invoiceItem
        let updatedArray = tempArray.map((item, indexValue) => {
            if (indexValue === index) {
                return { ...item, name: e.target.value }
            }
            else {
                return {
                    ...item
                }
            }
        })
        this.setState({invoiceItem:updatedArray})
    }
    
 UpdateInvoiceItemDesc = (e, index) => {
  const {invoiceItem} = this.state;
       let tempArray = invoiceItem
       let updatedArray = tempArray.map((item, indexValue) => {
           if (indexValue === index) {
               return { ...item, description: e.target.value }
           }
           else {
               return {
                   ...item
               }
           }
       })
       this.setState({invoiceItem:updatedArray})
   }
   
 UpdateInvoiceItemQuantity = (e, index) => {
  const {invoiceItem} = this.state;
       let tempArray = invoiceItem
       let updatedArray = tempArray.map((item, indexValue) => {
           if (indexValue === index) {
               return { ...item, quantity: e.target.value }
           }
           else {
               return {
                   ...item
               }
           }
       })
       this.setState({invoiceItem:updatedArray})
   }
   ShowDropdown = (index) => {
    const {invoiceItem} = this.state;
         let tempArray = invoiceItem
         let updatedArray = tempArray.map((item, indexValue) => {
             if (indexValue === index) {
                 return { ...item, showdrop: true }
             }
             else {
                 return {
                     ...item
                 }
             }
         })
         this.setState({invoiceItem:updatedArray})
     }

     ShowProductDropdown = (index) => {
      const {invoiceItem} = this.state;
           let tempArray = invoiceItem
           let updatedArray = tempArray.map((item, indexValue) => {
               if (indexValue === index) {
                   return { ...item, productdrop: true }
               }
               else {
                   return {
                       ...item
                   }
               }
           })
           this.setState({invoiceItem:updatedArray})
       }

       HideProductDropdown = (index) => {
        const {invoiceItem} = this.state;
             let tempArray = invoiceItem
             let updatedArray = tempArray.map((item, indexValue) => {
                 if (indexValue === index) {
                     return { ...item, productdrop: false }
                 }
                 else {
                     return {
                         ...item
                     }
                 }
             })
             this.setState({invoiceItem:updatedArray})
         } 
     HideDropdown = (index) => {
      const {invoiceItem} = this.state;
           let tempArray = invoiceItem
           let updatedArray = tempArray.map((item, indexValue) => {
               if (indexValue === index) {
                   return { ...item, showdrop: false }
               }
               else {
                   return {
                       ...item
                   }
               }
           })
           this.setState({invoiceItem:updatedArray})
       } 
   
 UpdateInvoiceItemPrice = (e, index) => {
  const {invoiceItem} = this.state;
       let tempArray = invoiceItem
       let updatedArray = tempArray.map((item, indexValue) => {
           if (indexValue === index) {
               return { ...item, price: e.target.value }
           }
           else {
               return {
                   ...item
               }
           }
       })
       this.setState({invoiceItem:updatedArray})
   }

   DeleteInvoiceItem = (index) => {
    const {invoiceItem} = this.state;
    
      if (index > -1) {
                        let dup_list = [...invoiceItem]
                        dup_list.splice(index, 1);
                        console.log("data after remove :", dup_list)
                        this.setState({ invoiceItem: dup_list })
                    }
    }

  handleSelectedCustomer(customer){
    console.log("Called")
    this.setState({selectedCustomer: customer})

  } 
  
  handleTaxSelection= (item,Amount,index) => {
    const{selectedTaxRate}= this.state;
    console.log('Tax Selected')
    if(Amount === 0) {
      alert("Before Selecting Tax, Enter the item price")
      return
    }
   this.HideDropdown(index)
    selectedTaxRate.push({
      prodIndex:index,
      rate:item.rate,
      abb:item.abbreviation,
      taxAmount:Amount
    })
        // console.log(selectedTaxRate)  
    //  this.HandleTaxes(item,Amount,index)
  }

  HandleTaxes = (item, Amount,index) => {
    const {invoiceItem} = this.state;
    console.log("Handled Taxes.... " + item.rate + " Amount ...." + Amount + " Index ... " + index)
         let tempArray = invoiceItem
      //   let tempTaxRate = tempArray.taxrate
         let updatedArray = tempArray.map((items, indexValue) => {
        //   console.log("&&&&&&&&&Invoice Taxes......: " + JSON.stringify(invoiceItem.taxrate))
         let addedTaxArray = invoiceItem.taxrate.push(item)
             if (indexValue === index) {
                 return { ...items, taxrate: addedTaxArray }
             }
             else {
                 return {
                     ...items
                 }
             }
         })
         console.log("Updated Invoice Items ...???? " + JSON.stringify(updatedArray))
         this.setState({showselectedTax:true})
         this.setState({invoiceItem:updatedArray})
     }

     UpdateTaxSelection = async (item, index) => {
      const {invoiceItem} = this.state;
           let tempArray = await invoiceItem
           let updatedArray = tempArray.map((items, indexValue) => {
               if (indexValue === index) {
                      return { ...items, Selectedtaxes: tempArray.Selectedtaxes.push(item) }
               }
               else {
                   return {
                       ...items
                   }
               }
           })
           this.setState({invoiceItem:updatedArray})
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

  Insidetoggle = () =>{
    const{showInsidemodal}=this.state
    this.setState({showInsidemodal:!showInsidemodal})
    this.setState({
      taxNameError:'',
      taxRateError:'',
      taxAbbError:''
    })
  }
  
  
toggleProductModal = () => {
  const{productmodal}=this.state
    this.setState({productmodal:!productmodal})
    this.setState({
      taxNameError:'',
      taxRateError:'',
      taxAbbError:''
    })
  }


  UnselectItem = (index) =>{
    const {selectedTaxRate} = this.state;    
      if (index > -1) {
                        let dup_list = [...selectedTaxRate]
                        dup_list.splice(index, 1);
                       // console.log("data after remove :", dup_list)
                        this.setState({ selectedTaxRate: dup_list })
                    }

  }

  deleteTax = (index) => {
    let selectedTaxes = this.state.productSelectedTaxes
    selectedTaxes.splice(index)
    this.setState({productSelectedTaxes:selectedTaxes})
  }

  render(){
const{
  taxes,
  productsTableData,
  selectedTaxRate,
  showmodal,
  productmodal,
  showInsidemodal,
  showProducts,
  ShowTaxdrop,
  taxName,
  taxRate,
  taxAbb,
  taxDesc,
  taxNo,
  showtaxNumberOnInvoice,
  taxRecoverable,
  compoundTax,
  invoiceItem,
  ItemVisible,
  taxAbbError ,
  taxNameError ,
  taxRateError,
  productName,
  productPrice,
  productDescription,
  sellChecked,
  buyChecked,
  productSelectedTaxes,
  subTotal
}= this.state;
console.log("$$$$$$$$$$$$Sub Total Array []: " + JSON.stringify(subTotal));
 const {Selectedtaxes}=this.state.invoiceItem;
    return(
      <CContainer>
        <h4 className='mt-4 text-center font-weight-bold'>New Invoice</h4>
        <CRow>
          <CCol sm='12'>
            <CCard> 
              <CCardHeader className='text-center font-weight-bold' style={{backgroundColor: Colors.themeDark, color: Colors.white}}>
                Business address and contact details, title, summary & logo
              </CCardHeader>
              <CCardBody>
                <CRow>  
                  <CCol sm='6'>
                    <h4 className="text-center">Add your logo</h4>
                    <InvoiceLogoSelector></InvoiceLogoSelector>
                  </CCol>
                  <CCol sm='6'>
                    {/* eslint-disable-next-line */}
                    <CInput value={this.state.invoiceHeader} onChange={(e) => this.setState({invoiceHeader:e.target.value})} className="m-3" style={styles.inputBorderRadius, styles.textAlignRight} ></CInput>
                    {/* eslint-disable-next-line */}
                    <CInput placeholder="Summary(e.g project name, description of invoice)" value={this.state.invoiceSummary} onChange={(e) => this.setState({invoiceSummary:e.target.value})} className="m-3" style={styles.inputBorderRadius, styles.textAlignRight}></CInput>
                    <CCardText className="m-3" style={{textAlign:'right', fontWeight:'bold'}}>{this.state.userInfo !== null ? this.state.userInfo.organizationName : ''}</CCardText>
                    <CCardText className="m-3" style={{textAlign:'right', color: Colors.themeGreen, fontWeight:'bold'}}>Edit your business address and contact details</CCardText>
                  </CCol>
                </CRow>
              </CCardBody>
            </CCard>
            <CCard>
              <CCardBody>
                <CRow>  
                  <CCol sm='6' style={{ display:'flex',alignItems:'center'}}>
                    {
                      this.state.selectedCustomer === null ?
                      !this.state.showCustomerList ?  
                      <div ref={this.wrapperRef} className="vertical-center" onClick={() => this.setState({showCustomerList: true})} style={{border:`1px dotted ${Colors.themeGreen}`, borderRadius: 10, width:'50%', padding:30, margin:'auto'}}>
                        <div style={{display: 'flex',justifyContent: 'center', margin:5}}>
                          <img src={addCustomer} style={{height:30, width:30}} alt=""></img>
                          <p className="text-center p-1">
                            Add a customer
                          </p>
                        </div>
                      </div>
                      :
                      <div ref={this.wrapperRef}  className="vertical-center" style={{ width:'50%', padding:30, margin:'auto'}}>
                        <div style={{display: 'flex', flexDirection:'column',justifyContent: 'center', margin:5}}>
                          <CInput autoFocus onFocus={() => console.log("Hello") } ></CInput>
                          <div style={{border: `1px solid ${Colors.inputBorder}`}}>
                            {
                              this.state.customers.map((customer) => (
                                  <div onClick={() => this.handleSelectedCustomer(customer)} style={{padding:5, cursor: 'pointer'}} key={customer.userId}>{customer.firstName} {customer.lastName}</div>
                                ))
                            }
                            <div style={{padding:5, borderTop:`1px solid ${Colors.themeDark}`, color: Colors.themeGreen }}>Create a new Customer</div>
                          </div>
                        </div>
                      </div>
                      :
                      <div ref={this.wrapperRef}  className="vertical-center" style={{ width:'50%', padding:30, }}>
                          <div style={{display: 'flex', flexDirection:'column',justifyContent:'flex-end', margin:5}}>
                            <p>Bill to</p>
                            <p style={{fontWeight:'bold'}}>{this.state.selectedCustomer !== null ? this.state.selectedCustomer.firstName + ' ' + this.state.selectedCustomer.lastName : '' } </p>
                            <CCardText></CCardText>
                            <CCardText></CCardText>
                            <CCardText></CCardText>
                            <CCardText></CCardText>
                            <CCardText onClick={() => this.setState({selectedCustomer: null})} style={{color: Colors.themeGreen, cursor:'pointer'}}>Choose a different Customer</CCardText>
                          </div>
                        </div>

                    }
                  </CCol>
                  <CCol sm='2'>
                  </CCol>
                  <CCol sm='4'>
                    <CInputGroup className="mt-3">
                        <CInputGroupPrepend className="col-md-4">
                            <CLabel className="mfs-auto align-self-center h6" >Invoice number</CLabel>
                            {/* <p>*</p> */}
                        </CInputGroupPrepend>
                        <CInput style={styles.inputBorderRadius} ></CInput>
                    </CInputGroup>
                    <CInputGroup className="mt-3">
                        <CInputGroupPrepend className="col-md-4">
                            <CLabel className="mfs-auto align-self-center h6" >P.O./S.O number</CLabel>
                            {/* <p>*</p> */}
                        </CInputGroupPrepend>
                        <CInput style={styles.inputBorderRadius} ></CInput>
                    </CInputGroup>
                    <CInputGroup className="mt-3">
                        <CInputGroupPrepend className="col-md-4">
                            <CLabel className="mfs-auto align-self-center h6" >Invoice date</CLabel>
                            {/* <p>*</p> */}
                        </CInputGroupPrepend>
                        <CInput type="date" style={styles.inputBorderRadius} ></CInput>
                    </CInputGroup>
                    <CInputGroup className="mt-3">
                        <CInputGroupPrepend className="col-md-4">
                            <CLabel className="mfs-auto align-self-center h6" >Payment due</CLabel>
                            {/* <p>*</p> */}
                        </CInputGroupPrepend>
                        <CInput type="date" style={styles.inputBorderRadius} ></CInput>
                    </CInputGroup>
                    {/* <CInput className="m-3"></CInput>
                    <CInput className="m-3"></CInput> */}
                  </CCol>
                </CRow>
              </CCardBody>
            </CCard>

            <CCard> 
              <CCardHeader className='text-center font-weight-bold' style={{backgroundColor: Colors.themeDark, color: Colors.white}}>
                <CRow>
                  <CCol sm='7'>Items</CCol>
                  <CCol sm='1' className='text-left'>Quantity</CCol>
                  <CCol sm='1' className='text-left'>Price</CCol>
                  <CCol sm='2'>Amount</CCol>
                </CRow>
              </CCardHeader>
              <CCardBody>
                {
                  this.state.invoiceItem.map((item,index) => {
                    var total = item.price * item.quantity;
                    const itemIndex = index;
                    let ShowDrop = item.showdrop;
                    let ProductDrop = item.productdrop;
                    let taxArray = item.taxrate;
                    
                    return   (                                            
                      <div className="itemRow">
                        <CRow className='m-3 '>  
                        {/* <CCol sm="2">
                        {!ProductDrop ? 
                                            <div style={{ border:'1px solid grey', borderRadius:'5px', width:'150px',height:'35px', cursor:'pointer',display:'flex',
                                          justifyContent:'center', alignItems:'center'}}
                                            onClick={() => this.ShowProductDropdown(index)}> 
                                            <span style={{color:'lightgrey'}}>Choose Items</span>
                                                        <ChevronsDown size={18} color={Colors.themeDark}/>
                                            </div> 
                                            
                                          : null }                                   
  
  
                                          {ProductDrop ? 
                                          <div   className="vertical-center" style={{ width:'150px', padding:10}}>
                                          <div style={{display: 'flex', flexDirection:'column',justifyContent: 'center', margin:5}}>                                            
                                            <CInput onFocus={() =>  this.HideProductDropdown(index)} ></CInput>
                                            <div style={{border: `1px solid ${Colors.inputBorder}`}}>
                                                                  {
                                                                   productsTableData.map((item) => {
                                                                    return (
                                                                      <div className="NewTaxes" key={item.taxNumber} onClick={ () => this.AddExistingProducts(item,index)}>
                                                                        {item.productName}
                                                                      </div>
                                                                    );
                                                                  })
                                                                  }
                                              <div onClick={this.toggleProductModal} className="CreateTax"> + New Product</div>
                                            </div>
                                          </div>
                                        </div>
                                          
                                          : null}

                                                        


                        </CCol> */}
                          <CCol sm='3'>
                         <b>{item.name}</b>
                            {/* <CInput placeholder="Enter item name" style={styles.inputBorderRadius} value={item.name}
                            onChange={(e) => this.UpdateInvoiceItemName(e, index)}
                            ></CInput> */}
                          </CCol>
                          <CCol sm='4'>
                            <CInput placeholder="Enter item description" style={styles.inputBorderRadius} value={item.description}
                            onChange={(e) => this.UpdateInvoiceItemDesc(e, index)}></CInput>
                          </CCol>
                          <CCol sm='1'>
                            <CInput style={styles.inputBorderRadius} value={item.quantity}
                            onChange={(e) => this.UpdateInvoiceItemQuantity(e, index)}></CInput>
                          </CCol>
                          <CCol sm='1'>
                            <CInput placeholder='0.00' style={styles.inputBorderRadius} value={item.price}
                            onChange={(e) => this.UpdateInvoiceItemPrice(e, index)}></CInput>
                          </CCol>
                          <CCol sm='2'>
                            <CCardText className="text-right">{total}</CCardText>
                            {/* <CInput placeholder="Enter item name" style={styles.inputBorderRadius}></CInput> */}
                          </CCol>
                          <CCol sm='1'>
                          <Trash2 size={24} className="trash" onClick={ () => this.DeleteInvoiceItem(index)} style={{marginLeft:'10px',marginRight:'5px',cursor:'pointer'}}/>
                          <PlusSquare size={24} color={Colors.themeGreen} onClick={() => this.addMore()} />
                          </CCol>
                        </CRow>
                        <CRow className='m-3'>
                          <CCol sm='7'>
                          
                          </CCol>
                          <CCol sm='5'>
                            <CInputGroup className="mt-3" >
                              <CInputGroupPrepend className="col-md-4">
  
                                {/* {selectedTaxRate.length >= 1 ? null : <CLabel className="mfs-auto align-self-center h6" >Tax: </CLabel> } */}
                                
                                    {/* <p>*</p> */}
                              </CInputGroupPrepend>
                                    <div style={{display:'flex', flexDirection:'column'}}>

                                            <div>
                                                {taxArray.map(tax => {
                                                  let Amount = tax.rate*total / 100;
                                                  return(
                                                    <div key={tax.taxId} className="TaxSec">
                                                      <b>Tax: </b>
                                                      <div className="flexbox"> 
                                                       {tax.abbreviation}                                                    
                                                      </div>
                                                      <div className="taxdynamicTotal">{Amount}</div>  
                                                      

                                                    </div>
                                                  )
                                                })

                                                }                                              
                                            </div>

                                          <div >

                                            {
                                               selectedTaxRate.map((item,index) => {
                                                let Amount = item.rate*total / 100;
                                                 let ShowTax=false;

                                                 if(item.prodIndex === itemIndex){
                                                   ShowTax=true;
                                                 }
                                                 else{
                                                   ShowTax=false;
                                                 }

                                                return (
                                                  <div key={item.prodIndex} className="TaxSec">
                                                    
                                                        {ShowTax ? 
                                                        <>
                                                      <b>Tax: </b>
                                                      <div className="flexbox"> 
                                                      {item.abb}                                                     
                                                      </div>
                                                      <Trash2 className="trash" size={18} onClick={ () => this.UnselectItem(index)} style={{marginLeft:'10px',}}/>
                                                       
                                                      <div className="taxTotal">{Amount}</div>   

                                                      </>
                                                        :null 
                                                        }
                                                       
                                                       
                                                   
                                                  </div>
                                                );
                                              })
                                            }
                                              {/* {SelectedTaxList} */}
                                              {/* {SelectedTaxArray} */}
 
                                          </div>
                                          
                                          {!ShowDrop ? 
                                            <div style={{ border:'1px solid grey', borderRadius:'5px', width:'150px',height:'35px', cursor:'pointer',display:'flex',
                                          justifyContent:'center', alignItems:'center'}}
                                            onClick={() => this.ShowDropdown(index)}> 
                                            <span style={{color:'lightgrey',marginRight:'30px'}}>Select a Tax</span>
                                                        <ChevronsDown size={18} color={Colors.themeDark}/>
                                            </div> 
                                            
                                          : null }
                                        
  
  
                                          {ShowDrop ? 
                                          <div   className="vertical-center" style={{ width:'150px', padding:10}}>
                                          <div style={{display: 'flex', flexDirection:'column',justifyContent: 'center', margin:5}}>
                                            
                                            <CInput onFocus={() =>  this.HideDropdown(index) } ></CInput>
                                            <div style={{border: `1px solid ${Colors.inputBorder}`}}>
                                                                  {
                                                                   taxes.map((item) => {
                                                                  //  console.log("Taxes..... " + JSON.stringify(item))
                                                                    let Amount = item.rate * total / 100;
                                                                   // console.log("Amount after Taxes... " + Amount)
                                                                    return (
                                                                      <div className="NewTaxes" key={item.taxNumber} onClick={ () => this.handleTaxSelection(item,Amount,index)}>
                                                                        {item.abbreviation}
                                                                      </div>
                                                                    );
                                                                  })
                                                                  }
                                              <div onClick={this.toggle} className="CreateTax">Create a new Tax</div>
                                            </div>
                                          </div>
                                        </div>
                                          
                                          : null}
                            
                                  
                                    </div>
                                             
                                    
                              
                             </CInputGroup>
                          </CCol>
                        </CRow>
                      </div>
                    )
                  } )
                }
                <CModal show={showmodal} onClose={this.toggle} size='lg'>
                                              <CModalHeader closeButton style={{backgroundColor:"lightgrey"}}> <h2>Create a new Tax</h2></CModalHeader>
  
                                              <CModalBody>
  
                                                <CLabel>Tax Name</CLabel>
                                                <CInput  placeholder="for example GST..." onChange={(e) => this.setState({taxName:e.target.value})} value={taxName}/>                                              
                                                <div style={{ fontSize: 10, color: "red" }}>
                                                          {taxNameError}
                                                      </div>
                                                <CLabel>Rate</CLabel>
                                                <CInput onChange={(e) => this.setState({taxRate:e.target.value})} value={taxRate}/>
                                                <div style={{ fontSize: 10, color: "red" }}>
                                                          {taxRateError}
                                                      </div>
                                                <CLabel>Tax Number </CLabel>
                                                <CInput  onChange={(e) => this.setState({taxNo:e.target.value})}  value={taxNo}/>                                              
                                                <CLabel>Abbreviation</CLabel>
                                                <CInput  onChange={(e) => this.setState({taxAbb:e.target.value})} value={taxAbb}/>
                                                <div style={{ fontSize: 10, color: "red" }}>
                                                          {taxAbbError}
                                                      </div>
                                                <CLabel>Description</CLabel>
                                                <CInput  onChange={(e) => this.setState({taxDesc:e.target.value})} value={taxDesc}/>
                                              
                                              <div style={{marginTop:'20px'}}>
  
                                              
                                                <Label style={{marginLeft:"1rem",fontSize:'14px'}}> <Input type="checkbox"checked={taxRecoverable} 
                                                onChange={(target) => this.setState({taxRecoverable:target.checked})} 
                                                /> Tax Recoverable  </Label>
                                                <Label style={{marginLeft:"2rem",fontSize:'14px'}}> <Input type="checkbox" checked={compoundTax}
                                                onChange={(target) => this.setState({compoundTax:target.checked})} 
                                                /> compound Tax  </Label>
                                                <Label style={{marginLeft:"2rem",fontSize:'14px'}}> <Input type="checkbox" checked={showtaxNumberOnInvoice}
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
                {showProducts
                ? <> 
                <div className="ProductListContainer"> 
                      <CRow>
                        <CCol sm='12' style={{ cursor:'pointer'}}
                        className="text-center">
                          {   productsTableData.map((item) => {
                                          return (
                                    <div className="Productlistitem" key={item} onClick={ () => this.AddExistingProducts(item)}>
                                          {item.productName} 
                                          <hr/>   
                                                </div>
                                                    );
                                                  })
                              }
                        
                        </CCol>                  
                      </CRow> 
                      <CRow className='CreateNewItembtn '>
                      <CCol sm='10' className="text-center ">
                        <div onClick={() => this.toggleProductModal()}>
                          Create New Product
                        </div>
                      </CCol>
                    </CRow>
                    </div>
                    <CModal show={productmodal} onClose={this.toggleProductModal} size='lg'>
                                              <CModalHeader closeButton style={{backgroundColor:"lightgrey"}}> <h2>Create New Product</h2></CModalHeader>
  
                                              <CModalBody>
  
                                                <CLabel>Product Name</CLabel>
                                                <CLabel className="ml-1 align-self-center" style={{color: Colors.red}}>*</CLabel>
                                                <CInput style={styles.inputBorderRadius} value={productName} onChange={(e) => this.setState({productName: e.target.value})}/>                                          
                                                <CFormText className="help-block col-4" style={{margin:'auto'}} color="danger">{this.state.productNameError}</CFormText>
                                                <CInputGroup className="mt-3">
                                                      <CInputGroupPrepend className="col-md-4">
                                                          <CLabel className="mfs-auto align-self-center">Description</CLabel>
                                                      </CInputGroupPrepend>
                                                      <CTextarea style={styles.inputBorderRadius} value={productDescription} onChange={(e) => this.setState({productDescription: e.target.value})}></CTextarea>
                                                 </CInputGroup>
                                                <CLabel>Price </CLabel>
                                                <CInput  onChange={(e) => this.setState({productPrice:e.target.value})} value={productPrice}/>                                              
                                        <div style={{marginTop:'20px'}}>
  
                                              
                                                <Label style={{marginLeft:"1rem",fontSize:'14px'}}> 
                                                <Input type="checkbox"checked={sellChecked} 
                                                onChange={(target) => this.setState({sellChecked:target.checked})} 
                                                /> Sell This  </Label>
                                                <Label style={{marginLeft:"2rem",fontSize:'14px'}}> 
                                                <Input type="checkbox" checked={buyChecked}
                                                onChange={(target) => this.setState({buyChecked:target.checked})} 
                                                /> Buy This  </Label>
                                                
                                                
                                           </div>

                        <CInputGroup className="mt-3">
                        <CInputGroupPrepend className="col-md-4">
                            <CLabel className="mfs-auto align-self-center">Sales Tax</CLabel>
                        </CInputGroupPrepend>
                          <div>
                            {
                              productSelectedTaxes.length !== 0 ?
                              productSelectedTaxes.map((item, index) => (
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
                            <div className="vertical-center">
                              <div style={{display: 'flex', flexDirection:'column',justifyContent: 'center'}}>
                              
                              {!ShowTaxdrop ? 
                                           <CInput onFocus={() => this.setState({ShowTaxdrop: true}) } style={styles.inputBorderRadius}></CInput>
                                            
                                          : null }
                            {ShowTaxdrop
                             ? 
                              <div style={{border: `1px solid ${Colors.inputBorder}`}}>
                                <CInput onFocus={() => this.setState({ShowTaxdrop: false}) } style={styles.inputBorderRadius}></CInput>
                                {
                                    this.state.taxes.map((tax) => (
                                      <div onClick={() => this.handleSelectedTax(tax)} style={{padding:5, cursor: 'pointer'}} key={tax.taxId}>{tax.abbreviation}</div>
                                    ))
                                }
                                <div onClick={this.Insidetoggle} style={{padding:5, borderTop:`1px solid ${Colors.themeDark}`, color: Colors.themeGreen, cursor:'pointer' }}>Create a new Tax</div>
                              </div>
                            :
                            <div></div>
                              }
                            </div>                            
                            </div>
                          </div>
                        
                          <CModal show={showInsidemodal} onClose={this.Insidetoggle} size='lg'>
                                              <CModalHeader closeButton style={{backgroundColor:"lightgrey"}}> <h2>Create a new Tax</h2></CModalHeader>
  
                                              <CModalBody>
  
                                                <CLabel>Tax Name</CLabel>
                                                <CInput  placeholder="for example GST..." onChange={(e) => this.setState({taxName:e.target.value})} value={taxName}/>                                              
                                                <div style={{ fontSize: 10, color: "red" }}>
                                                          {taxNameError}
                                                      </div>
                                                <CLabel>Rate</CLabel>
                                                <CInput onChange={(e) => this.setState({taxRate:e.target.value})} value={taxRate}/>
                                                <div style={{ fontSize: 10, color: "red" }}>
                                                          {taxRateError}
                                                      </div>
                                                <CLabel>Tax Number </CLabel>
                                                <CInput  onChange={(e) => this.setState({taxNo:e.target.value})}  value={taxNo}/>                                              
                                                <CLabel>Abbreviation</CLabel>
                                                <CInput  onChange={(e) => this.setState({taxAbb:e.target.value})} value={taxAbb}/>
                                                <div style={{ fontSize: 10, color: "red" }}>
                                                          {taxAbbError}
                                                      </div>
                                                <CLabel>Description</CLabel>
                                                <CInput  onChange={(e) => this.setState({taxDesc:e.target.value})} value={taxDesc}/>
                                              
                                              <div style={{marginTop:'20px'}}>
  
                                              
                                                <Label style={{marginLeft:"1rem",fontSize:'14px'}}> <Input type="checkbox"checked={taxRecoverable} 
                                                onChange={(target) => this.setState({taxRecoverable:target.checked})} 
                                                /> Tax Recoverable  </Label>
                                                <Label style={{marginLeft:"2rem",fontSize:'14px'}}> <Input type="checkbox" checked={compoundTax}
                                                onChange={(target) => this.setState({compoundTax:target.checked})} 
                                                /> compound Tax  </Label>
                                                <Label style={{marginLeft:"2rem",fontSize:'14px'}}> <Input type="checkbox" checked={showtaxNumberOnInvoice}
                                                onChange={(target) => this.setState({showtaxNumberOnInvoice:target.checked})}  
                                                /> Show tax Number on Invoice  </Label>
                                                
                                                </div>
                                        
                                               
                                              </CModalBody>
                                              <CModalFooter>
                                                <CButton color="primary" onClick={this.AddTax}>Save</CButton>{' '}
                                                <CButton
                                                  color="secondary"
                                                  onClick={this.Insidetoggle}
                                                >Cancel</CButton>
                                              </CModalFooter>
                                     </CModal>

                    </CInputGroup>
                                              
                                              </CModalBody>
                                              <CModalFooter>
                                                <CButton color="primary" onClick={this.handleProductSubmit}>Save</CButton>{' '}
                                                <CButton
                                                  color="secondary"
                                                  onClick={this.toggleProductModal}
                                                >Cancel</CButton>
                                              </CModalFooter>
                                     </CModal>  
              </>
                
                :null}
                <CRow className='mt-3'>
                  <CCol sm='12' style={{borderStyle:'solid', borderWidth:'1px',padding:10, backgroundColor: this.state.addItemBgColor, cursor:'pointer'}}
                  onMouseEnter={() => this.setState({addItemBgColor: Colors.grey})} 
                  onMouseLeave={() => this.setState({addItemBgColor: Colors.white})}  
                  className="text-center">
                    <div onClick={() => this.setState({showProducts:!showProducts})}>
                      <CCardText style={{color:Colors.themeGreen}}>Add an item</CCardText> 
                    </div>
                  </CCol>
                </CRow>
                <CRow className='m-3'>
                  <CCol sm='9'></CCol>
                  <CCol sm='1'>
                    <CCardText>Subtotal</CCardText>
                  </CCol>
                  <CCol sm='2'>
                    <CCardText className="text-right">0.00</CCardText>
                  </CCol>
                </CRow>
                <CRow className='m-3'>
                  <CCol sm='6'></CCol>
                  <CCol sm='4'>
                  <CInputGroup >
                    <CInputGroupPrepend className="col-md-4">
                      <CLabel className="mfs-auto align-self-center h6" >Total </CLabel>
                          {/* <p>*</p> */}
                    </CInputGroupPrepend>
                    <CSelect style={styles.inputBorderRadius}>
                      <option>USD</option>
                    </CSelect>
                  </CInputGroup>
                  </CCol>
                  <CCol sm='2'>
                    <CCardText className="text-right">0.00</CCardText>
                  </CCol>
                </CRow>

              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    )
  }
}
export default NewInvoice;