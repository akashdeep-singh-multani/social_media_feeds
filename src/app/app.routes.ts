import { Routes } from '@angular/router';
import { UserPostComponent } from './components/user-post/user-post.component';

export const routes: Routes = [
    {
        path: '**',
        component: UserPostComponent
    }
];
