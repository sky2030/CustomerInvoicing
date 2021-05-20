import React from 'react'
import {
    CHeader,
    CToggler,
    CHeaderBrand,
    CHeaderNav,
    CHeaderNavItem,
    CHeaderNavLink,
    CSelect,
    // CSubheader,
    // CBreadcrumbRouter,
    // CLink  
  } from '@coreui/react'
  import CIcon from '@coreui/icons-react'
  import { withTranslation } from 'react-i18next'; 
  import organizationsApi from '../api/organizations'
  // var axios = require('axios');

class Header extends React.Component{
    constructor(props){
        super(props);
        this.state = {
          userType :'',
          organizations: []
        }
    }

    handleLanguageChange(event){
      this.props.i18n.changeLanguage(event.target.value)
    }

    componentDidMount(){
      if(localStorage.getItem('userInfo') !== null){
        let userInfo = JSON.parse(localStorage.getItem('userInfo'))
        console.log("User Info..", userInfo.userType)
        organizationsApi.get().then((response) => {
          console.log("Response...", response)
        this.setState({organizations: response.data})
        }).catch((err) => {
            console.log("Error", err)
        })      
        this.setState({userType: userInfo.userType})
      }
    }

    render(){
        return(
            // <div>Header</div>
            <CHeader withSubheader>
      <CToggler
        inHeader
        className="ml-md-3 d-lg-none"
        // onClick={toggleSidebarMobile}
      />
      <CToggler
        inHeader
        className="ml-3 d-md-down-none"
        // onClick={toggleSidebar}
      />
      <CHeaderBrand className="mx-auto d-lg-none" to="/">
        <CIcon name="logo" height="48" alt="Logo"/>Hello
      </CHeaderBrand>

      <CHeaderNav className="d-md-down-none mr-auto">
        <CHeaderNavItem className="px-3" >
          <CHeaderNavLink to="/dashboard">{this.props.t('Header.Dashboard')}</CHeaderNavLink>
        </CHeaderNavItem>
        <CHeaderNavItem  className="px-3">
          <CHeaderNavLink to="/users">{this.props.t('Header.Users')}</CHeaderNavLink>
        </CHeaderNavItem>
        <CHeaderNavItem className="px-3">
          <CHeaderNavLink>{this.props.t('Header.Settings')}</CHeaderNavLink>
        </CHeaderNavItem>
        {
          this.state.userType === 'ADMIN'?  
          <CSelect>  
            {
              this.state.organizations.map(element => (
                <option>{element.name}</option>
              ))
            }

          </CSelect>
          :
          <div></div>
        }
      </CHeaderNav>

      <CHeaderNav className="px-5">
        {/* <TheHeaderDropdownNotif/>
        <TheHeaderDropdownTasks/>
        <TheHeaderDropdownMssg/>
        <TheHeaderDropdown/> */}
        <CSelect custom onChange={(event) => this.handleLanguageChange(event)} className='float right'>
          <option value="en">English</option>
          <option value="es">Spanish</option>
        </CSelect>
      </CHeaderNav>

      {/* <CSubheader className="px-3 justify-content-between">
        <CBreadcrumbRouter 
          className="border-0 c-subheader-nav m-0 px-0 px-md-3" 
        //   routes={routes} 
        />
          <div className="d-md-down-none mfe-2 c-subheader-nav">
            <CLink className="c-subheader-nav-link"href="#">
              <CIcon name="cil-speech" alt="Settings" />
            </CLink>
            <CLink 
              className="c-subheader-nav-link" 
              aria-current="page" 
              to="/dashboard"
            >
              <CIcon name="cil-graph" alt="Dashboard" />&nbsp;Dashboard
            </CLink>
            <CLink className="c-subheader-nav-link" href="#">
              <CIcon name="cil-settings" alt="Settings" />&nbsp;Settings
            </CLink>
          </div>
      </CSubheader> */}
    </CHeader>
        )
    }
}

export default withTranslation()(Header);