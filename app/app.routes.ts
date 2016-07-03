import {provideRouter, RouterConfig}  from '@angular/router';
import {AboutComponent} from "./about.component";
import {ProjectsComponent} from "./projects.component";
import {ProjectComponent} from "./project.component";
import {BlogsComponent} from "./blogs.component";
import {BlogComponent} from "./blog.component";
import {ContactComponent} from "./contact.component";
import {NotFoundComponent} from "./notfound.component";

const routes: RouterConfig = [
    {
        path:'',
        component: AboutComponent
    },
    {
        path:'projects',
        component: ProjectsComponent
    },
    {
        path:'projects/:id',
        component: ProjectComponent
    },
    {
        path:'blogs',
        component: BlogsComponent
    },
    {
        path:'blogs/:id',
        component: BlogComponent
    },
    {
        path:'contact',
        component: ContactComponent
    },
    {
        path:'**',
        component: NotFoundComponent
    },
];

export const APP_ROUTER_PROVIDERS = [
    provideRouter(routes)
];