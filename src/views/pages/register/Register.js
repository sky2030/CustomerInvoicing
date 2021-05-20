import React from 'react'
import CIcon from '@coreui/icons-react'
import colors from '../../../config/Colors.js'
import { CCard, CCardBody, CContainer, CForm, CInput,CInputGroup, CInputGroupPrepend, CInputGroupText, CRow, CButton, CCol, CFormText } from '@coreui/react';
// import logo from '../../../assets/logo/ChillLogo.png'
class Register extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            formData: {},
            confirmPasswordText: '',
            confirmPasswordTextColor: '',
            confirmPasswordValidator: false,
            emailValidText: '',
            emailValidator: false,
            buttonBgColor: colors.themeDark
        }
        this.validateEmail = this.validateEmail.bind(this)
        this.validatePassword = this.validatePassword.bind(this)
        this.handleRegister = this.handleRegister.bind(this)
    }

    async componentDidMount(){
        if(localStorage.getItem('register_data') !== null){
            this.setState({formData: JSON.parse(localStorage.getItem('register_data')),emailValidator: true, confirmPasswordValidator:true })
        }
    }
    validateEmail(email){
        var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    };
    

    verifyEmail(event) {
        if(this.validateEmail(event.target.value)){
            this.setState({emailValidator: true, emailValidText: '' ,formData: {...this.state.formData, emailAddress: event.target.value}})
        }else {
            this.setState({emailValidText:'Email not valid'})
        }
    }

    validatePassword(event){
        
        if(event.target.value !== this.state.formData.password){
            this.setState({confirmPasswordText: 'Passwords dont match',confirmPasswordTextColor: 'danger', confirmPasswordValidator:false})
        } else {
            this.setState({confirmPasswordText: 'Passwords matched',confirmPasswordTextColor: 'info', confirmPasswordValidator:true,formData: {...this.state.formData, confirmPassword: event.target.value} })
        }
    }

    handleRegister(){
        if(this.state.emailValidator && this.state.confirmPasswordValidator){
            localStorage.setItem('register_data', JSON.stringify(this.state.formData))
            this.props.history.push('/onboarding')
        }
    }

    render(){
        return(
            <div className="c-app c-default-layout flex-row align-items-center">
                <CContainer >
                    <CRow className="justify-content-center" >
                    <CCol xl="6">
                        <CCard className="mx-8">
                        <CCardBody className="p-5">
                            <CForm>
                            <h1>Register</h1>
                            <p className="text-muted">Create your account</p>
                            <CInputGroup className="mb-3">
                                <CInputGroupPrepend>
                                <CInputGroupText>
                                    <CIcon name="cil-user" />
                                </CInputGroupText>
                                </CInputGroupPrepend>
                                <CInput type="text" placeholder="Username" autoComplete="username" value={this.state.formData.username !== undefined ? this.state.formData.username : ''} onChange={(e) => this.setState({formData:{...this.state.formData, username: e.target.value}})} />
                            </CInputGroup>
                            <CInputGroup className="mb-3">
                                <CInputGroupPrepend>
                                <CInputGroupText>@</CInputGroupText>
                                </CInputGroupPrepend>
                                <CInput type="email" placeholder="Email" autoComplete="email" value={ this.state.formData.emailAddress } onChange={(e) => this.verifyEmail(e)} />
                            </CInputGroup>
                            <CFormText className="help-block mb-3" color="danger" >{this.state.emailValidText} </CFormText>
                            <CInputGroup className="mb-3">
                                <CInputGroupPrepend>
                                <CInputGroupText>
                                    <CIcon name="cil-lock-locked" />
                                </CInputGroupText>
                                </CInputGroupPrepend>
                                <CInput type="password" placeholder="Password" autoComplete="new-password" value={this.state.formData.password !== undefined ? this.state.formData.password : ''} onChange={(e) => this.setState({formData:{...this.state.formData, password: e.target.value}})} />
                            </CInputGroup>
                            <CInputGroup>
                                <CInputGroupPrepend>
                                <CInputGroupText>
                                    <CIcon name="cil-lock-locked" />
                                </CInputGroupText>
                                </CInputGroupPrepend>
                                <CInput type="password" placeholder="Repeat password" autoComplete="new-password" value={this.state.formData.confirmPassword} onChange={(e) => this.validatePassword(e)} />
                            </CInputGroup>
                            <CFormText className="help-block mb-3" color={this.state.confirmPasswordTextColor}>{this.state.confirmPasswordText} </CFormText>
                            <CButton onClick={this.handleRegister}
                                onMouseEnter={() => this.setState({buttonBgColor: colors.themeGreen})} 
                                onMouseLeave={() => this.setState({buttonBgColor: colors.themeDark})}  
                                style={{backgroundColor: this.state.buttonBgColor, fontWeight:'bold', width:'100%',marginTop:'20px',color:colors.white,radius:'0.5em' }}
                                block
                            >
                            Create Account</CButton>
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

export default Register;