import { Component, inject, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  template: `
    <ion-app>
      <ion-router-outlet></ion-router-outlet>
    </ion-app>
  `,
  standalone: true,
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent implements OnInit {
  router = inject(Router);
  constructor(private storage: Storage) {}

  async ngOnInit() {
    await this.storage.create();

    const isAuth = await this.storage.get('token');

    if (isAuth) {
      this.router.navigate(['/home']);
    }
  }
}
