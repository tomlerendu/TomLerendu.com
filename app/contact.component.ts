import {Component} from '@angular/core'
import {ApiService} from './api.service'
import {TitleService} from "./title.service";

enum SendState {Waiting, Sending, Done}

@Component({
    templateUrl: 'resources/templates/contact.html'
})
export class ContactComponent {

    private sendState = SendState.Waiting;
    private contact = {
        name: null,
        email: null,
        message: null
    };

    /**
     * Constructs a ContactComponent instance
     * @param title
     * @param api
     */
    constructor(private title: TitleService, private api: ApiService) {

    }

    /**
     * Sets up the component once angular is ready
     */
    public ngOnInit() {
        this.title.set('Contact Me');
    }

    /**
     * Sends the contact form message back to the server
     */
    public send() {
        this.sendState = SendState.Sending;

        //Post the message to the server
        this.api.postContact(this.contact.name, this.contact.email, this.contact.message).subscribe(res => {
            this.sendState = SendState.Done;
        });
    }

    /**
     * Determines if the contact form should be shown
     * @returns {boolean} True if the form should be shown
     */
    public shouldDisplayForm() {
        return this.sendState == SendState.Waiting;
    }

    /**
     * Determines if the loading indicator should be shown
     * @returns {boolean} True if it should be
     */
    public shouldDisplayLoading() {
        return this.sendState == SendState.Sending;
    }

    /**
     * Determines if the done message should be shown
     * @returns {boolean} True if the message should be shown
     */
    public shouldDisplayDone() {
        return this.sendState == SendState.Done;
    }

    /**
     * Resets the contact form to the default state
     */
    public resetForm() {
        this.contact = {
            name: null,
            email: null,
            message: null
        };
        this.sendState = SendState.Waiting;
    }
}