import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Environment} from '../environment';
import 'rxjs/add/operator/map';

export class ApiService {

    private apiRoot = Environment.apiUrl;
    private apiToken = Environment.apiToken;

    /**
     * Constructs a ApiService instance.
     *
     * @param http
     */
    constructor(@Injectable private http: Http) {

    }

    /**
     * Generates the API url from a resource and set of params.
     *
     * @param resource The resource to request
     * @param params The GET paramaters for the request
     * @returns {string} The full URL for the request
     */
    private apiResource(resource: String, params?: [String, String]): String {

        //Create an empty params map if required
        if(params == null) {
            params = [];
        }

        params['access_token'] = this.apiToken;
        let queryString = this.queryString(params);

        return `${this.apiRoot}/api/1/${resource}?${queryString}`;
    }

    /**
     * Generates a query string from a map of keys and values.
     *
     * @param params The parameters to convert into a query string in the format [Key (string): Value (string)]
     * @returns {string} The query string
     */
    private queryString(params: [String, String]): String {
        let queryString = [];

        for(let paramKey in params) {
            let paramValue = params[paramKey];
            queryString.push(encodeURIComponent(paramKey) + '=' + encodeURIComponent(paramValue));
        }

        return queryString.join('&');
    }

    /**
     * Posts a contact form submission to the server.
     *
     * @param name The name POST param
     * @param email The email POST param
     * @param message The message POST param
     * @returns {Observable<R>} An observable for the POST request
     */
    public postContact(name: String, email: String, message: String) {
        let resource = this.apiResource(`tables/Messages/rows`);

        let postBody = JSON.stringify({
            active: 2,
            email: email,
            message: message,
            name: name
        });

        return this.http
            .post(resource, postBody)
            .map((res:Response) => res.json())
    }


    /**
     * Fetches a collection of data from the server.
     *
     * @param collection The collection to fetch
     * @param page The page to start on
     * @param perPage How many results there are per page
     * @param sort The sort column
     * @param sortAsc If the sort should be ascending (true or false)
     * @returns {Observable<R>} An observable for the GET request
     */
    public getCollection(collection: String, page: Number, perPage: Number, sort = null, sortAsc = true) {

        let params = {
            perPage: perPage,
            currentPage: page,
            active: 1
        };

        if(sort !== null) {
            params['sort'] = sort;
            params['sort_order'] = sortAsc ? 'ASC' : 'DESC';
        }

        let resource = this.apiResource(`tables/${collection}/rows`, params);

        return this.http
            .get(resource)
            .map((res:Response) => res.json())
    }

    /**
     * Retrieves a single entity from the server by its "slug".
     *
     * @param collection The collection the entity is in
     * @param name The entities slug
     * @returns {Observable<R>} An observable for the GET request
     */
    public getEntity(collection: String, name: String) {
        return this.http
            .get(this.apiResource(`tables/${collection}/rows/slug/${name}`))
            .map((res: Response) => res.json());
    }
}