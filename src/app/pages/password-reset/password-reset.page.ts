import { AuthService } from './../../services/auth.service';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.page.html',
  styleUrls: ['./password-reset.page.scss'],
})
export class PasswordResetPage implements OnInit {

  public passwordResetForm: FormGroup;

  constructor(
    private alertCtrl: AlertController,
    private authService: AuthService,
    private formbuilder: FormBuilder,
    private loadingCtrl: LoadingController,
    private router: Router,
    private toastCtrl: ToastController
  ) { }

  ngOnInit() {
    this.initForm();
  }

  public async resetPassword(): Promise<void> {
    if (this.passwordResetForm.valid) {
      const loading = await this.loadingCtrl.create();
      loading.present();

      const { email } = this.passwordResetForm.value;

      try {
        await this.authService.passwordReset(email);
        const toast = await this.toastCtrl.create({
          message: 'A reset link has been sent to your email',
          duration: 2000
        });
        toast.present();
        this.router.navigateByUrl('/login');
      } catch (error) {
        const alert = await this.alertCtrl.create({
          message: error.message,
          buttons: [{text: 'Ok', role: 'cancel'}]
        });
        alert.present();
      } finally {
        loading.dismiss();
      }
    } else {
      const errorToast = await this.toastCtrl.create({
        message: 'ERROR: Please enter a valid email',
        duration: 3000
      });
      errorToast.present();
    }
  }

  private initForm() {
    this.passwordResetForm = this.formbuilder.group({
      email: [
        '',
        Validators.compose([Validators.email, Validators.required])
      ]
    });
  }

}
