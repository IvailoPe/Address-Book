import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { catchError, throwError } from 'rxjs';

// Проверяваме дали на някои път ще ни върне 401 код ще не трябва да се намираме на него и след това разлогваме потребителя
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router); 
  const authService = inject(AuthService);
  
  return next(req).pipe(
    catchError((error) => {
      if (error.status === 401) {
        authService.unLogUser();
        router.navigate(['/login']);
      }

      return throwError(() => error);
    })
  );

};
