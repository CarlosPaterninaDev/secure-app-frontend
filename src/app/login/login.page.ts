import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonGrid,
  IonButton,
  IonCardContent,
  IonCardHeader,
  IonCard,
  IonItem,
  IonInput,
  IonLabel,
  IonCardTitle,
  IonInputPasswordToggle,
  IonItemDivider,
  IonRow,
  AlertController,
} from '@ionic/angular/standalone';
import { LoginService } from './login.service';
import { Router } from '@angular/router';
import { passwordValidator } from '../shared/password.validator';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    IonRow,
    IonItemDivider,
    IonCardTitle,
    IonLabel,
    IonInput,
    IonItem,
    IonCardHeader,
    IonCardContent,
    IonButton,
    IonGrid,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonCard,
    IonInputPasswordToggle,
    ReactiveFormsModule,
  ],
  // providers: [Storage],
})
export class LoginPage implements OnInit {
  fb = inject(FormBuilder);
  loginService = inject(LoginService);
  alertController = inject(AlertController);
  router = inject(Router);
  store = inject(Storage);

  form: FormGroup = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(1)]],
    password: ['', [Validators.required, passwordValidator()]],
  });

  async ngOnInit(): Promise<void> {
    const isAuth = await this.store.get('token');

    if (isAuth) {
      this.router.navigate(['/home']);
    }
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loginService.login(this.form.value).subscribe(
      (response) => {
        this.alertController
          .create({
            header: 'Success',
            message: 'Login successful',
            buttons: ['OK'],
          })
          .then(async (alert) => {

            await this.store.set('token', response.token);
            await this.store.set('user', response);
            await alert.present();
            this.router.navigate(['/home']);
          });
      },
      (error) => {
        this.alertController
          .create({
            header: 'Error',
            message: 'Login failed',
            buttons: ['OK'],
          })
          .then((alert) => {
            alert.present();
          });
      }
    );
  }

  get passwordErrors() {
    const errors = this.form.get('password')?.errors;
    return errors ? Object.values(errors).join(', ') : null;
  }

  onRegister() {
    this.router.navigate(['/register']);
  }
}
