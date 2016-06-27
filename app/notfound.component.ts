import {Component} from 'angular2/core'
import {TitleService} from "./title.service";

@Component({
    templateUrl: 'resources/templates/notfound.html'
})
export class NotFoundComponent {

    /**
     * Construct a NotFoundComponent instance
     * @param title
     */
    public constructor(private title: TitleService) {

    }

    /**
     * Sets up the component once angular is ready
     */
    public ngOnInit() {
        this.title.set('404');
    }
}