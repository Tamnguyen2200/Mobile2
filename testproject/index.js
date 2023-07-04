/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/App';
import clockApp from './src/clockApp';
import {name as appName} from './app.json';
import VIN from './src/VIN';

AppRegistry.registerComponent(appName, () => VIN);
