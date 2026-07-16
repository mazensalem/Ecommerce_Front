import { HttpHeaders, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AdminsService } from '../services/admins.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const _adminService = inject(AdminsService);
  const token = _adminService.getToken();
  if (token) {
    const reReq = req.clone({ headers: new HttpHeaders({Authorization: `Barear ${token}`}) });
    return next(reReq);
  }
  return next(req);
};
