import {Component} from 'angular2/core'
import {ROUTER_DIRECTIVES} from 'angular2/router'
import {TitleService} from './title.service'
import {ApiService} from './api.service'
import {Helpers} from './helpers'

@Component({
    templateUrl: 'resources/templates/about.html',
    directives: [ROUTER_DIRECTIVES]
})
export class AboutComponent {

    private helpers = Helpers;

    private lifeEvents = null;
    private posts = null;
    private projects = null;

    /**
     * Constructs an AboutComponent instance
     * @param api
     * @param title
     */
    constructor(private api: ApiService, private title: TitleService) {

    }

    /**
     * Sets up the object once angular is ready
     */
    ngOnInit() {

        this.api.getCollection('LifeEvents', 0, 100, 'StartDate', false).subscribe(data => {
            this.lifeEvents = data.rows;
        });

        this.api.getCollection('Posts', 0, 3, 'Posted', false).subscribe(data => {
            this.posts = data.rows;
        });

        this.api.getCollection('Projects', 0, 4, 'displayIndex', true).subscribe(data => {
            this.projects = data.rows;
        });
        
        this.title.setBlank();
    }

    /**
     * Parses a date for a post
     * @param post The post which has the date
     * @returns {Date} The parsed date
     */
    public dateForPost(post) {
        if(typeof post['posted'] !== undefined) {
            return Date.parse(post['posted']);
        }

        return new Date();
    }
}