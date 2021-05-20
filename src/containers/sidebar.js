import React from 'react'
import logo from '../assets/logo/ChillLogo.png'
import icon from '../assets/icons/ChillIcon.png'
import {
    CCreateElement,
    CSidebar,
    CSidebarBrand,
    CSidebarNav,
    CSidebarNavDivider,
    CSidebarNavTitle,
    CSidebarMinimizer,
    CSidebarNavDropdown,
    CSidebarNavItem,
  } from '@coreui/react'
// import CIcon from '@coreui/icons-react' 
// import { freeSet } from '@coreui/icons'
import navigation from './_nav.js'  
import Colors from '../config/Colors.js'
// import _nav from './_nav.js';

class Sidebar extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            show: true,
            navigation: true,
            hover: false,
            minimize: true
        }
        // const navBarStyle = {
        //     background: this.state.hover ? '#2ebeba' : '#ffff00'
        // }
        
    }

    render(){
        return(
            // <div>Sidebar</div>
            <CSidebar className='c-sidebar-sm'
            show={this.state.show} style={{backgroundColor: Colors.themeDark}}  onMinimizeChange={(event) => this.setState({minimize: event})}
            >
            <CSidebarBrand className="d-md-down-none" to="/">
                {/* <CIcon
                className="c-sidebar-brand-full"
                name="logo-negative"
                height={35}
                />
                <CIcon
                className="c-sidebar-brand-minimized"
                name="sygnet"
                height={35}
                /> */}
                <div>
                    {
                        this.state.minimize?
                        <img alt='Logo' src={logo} style={{height: 40, width:130}}/>
                        :<div>
                            <img alt='Logo' src={icon} style={{height: 30, width:30}}/>
                        </div>
                    }
                </div>

            </CSidebarBrand>
            <CSidebarNav>

                <CCreateElement
                items={navigation}
                components={{
                    CSidebarNavDivider,
                    CSidebarNavDropdown,
                    CSidebarNavItem,
                    CSidebarNavTitle
                }}
                />
            </CSidebarNav>
            <CSidebarMinimizer className="c-d-md-down-none"/>
        </CSidebar>
        )
    }

}

export default React.memo(Sidebar);