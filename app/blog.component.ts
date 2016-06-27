import {Component} from 'angular2/core'
import {RouteParams, Router} from 'angular2/router'
import {ApiService} from './api.service'
import {LoadingComponent} from './loading.component'
import {TitleService} from './title.service'

@Component({
    templateUrl: 'resources/templates/blog.html',
    directives: [LoadingComponent]
})
export class BlogComponent {

    private postSlug: String;
    private post = null;

    /**
     * Constructs a BlogComponent instance
     * @param title
     * @param api
     * @param router
     * @param routeParams
     */
    constructor(
        private title: TitleService,
        private api: ApiService,
        private router: Router,
        routeParams: RouteParams
    ) {
        this.postSlug = routeParams.get('id');
    }

    /**
     * Sets up component after angular is done initialising
     */
    ngOnInit() {
        this.title.set('Blog');

        //Request a blog post from the server
        this.api.getEntity('Posts', this.postSlug).subscribe(
            data => {
                this.post = data;
                this.post.posted = Date.parse(this.post.posted);

                this.title.set(this.post.title);
            },
            error => {
                this.router.navigate(['404']);
            }
        );
    }
}