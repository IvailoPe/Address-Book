import { Routes } from '@angular/router';
import { HomeWrapperComponent } from './components/home-folder/home-wrapper/home-wrapper.component';
import { authGuard, authGuardLogorReg } from './auth.guard';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { UploadComponent } from './components/upload/upload.component';
import { ContactComponent } from './components/contact/contact.component';
import { ContactEditComponent } from './components/contact-edit/contact-edit.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ProfileEditComponent } from './components/profile-edit/profile-edit.component';
import { FilterComponent } from './components/filter/filter.component';

// Всички пътища на приложението
export const routes: Routes = [
    {path:"home",canActivate:[authGuard],title:"Home", component:HomeWrapperComponent},
    {path:"upload",canActivate:[authGuard],title:"Upload", component:UploadComponent},
    {path:"contact/:id",canActivate:[authGuard],title:"Contact", component:ContactComponent},
    {path:"contact/edit/:id",canActivate:[authGuard],title:"Contact-Edit", component:ContactEditComponent},
    {path:"contacts/filter",canActivate:[authGuard],title:"Contact-Filter",component:FilterComponent},
    {path:"profile",canActivate:[authGuard],title:"Profile",component:ProfileComponent},
    {path:"profile/edit",canActivate:[authGuard],title:"Profile-Edit",component:ProfileEditComponent},
    {path:"login", canActivate:[authGuardLogorReg], title:"Login", component:LoginComponent},
    {path:"register", canActivate:[authGuardLogorReg], title:"Register",component:RegisterComponent},
    {path: '**', redirectTo:'/home', pathMatch: 'full' }
];
