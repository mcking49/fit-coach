import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, AlertController, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public loginForm: FormGroup;

  constructor(
    private alertCtrl: AlertController,
    private authService: AuthService,
    private formbuilder: FormBuilder,
    private loadingCtrl: LoadingController,
    private router: Router,
    private toastCtrl: ToastController
  ) { }

  ngOnInit() {
    this.initLoginForm();
  }

  public async login(loginForm: FormGroup): Promise<void> {
    if (loginForm.valid) {
      const loading = await this.loadingCtrl.create();
      loading.present();

      const { email, password } = this.loginForm.value;

      try {
        await this.authService.login(email, password);
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
      const toast = await this.toastCtrl.create({
        message: 'ERROR: Please enter your email and password',
        duration: 3000
      });
      toast.present();
    }
  }

  private initLoginForm(): void {
    this.loginForm = this.formbuilder.group({
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
