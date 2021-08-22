/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React , {Component} from 'react';
import { Router } from 'react-native-router-flux';
import Routers from './src/Routers';

export default class App extends Component {
  render () {
    return (
      <Routers></Routers>
    )
  }
}
