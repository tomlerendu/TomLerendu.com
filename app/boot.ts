import 'es6-shim/es6-shim.min.js';
import 'systemjs/dist/system-polyfills.js';
import 'angular2/bundles/angular2-polyfills.js';

import {bootstrap}    from 'angular2/platform/browser'
import {enableProdMode} from 'angular2/core';
import {ROUTER_PROVIDERS, ROUTER_DIRECTIVES} from 'angular2/router'
import {HTTP_PROVIDERS} from 'angular2/http'
import {AppComponent} from './app.component'
import {ApiService} from  './api.service'
import {TitleService} from './title.service'
import {Environment} from '../environment';

if (Environment.mode == 'production') {
    enableProdMode();
}

bootstrap(AppComponent, [
    HTTP_PROVIDERS,
    ROUTER_PROVIDERS,
    ROUTER_DIRECTIVES,
    ApiService,
    TitleService
]);