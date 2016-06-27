import {Component} from 'angular2/core'
import {ApiService} from './api.service'
import {Helpers} from './helpers'
import {LoadingComponent} from './loading.component'
import {ROUTER_DIRECTIVES} from "angular2/router"
import {TitleService} from './title.service';

@Component({
    selector: 'projects',
    templateUrl: 'resources/templates/projects.html',
    directives: [LoadingComponent, ROUTER_DIRECTIVES]
})
export class ProjectsComponent {

    private helpers = Helpers;

    private languageTags = [];
    private frameworkTags = [];
    private filter = null;

    private projects = null;
    private projectsFiltered = null;

    /**
     * Creates a ProjectsComponent instance
     * @param title
     * @param api
     */
    constructor(private title: TitleService, private api: ApiService) {

    }

    /**
     * Sets up the component once angular is ready
     */
    ngOnInit() {
        this.title.set('Projects');

        //Request a list of projects from the server
        this.api.getCollection('Projects', 0, 100, 'displayIndex', true).subscribe(data => {
            this.projects = data.rows;
            this.projectsFiltered = data.rows;
            this.languageTags = this.generateTags(data.rows, 'languages');
            this.frameworkTags = this.generateTags(data.rows, 'frameworks');
        });
    }

    /**
     * Toggles a tag filter on or off
     * @param tag The tag to toggle
     */
    public toggleFilter(tag: String) {
        //If the filter is already on cleat it
        if(this.filter == tag) {
            this.clearFilter();
        } else {
            this.setFilter(tag);
        }
    }

    /**
     * Filters the projects by a tag
     * @param tag The tag to filter by
     */
    private setFilter(tag: String) {
        this.filter = tag;

        let projectsFiltered = [];

        //Go through each project
        for(let project in this.projects) {
            //Concat the language and framework tags together
            let projectTags = Helpers.formatTags(this.projects[project]['languages']).concat(
                Helpers.formatTags(this.projects[project]['frameworks'])
            );

            //Look at each tag
            for(let i=0; i<projectTags.length; i++) {
                //If the project has the required tag add it to the filtered project list
                if (projectTags[i] === tag) {
                    projectsFiltered.push(this.projects[project]);
                    break;
                }
            }
        }

        this.projectsFiltered = projectsFiltered;
    }

    /**
     * Removes the currently filtered tag
     */
    public clearFilter() {
        this.filter = null;
        this.projectsFiltered = this.projects;
    }

    /**
     * Determines if the projects are currently being filtered by a specific tag
     * @param tag The tag to check
     * @returns {boolean} True if the projects are filtered by the tag
     */
    public isFiltered(tag: String): Boolean {
        return this.filter === tag;
    }

    /**
     * Creates a single list of tags for an array of projects
     * @param projects An array of projects
     * @param tagKey The key of the tag array in each project
     * @returns {array} A list of tags, ordered by must popular
     */
    private generateTags(projects: [String, any], tagKey: String): [String] {
        let tags = [];

        //For each project
        for(let project in projects) {
            if (projects.hasOwnProperty(project)) {
                let projectTags = Helpers.formatTags(projects[project][tagKey]);

                //For each tag in project
                for(let i=0; i<projectTags.length; i++) {

                    let projectTag = projectTags[i];
                    var tagIndex = tags.map(e => { return e.tag }).indexOf(projectTag);

                    if(tagIndex === -1) {
                        //If the tag doesnt exist create it
                        tags.push({
                            tag: projectTag,
                            count: 1
                        })
                    } else {
                        tags[tagIndex].count += 1;
                    }
                }
            }
        }

        //Sort objects so the most popular tags are at the top
        tags.sort( (a, b) => {
            if(a.count < b.count) {
                return 1
            } else if (b.count < a.count) {
                return -1;
            } else {
                return 0;
            }
        });

        return tags.map(e => { return e.tag });
    }
}