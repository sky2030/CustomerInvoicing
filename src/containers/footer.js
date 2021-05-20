import React from 'react'
import {CFooter} from '@coreui/react'
class Footer extends React.Component{
    constructor(props){
        super(props);
        this.state = {

        }
    }

    render(){
        return(
            // <div>Footer</div>
            <CFooter fixed={false}>
                <div>
                    {/* <a href="https://coreui.io" target="_blank" rel="noopener noreferrer">CoreUI</a> */}
                    <span className="ml-1">Footer</span>
                </div>
                <div className="mfs-auto">
                    {/* <span className="mr-1">Powered by</span> */}
                    {/* <a href="https://coreui.io/react" target="_blank" rel="noopener noreferrer">CoreUI for React</a> */}
                </div>
            </CFooter>
        )
    }
}

export default Footer;