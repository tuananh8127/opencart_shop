import React , {Component} from 'react';
import {Root} from 'native-base';
import { Scene, Router, Actions } from 'react-native-router-flux';
import Home from './common/Home';


export default class Routers extends Component {
    render () {
        return (

            <Root>
                <Router>
                    <Scene key="root" hideNavBar={true}>
                        <Scene key="Home" component={Home} title="Home" initial={true} />
                    </Scene>
                </Router>
            </Root>

        )
    }
}

