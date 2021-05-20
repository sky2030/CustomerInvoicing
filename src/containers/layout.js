import React from 'react'
import { Header, Footer, Content, Sidebar } from './index.js'


class Layout extends React.Component{
    constructor(props){
        super(props);
        this.state = {

        }
    }
    componentDidMount(){
       
    }

    render(){
        return(
            <div className="c-app c-default-layout">
                <Sidebar/>
                <div className="c-wrapper">
                    <Header/>
                    <div className="c-body">
                        <Content/>
                    </div>
                    <Footer/>
                </div>
            </div>
        )
    }
}

export default Layout;