import React from 'react'
import { CCard, CCardBody, CContainer, CForm, CInput,CInputGroup, CRow, CButton, CCol, CLabel, CSpinner } from '@coreui/react';
import colors from '../../../config/Colors';
import registerApi from '../../../api/register'
// import CIcon from '@coreui/icons-react'

class Organization extends React.Component{

  constructor(props){
    super(props)
    this.state = {
      buttonBgColor: colors.themeDark,
      loader: false,
      validFirstName: true,
      validLastName: true,
      validOrganizationname: true,
    }
    this.handleRegister = this.handleRegister.bind(this)
  }

  componentDidMount(){
    if(localStorage.getItem('register_data') !== null){

      let formData = JSON.parse(localStorage.getItem('register_data'))
      delete formData.confirmPassword
      console.log("><><><>", formData)
      this.setState({formData: formData})
    }

  }

  handleRegister(){
    if(this.state.formData.firstName === undefined || this.state.formData.firstName === ''){
      this.setState({validFirstName: false})
    }else{
      this.setState({validFirstName:true})
    }
    if(this.state.formData.lastName === undefined || this.state.formData.lastName === ''){
      this.setState({validLastName: false})
    }else{
      this.setState({validLastName:true})
    }
    if(this.state.formData.organization === undefined || this.state.formData.organization.name === ''){
      this.setState({validOrganizationname: false})
    }else{
      this.setState({validOrganizationname:true})
    }
    console.log("CLICK...", this.state.formData)
    this.setState({loader:true})
    let data = this.state.formData
    data = {...data, active:true}
    let headers = {
      'Content-Type': 'application/json'
    }
    console.log("Data......", data)
    data=JSON.stringify(data)
    registerApi.post(data,headers).then((response) => {
      console.log("Created..", response)
      localStorage.removeItem('register_data')
      localStorage.setItem('token', response.data.value)
      localStorage.setItem('userInfo', JSON.stringify(response.data))
      this.props.history.push('/')
    }).catch((err) => {
      this.setState({
        loader:false
      })
      console.log(err.response.data[0])
      alert("Error: "+ err.response.data[0])
    })
    
  }

  render(){
    return (

      <div className="c-app c-default-layout flex-row align-items-center">
          <CContainer>                 
              <CRow className="justify-content-center">
              <CCol md="9" lg="7" xl="6">
                  <CCard className="mx-4">
                  <CCardBody className="p-5">
                  <h2>Welcome to Chill !</h2>
                  <h6 className="text-muted">Tell us about you and your business</h6>
                      <CForm className="mt-4">
                      {/* <p>What's your name?</p> */}
                      <CLabel>What's your name?</CLabel>
                      <CInputGroup className="mb-3">
                          <CInput type="text" placeholder="First Name" autoComplete="firstname" onChange={(e) => this.setState({formData:{...this.state.formData, firstName: e.target.value}})} style={{borderColor: !this.state.validFirstName ? 'red': '' } } />
                          <CInput type="text" placeholder="Last Name" autoComplete="lastname" className='ml-2' onChange={(e) => this.setState({formData:{...this.state.formData, lastName: e.target.value}})} style={{borderColor: !this.state.validLastName ? 'red': '' }} />
                      </CInputGroup>
                      <CLabel>What's your business name?</CLabel>
                      <CInputGroup className="mb-3">
                          <CInput  placeholder="Your business name goes here" autoComplete="businessname" onChange={(e) => this.setState({formData: {...this.state.formData, organization: {name: e.target.value, active:true}}})} style={{borderColor: !this.state.validOrganizationname ? 'red': '' }} />
                      </CInputGroup>

                      {/* <CLabel>What's your business do?</CLabel>
                      <CInputGroup className="mb-3">
                        <CSelect>
                          <option>Select what describes your business</option>
                        </CSelect>    
                      </CInputGroup> */}

                      {/* <CLabel>Business country</CLabel>
                      <CInputGroup>
                        <CSelect></CSelect>
                      </CInputGroup> */}
                      <CButton 
                      disabled={this.state.loader}
                        onClick={this.handleRegister}
                        onMouseEnter={() => this.setState({buttonBgColor: colors.themeGreen})} 
                        onMouseLeave={() => this.setState({buttonBgColor: colors.themeDark})}  
                        style={{backgroundColor: this.state.buttonBgColor, fontWeight:'bold', width:'100%',marginTop:'20px',color:colors.white,radius:'0.5em' }}
                        block
                      >{
                        this.state.loader? <CSpinner size="sm"></CSpinner>: ''
                      } Get Started
                      </CButton>
                      </CForm>
                  </CCardBody>
                  {/* <CCardFooter className="p-4">
                      <CRow>
                      <CCol xs="12" sm="6">
                          <CButton className="btn-facebook mb-1" block><span>facebook</span></CButton>
                      </CCol>
                      <CCol xs="12" sm="6">
                          <CButton className="btn-twitter mb-1" block><span>twitter</span></CButton>
                      </CCol>
                      </CRow>
                  </CCardFooter> */}
                  </CCard>
              </CCol>
              </CRow>
          </CContainer>
      </div>
    )
  }
}

export default Organization;