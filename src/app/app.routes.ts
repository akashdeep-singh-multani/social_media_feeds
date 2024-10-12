import { Routes } from '@angular/router';
import { UserPostComponent } from './components/user-post/user-post.component';

export const routes: Routes = [
    {
        path: '',
        component: UserPostComponent
    },
    {
        path:'create_post',
        loadComponent: ()=>import('./components/create-post/create-post.component').then(m=>m.CreatePostComponent) 
    }
];
