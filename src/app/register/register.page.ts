import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  AlertController,
  IonItem,
  IonGrid,
  IonButton,
  IonItemDivider,
  IonLabel,
  IonInputPasswordToggle,
  IonInput,
} from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { passwordValidator } from '../shared/password.validator';
import { emailValidator } from '../shared/email.validator';
import { RegisterService } from './register.service';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [
    IonLabel,
    IonItemDivider,
    IonButton,
    IonGrid,
    IonItem,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    IonInputPasswordToggle,
    IonInput,
    ReactiveFormsModule,
  ],
})
export class RegisterPage implements OnInit {
  fb = inject(FormBuilder);
  registerService = inject(RegisterService);
  alertController = inject(AlertController);
  router = inject(Router);
  store = inject(Storage);

  form: FormGroup = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(1)]],
    firstName: ['', [Validators.required, Validators.minLength(1)]],
    lastName: ['', [Validators.required, Validators.minLength(1)]],
    email: ['', [Validators.required, emailValidator()]],
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

    this.registerService.register(this.form.value).subscribe(
      (response: any) => {
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
            this.router.navigate(['/home']);
          });
      },
      (error) => {
        this.alertController
          .create({
            header: 'Error',
            message: 'Login failed',
            subHeader: error.error.message,
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

  onLogin() {
    this.router.navigate(['/login']);
  }
}
