import {Component} from 'angular2/core'
import {RouteConfig, ROUTER_DIRECTIVES, Location, Router, Instruction} from 'angular2/router'
import {AboutComponent} from './about.component'
import {ContactComponent} from './contact.component'
import {ProjectsComponent} from './projects.component'
import {ProjectComponent} from './project.component'
import {BlogsComponent} from './blogs.component'
import {BlogComponent} from './blog.component'
import {NotFoundComponent} from './notfound.component'

@Component({
    selector: 'app',
    templateUrl: 'resources/templates/layout.html',
    directives: [ROUTER_DIRECTIVES]
})
@RouteConfig([
    {path:'/', name: 'Home', component: AboutComponent},
    {path:'/projects', name: 'Projects', component: ProjectsComponent},
    {path:'/projects/:id', name: 'Project', component: ProjectComponent},
    {path:'/blogs', name: 'Blogs', component: BlogsComponent},
    {path:'/blogs/:id', name: 'Blog', component: BlogComponent},
    {path:'/contact', name: 'Contact', component: ContactComponent},
    {path:'/404', name: '404', component: NotFoundComponent},
])
export class AppComponent {

    /**
     * Creates a AppComponent instance
     * @param router
     * @param location
     */
    public constructor(
        private router: Router,
        private location: Location
    ) {
        this.setupNotFound();
    }

    /**
     * Adds a listener to navigate to a 404 page if the page requested is not found
     */
    private setupNotFound() {

        //Angular2 doesn't support a good 404 pattern yet so use a hack from
        //http://stackoverflow.com/questions/34227194/handling-404-with-angular2

        this.router.recognize(this.location.path()).then((instruction: Instruction) => {
            // If this location path is not recognised we receive a null Instruction
            if (!instruction) {
                // Look up the 404 route instruction
                this.router.recognize('/404').then((instruction: Instruction) => {
                    // And navigate to it using navigateByInstruction
                    // 2nd param set to true to keep the page location (typical 404 behaviour)
                    // or set to false to 'redirect' the user to the /404 page
                    this.router.navigateByInstruction(instruction, true);
                });
            }
        });
    }

    /**
     * Determines if a certain page is currently active
     * @param route The route name (same as the rotue config annotation ones)
     * @returns {boolean} True if the route is active, false if not
     */
    private isRouteActive(route: String): Boolean {

        let path = this.location.path().split('/');

        if(
            //If there is no path and homepage is passed as route
            path.length == 1 && route == ''
            //or if the path segment matches the route
            || path[1] == route
        ) {
            return true;
        } else {
            return false;
        }
    }
}