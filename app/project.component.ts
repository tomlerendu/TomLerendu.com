import {Component} from 'angular2/core'
import {Router} from 'angular2/router'
import {RouteParams} from 'angular2/router'
import {TitleService} from './title.service'
import {ApiService} from './api.service'
import {Helpers} from './helpers';

@Component({
    selector: 'projects',
    templateUrl: 'resources/templates/project.html'
})
export class ProjectComponent {

    private helpers = Helpers;

    private projectSlug: String;
    private project = null;

    /**
     * Constructs a ProjectComponent instance
     * @param api
     * @param router
     * @param routeParams
     * @param title
     */
    public constructor(
        private api: ApiService,
        private router: Router,
        private routeParams: RouteParams,
        private title: TitleService
    ) {
        this.projectSlug = routeParams.get('id');
    }

    /**
     * Sets up the component once angular is ready
     */
    public ngOnInit() {
        this.title.set('Project');

        //Fetch the project from the server
        this.api.getEntity('Projects', this.projectSlug).subscribe(
            data => {
                this.project = data;
                this.project.languages = Helpers.formatTags(this.project.languages);
                this.project.frameworks = Helpers.formatTags(this.project.frameworks);

                this.title.set(this.project.name);
            },
            error => {
                //If the project doesnt exist go to the 404 page
                this.router.navigate(['404']);
            }
        );
    }
}