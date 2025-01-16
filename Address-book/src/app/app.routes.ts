import { Routes } from '@angular/router';
import { HomeWrapperComponent } from './components/home-folder/home-wrapper/home-wrapper.component';
import { authGuard, authGuardLogorReg } from './auth.guard';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { UploadComponent } from './components/upload/upload.component';

export const routes: Routes = [
    {path:"home",canActivate:[authGuard], component:HomeWrapperComponent},
    {path:"upload",canActivate:[authGuard], component:UploadComponent},
    {path:"login", canActivate:[authGuardLogorReg],  component:LoginComponent},
    {path:"register", canActivate:[authGuardLogorReg], component:RegisterComponent}
];
