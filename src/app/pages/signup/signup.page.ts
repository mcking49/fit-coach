import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './../../services/auth.service';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  public signupForm: FormGroup;

  constructor(
    private alertCtrl: AlertController,
    private authService: AuthService,
    private formbuilder: FormBuilder,
    private loadingCtrl: LoadingController,
    private router: Router,
    private toastCtrl: ToastController
  ) { }

  ngOnInit() {
    this.initSignupForm();
  }

  public async signup(): Promise<void> {
    if (this.signupForm.valid) {
      const loading = await this.loadingCtrl.create();
      loading.present();

      const { name, email, password } = this.signupForm.value;

      try {
        await this.authService.signup(email, password, name);
        this.showToast('Signup successful!');
        this.router.navigateByUrl('/home');
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
      this.showToast('ERROR: please fill out all the fields', 3000);
    }
  }

  private async showToast(message: string, duration: number = 2000): Promise<void> {
    const toast = await this.toastCtrl.create({message, duration});
    toast.present();
  }

  private initSignupForm(): void {
    this.signupForm = this.formbuilder.group({
      name: [
        '',
        Validators.required
      ],
      email: [
        '',
        Validators.compose([Validators.email, Validators.required])
      ],
      password: [
        '',
        Validators.compose([Validators.minLength(6), Validators.required])
      ]
    });
  }

}
