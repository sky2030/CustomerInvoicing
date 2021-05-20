import { CCard, CContainer, CForm, CFormGroup, CInput, CRow, CButton, CCol, CSpinner } from '@coreui/react';
import React from 'react'
import logo from '../../../assets/logo/ChillLogo.png'
import loginApi from '../../../api/login'
import colors from '../../../config/Colors.js'
import {GoogleLogin} from 'react-google-login'
import { Link } from 'react-router-dom';

const googleClientId = '299863987952-k13plhava9fl7o30unnl16kkgf2rqat9.apps.googleusercontent.com'
 
class Login extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            loader:false,
            email: '',
            password: '',
            validPassword: true,
            emailValidator: true,
            buttonBgColor: colors.themeDark
        }
        this.handleLogin = this.handleLogin.bind(this)
        this.verifyEmail = this.verifyEmail.bind(this)
        this.handleGoogleLogin = this.handleGoogleLogin.bind(this)
        this.handleGoogleLoginFailure = this.handleGoogleLoginFailure.bind(this)
    }

    async componentDidMount(){

    }

    validateEmail(email){
        var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    };

    verifyEmail(event){
        console.log("Event", event.target.value)
        if(!this.validateEmail(event.target.value)){
            this.setState({emailValidator: false})
        } else {
            this.setState({emailValidator: true})
        }
    }

    validPassword(password){
        if(password.length >= 6 ){
            return true
        }
        return false
    }
    
    handleLogin(){
        console.log("Email:", this.state.email)
        console.log("Password:", this.state.password)
        this.setState({loader:true})
        // if(this.validPassword(this.state.password)){
            let data = JSON.stringify({"username":this.state.email,"password":this.state.password});
            let headers = {
                'Content-Type': 'application/json'
            }
            loginApi.post(data, null, headers).then((response) => {
                console.log("Response...", response)
                if(response.status === 200){
                    localStorage.setItem('token', response.data.value)
                    localStorage.setItem('userInfo', JSON.stringify(response.data))
                    this.setState({loader:false})
                    this.props.history.push('/')
                }
                console.log("Response...", response.data)
            }).catch((err) => {
                // console.log('Error', err.response.status)
                // if(err.response.status === 401)
                // {
                    alert('Username or password invalid')
                // }
                this.setState({loader:false})
            })
            // var data = JSON.stringify({"username":"jaymaheta","password":"admin"});
            // var config = {
            //     method: 'post',
            //     url: 'https://5efbffffa26d.ngrok.io/isem_customer-0.0.1-SNAPSHOT/iSEM/api/authenticate',
            //     headers: { 
            //       'Content-Type': 'application/json'
            //     },
            //     data : data
            //   };
              
            //   axios(config)
            //   .then(function (response) {
            //     console.log(JSON.stringify(response.data));
            //   })
            //   .catch(function (error) {
            //     console.log(error);
            //   });
        // } else {
        //     this.setState({validPassword: false})
        // }
    }

    handleGoogleLogin(response){
        console.log("Success", response)

    }

    handleGoogleLoginFailure(response){
        console.log("Failed...", response, googleClientId)
    }

    render(){
        return(
            <div className='c-app c-default-layout flex-row align-items-center'>
                <CContainer>
                    <CRow className="justify-content-center">
                        <CCol md='5'>
                        <CCard className='p-5'>
                            <img alt="Logo" src={logo} style={{height:70, width:200, alignSelf:'center'}}/>
                            {/* <h2 style={{alignSelf:'center', marginTop:30, fontWeight:'bold'}}>Check Out Wave - it's free!</h2>
                            <p style={{textAlign:'center', fontSize:16}} className="text-muted">Wave helps freelancers,consultants and small businesses around the world simplify their finance.</p> */}
                            <CRow className="justify-content-center" style={{marginTop:50}}>
                                <CCol md='9'>
                                    <CForm action="" method="post">
                                        <CFormGroup>
                                        {/* <CLabel htmlFor="nf-email">Email</CLabel> */}
                                        <CInput
                                            type="email"
                                            id="nf-email"
                                            name="nf-email"
                                            placeholder="Username"
                                            autoComplete="email"
                                            value={this.state.email}
                                            onChange={(e) => this.setState({email: e.target.value})}
                                            // onBlur={(e) =>  this.verifyEmail(e)}
                                        />
                                        <p className={`small help-block ${ this.state.emailValidator ? '': 'text-danger' }`}>{this.state.emailValidator?'': 'Email is not valid'}</p>
                                        {/* <CFormText className="help-block">Please enter your email</CFormText> */}
                                        </CFormGroup>
                                        <CFormGroup>
                                        {/* <CLabel htmlFor="nf-password">Password</CLabel> */}
                                        <CInput
                                            type="password"
                                            id="nf-password"
                                            name="nf-password"
                                            placeholder="Password"
                                            autoComplete="current-password"
                                            value={this.state.password}
                                            onChange={(e) => this.setState({password: e.target.value})}
                                        />
                                        {/* <p className={`small help-block ${ this.state.validPassword ? '': 'text-danger' }`}>At least 6 characters</p> */}
                                        </CFormGroup>
                                        <CButton shape='pill' 
                                        onClick={this.handleLogin} 
                                        disabled={this.state.loader}
                                        onMouseEnter={() => this.setState({buttonBgColor: colors.themeGreen})} 
                                        onMouseLeave={() => this.setState({buttonBgColor: colors.themeDark})} 
                                        style={{backgroundColor: this.state.buttonBgColor, fontWeight:'bold', width:'100%',marginTop:'20px',color:colors.white,radius:'0.5em' }}>
                                        {this.state.loader ? <CSpinner size="sm"></CSpinner>: '' } Get Started
                                        </CButton>
                                        <hr className="mt-4" />
                                    </CForm>
                                </CCol>
                                <div className="mt-3">
                                    <GoogleLogin
                                        clientId={googleClientId}
                                        buttonText="Sign in with google"
                                        cookiePolicy={'single_host_origin'}
                                        onSuccess={(res) => this.handleGoogleLogin(res)}
                                        onFailure={(res) => this.handleGoogleLoginFailure(res)}
                                        >
                                    </GoogleLogin>
                                </div>
                            </CRow>
                            <p style={{textAlign:'center', fontSize:14}} className="text-muted mt-4">Dont have account ? <Link to='/register'>Signup now</Link></p>
                        </CCard>
                        </CCol>
                    </CRow>
                </CContainer>
            </div>
        )
    }
}

export default Login;