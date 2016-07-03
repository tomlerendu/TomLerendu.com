import {Title} from '@angular/platform-browser'
import {Injectable} from '@angular/core'

@Injectable()
export class TitleService {

    private title;

    /**
     * Creates an instance of title service
     */
    public constructor() {
        //No need to inject title as TitleService is already a singleton
        this.title = new Title();
    }

    /**
     * Sets the browsers title bar
     * @param title The title to be set
     */
    public set(title: String) {
        this.title.setTitle(title + ' - Tom Lerendu');
    }

    /**
     * Sets the browsers title bar to just the website name
     */
    public setBlank() {
        this.title.setTitle('Tom Lerendu');
    }
}