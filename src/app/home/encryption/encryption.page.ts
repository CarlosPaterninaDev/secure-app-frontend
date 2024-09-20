import { Component, inject, OnInit, signal } from '@angular/core';
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
  IonButtons,
  IonMenuButton,
  IonGrid,
  IonList,
  IonListHeader,
  IonLabel,
  IonItem,
  IonSegment,
  IonSegmentButton,
  IonInput,
  IonButton,
  IonItemDivider,
  AlertController,
  IonBadge,
} from '@ionic/angular/standalone';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-encryption',
  templateUrl: './encryption.page.html',
  styleUrls: ['./encryption.page.scss'],
  standalone: true,
  imports: [
    IonBadge,
    IonItemDivider,
    IonButton,
    IonInput,
    IonSegmentButton,
    IonSegment,
    IonItem,
    IonLabel,
    IonListHeader,
    IonList,
    IonGrid,
    IonButtons,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    ReactiveFormsModule,
    IonMenuButton,
  ],
})
export class EncryptionPage implements OnInit {
  fb = inject(FormBuilder);
  alertController = inject(AlertController);

  form: FormGroup = this.fb.group({
    secret: ['', Validators.required],
  });
  file!: File | undefined;

  constructor() {
    this.form.valueChanges.subscribe((value) => {
      this.secret = value.secret;
    });
  }

  ngOnInit() {}

  fileName: string = '';
  secret = '';
  segment = signal('Encrypt');

  // Este método se ejecuta cuando se selecciona un archivo
  onFileSelected(event: any): void {
    // Only accept txt files
    if (event.target.files[0].type !== 'text/plain') {
      // Show alert
      this.alertController
        .create({
          header: 'Error',
          message: 'Only .txt files are allowed',
          buttons: ['OK'],
        })
        .then((alert) => alert.present());

      return;
    }

    this.file = event.target.files[0] as File;

    if (this.file) {
      this.fileName = this.file.name;
    }
  }

  // Este método dispara el input file oculto
  triggerFileInput(): void {
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    fileInput.click();
  }

  onChangeSegment(event: any): void {
    this.segment.set(event.detail.value);
  }

  proccessFile(): void {
    if (!this.file) {
      this.form.markAllAsTouched();
      return;
    }

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    if (this.segment() === 'Encrypt') {
      this.encryptFile();
    } else {
      this.decryptFile();
    }
  }

  encryptFile(): void {
    if (this.file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const fileContent = e.target.result;

        const encrypted = CryptoJS.AES.encrypt(
          fileContent,
          this.secret
        ).toString();

        this.downloadEncryptedFile(encrypted);
      };
      reader.readAsText(this.file);
    }
  }

  decryptFile(): void {
    if (this.file) {
      try {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          const encryptedContent = e.target.result;
          // Desencriptar el contenido del archivo con AES

          const decrypted = CryptoJS.AES.decrypt(encryptedContent, this.secret);

          try {
            const originalText = decrypted.toString(CryptoJS.enc.Utf8);
            this.downloadDecryptedFile(originalText);
          } catch (error) {
            const originalText = decrypted.toString();
            this.downloadDecryptedFile(originalText);
          }
        };

        reader.readAsText(this.file);
      } catch (error) {
        this.alertController
          .create({
            header: 'Error',
            message: 'Invalid secret',
            buttons: ['OK'],
          })
          .then((alert) => alert.present());
      }
    }
  }

  downloadEncryptedFile(encryptedContent: string): void {
    const blob = new Blob([encryptedContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'archivo-encriptado.txt';
    link.click();

    window.URL.revokeObjectURL(url);
  }

  downloadDecryptedFile(decryptedContent: string): void {
    const blob = new Blob([decryptedContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'archivo-desencriptado.txt';
    link.click();

    window.URL.revokeObjectURL(url);
  }
}
