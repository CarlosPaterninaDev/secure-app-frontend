import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import {
  IonApp,
  IonSplitPane,
  IonMenu,
  IonContent,
  IonList,
  IonListHeader,
  IonNote,
  IonMenuToggle,
  IonItem,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonRouterLink,
  IonTitle,
  IonHeader,
  IonToolbar,
  AlertController,
  IonButton,
  IonCard,
  IonCardSubtitle,
  IonCardTitle,
  IonCardHeader,
} from '@ionic/angular/standalone';

import { people, logOut, trailSign } from 'ionicons/icons';
import { Storage } from '@ionic/storage-angular';
import { User } from './hashing/hashing.service';
import { addIcons } from 'ionicons';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCard,
    IonButton,
    IonToolbar,
    IonHeader,
    IonTitle,
    RouterLink,
    RouterLinkActive,
    CommonModule,
    IonApp,
    IonSplitPane,
    IonMenu,
    IonContent,
    IonList,
    IonListHeader,
    IonNote,
    IonMenuToggle,
    IonItem,
    IonIcon,
    IonLabel,
    IonRouterLink,
    IonRouterOutlet,
  ],
})
export class HomePage implements OnInit {
  storage = inject(Storage);
  router = inject(Router);
  alert = inject(AlertController);
  userInfo: User = {
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    id: '',
    isActive: true,
  };

  public appPages = [
    {
      title: 'Hashing',
      url: 'hashing',
      icon: 'people',
      subtitle: 'Check hashes',
    },
    {
      title: 'Encryption',
      url: 'encryption',
      icon: 'trail-sign',
      subtitle: 'Encrypt and decrypt your files',
    },
  ];

  constructor() {
    addIcons({ people, logOut, trailSign });
  }

  async ngOnInit() {
    const user = await this.storage.get('user');

    if (user) {
      this.userInfo = user;
    }
  }

  logout() {
    this.alert
      .create({
        header: 'Logout',
        message: 'Are you sure you want to logout?',
        buttons: [
          {
            text: 'No',
            role: 'cancel',
          },
          {
            text: 'Yes',
            handler: () => {
              this.storage.remove('token').then(() => {
                this.router.navigate(['/login']);
              });
            },
          },
        ],
      })
      .then((alert) => {
        alert.present();
      });
  }
}
