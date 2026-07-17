import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AdminsService } from '../services/admins.service';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const _router = inject(Router);
  const _adminService = inject(AdminsService);

  return next(req).pipe(catchError(err => {
    if (err.status == 401){
      _adminService.logout();
      _router.navigate(['/login']);
    }else if (err.status == 404){
      // _router.navigate(['/notfound']);
      alert('something is not found');
    }else{
      alert('something went wrong');
    }
    return throwError(() => err);
  }));
  
};
