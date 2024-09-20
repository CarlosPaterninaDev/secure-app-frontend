import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonList,
  IonItem,
  IonButton,
  IonGrid,
  IonLabel,
  IonListHeader,
  IonAvatar,
  IonItemDivider,
  IonIcon,
  AlertController,
} from '@ionic/angular/standalone';
import { HashingService } from './hashing.service';
import { addIcons } from 'ionicons';
import { documentLockOutline } from 'ionicons/icons';
import { catchError } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hashing',
  templateUrl: './hashing.page.html',
  styleUrls: ['./hashing.page.scss'],
  standalone: true,
  imports: [
    IonIcon,
    IonItemDivider,
    IonAvatar,
    IonListHeader,
    IonLabel,
    IonGrid,
    IonButton,
    IonItem,
    IonList,
    IonButtons,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonMenuButton,
  ],
})
export class HashingPage {
  hashingService = inject(HashingService);
  alertController = inject(AlertController);
  router = inject(Router);

  user$ = this.hashingService.findAll().pipe(
    catchError((err) => {
      this.alertController
        .create({
          header: 'Action failed',
          message: 'Please login and try again later',
          buttons: ['OK'],
        })
        .then((alert) => {
          alert.present();
          this.router.navigate(['/login']);
        });
      return [];
    })
  );

  constructor() {
    addIcons({ documentLockOutline });
  }

  downloadFile() {
    this.hashingService.generateFileWithUsers().subscribe((response: any) => {
      const blob = new Blob([response], { type: 'text/plain' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'hash-users.txt';
      link.click();
      window.URL.revokeObjectURL(url);
    });
  }
}
