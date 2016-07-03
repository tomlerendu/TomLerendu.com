import 'core-js/client/shim.min'
import 'zone.js/dist/zone'
import 'reflect-metadata/Reflect.js'

import {bootstrap} from '@angular/platform-browser-dynamic'
import {enableProdMode} from '@angular/core';
import {ROUTER_DIRECTIVES} from '@angular/router'
import {HTTP_PROVIDERS} from '@angular/http'
import {AppComponent} from './app.component'
import {ApiService} from  './api.service'
import {TitleService} from './title.service'
import {Environment} from '../environment'
import {APP_ROUTER_PROVIDERS} from './app.routes'

if (Environment.mode == 'production') {
    enableProdMode();
}

bootstrap(AppComponent, [
    HTTP_PROVIDERS,
    APP_ROUTER_PROVIDERS,
    ROUTER_DIRECTIVES,
    ApiService,
    TitleService
]);