import React, {Suspense} from 'react'
import {
    Redirect,
    // Route,
    Switch
  } from 'react-router-dom'
import { CContainer, CFade } from '@coreui/react'
import routes from '../routes.js'

const loading = (
    <div className="pt-3 text-center">
      <div className="sk-spinner sk-spinner-pulse"></div>
    </div>
  )
  

class Content extends React.Component{
    constructor(props){
        super(props);
        this.state = {

        }
    }

    render(){
        return(
            <main className="c-main">
                <CContainer fluid>
                    <Suspense fallback={loading}>
                    <Switch>
                        {routes.map((route, idx) => {
                        return route.component && (
                            <route.route
                            key={idx}
                            path={route.path}
                            exact={route.exact}
                            name={route.name}
                            component={route.component}
                            render={props => (
                                <CFade>
                                <route.component {...props} />
                                </CFade>
                            )} />
                        )
                        })}
                        <Redirect from="/" to="/dashboard" />
                    </Switch>
                    </Suspense>
                </CContainer>
            </main>
        )
    }
}

export default Content;