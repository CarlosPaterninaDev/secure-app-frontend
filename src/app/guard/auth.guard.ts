import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';

export const authGuard: CanActivateFn = async (route, state) => {
  const storage = inject(Storage);
  const router = inject(Router);

  const token = await storage.get('token');

  if (token) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};
