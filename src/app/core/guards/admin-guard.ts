import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AdminsService } from '../services/admins.service';

export const adminGuard: CanActivateFn = (route, state) => {
  const _adminService = inject(AdminsService);
  const _router = inject(Router);
  if (_adminService.getUser()?.role == 'admin'){
    return true;
  }
  _router.navigate(['/admin/login']);
  return false;
};
