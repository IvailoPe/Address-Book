import { ApplicationConfig, provideZoneChangeDetection,importProvidersFrom  } from '@angular/core';
import { provideRouter } from '@angular/router';
import { HttpClientModule, withInterceptors, provideHttpClient } from '@angular/common/http';


import { routes } from './app.routes';
import { authInterceptor } from './auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes),importProvidersFrom(HttpClientModule),provideHttpClient(withInterceptors([authInterceptor]))]
};
