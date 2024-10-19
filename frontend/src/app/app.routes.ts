import { Routes } from '@angular/router';
import { UserPostComponent } from './components/user-post/user-post.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './components/login/login.component';

export const routes: Routes = [
    {
        path: '',
        component: LoginComponent
    },
    {
        path:'create_post',
        loadComponent: ()=>import('./components/create-post/create-post.component').then(m=>m.CreatePostComponent),
        canActivate: [AuthGuard]
    },
    {
        path:'user_post',
        loadComponent: ()=>import('./components/user-post/user-post.component').then(m=>m.UserPostComponent),
        canActivate: [AuthGuard]
    },
    {
        path:'edit_user_profile',
        loadComponent:()=>import('./components/edit-user-profile/edit-user-profile.component').then(m=>m.EditUserProfileComponent),
        canActivate: [AuthGuard]
    },
    {
        path:'login',
        loadComponent:()=>import('./components/login/login.component').then(m=>m.LoginComponent)
    },
    {
        path:'signup',
        loadComponent:()=>import('./components/signup/signup.component').then(m=>m.SignupComponent)
    }
];
