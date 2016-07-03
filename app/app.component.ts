import {Component} from '@angular/core'
import {ROUTER_DIRECTIVES, Router, ActivatedRoute} from '@angular/router'

@Component({
    selector: 'app',
    templateUrl: 'resources/templates/layout.html',
    directives: [ROUTER_DIRECTIVES]
})
export class AppComponent {

    /**
     * Creates a AppComponent instance
     * @param router
     * @param route
     */
    public constructor(
        private router: Router,
        private route: ActivatedRoute
    ) {

    }
}