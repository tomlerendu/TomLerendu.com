import {Component} from '@angular/core'
import {Router} from '@angular/router'
import {ActivatedRoute} from '@angular/router'
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
     * @param route
     * @param title
     */
    public constructor(
        private api: ApiService,
        private router: Router,
        private route: ActivatedRoute,
        private title: TitleService
    ) {
        this.projectSlug = route.snapshot.params['id'];
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