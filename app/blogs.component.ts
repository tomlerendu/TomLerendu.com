import {Component} from '@angular/core'
import {ROUTER_DIRECTIVES} from "@angular/router"
import {ApiService} from './api.service'
import {LoadingComponent} from './loading.component'
import {TitleService} from "./title.service";

@Component({
    templateUrl: 'resources/templates/blogs.html',
    directives: [LoadingComponent, ROUTER_DIRECTIVES]
})
export class BlogsComponent {

    private posts = null;

    /**
     * Constructs an instance of BlogsComponent
     * @param title
     * @param api
     */
    public constructor(private title: TitleService, private api: ApiService) {

    }

    /**
     * Sets up the component once angular is ready
     */
    public ngOnInit() {
        this.title.set('Blog');

        this.api.getCollection('Posts', 0, 30, 'Posted', false).subscribe(data => {
            this.posts = data.rows;
        });
    }
}