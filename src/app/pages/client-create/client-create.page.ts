import { LoadingController } from '@ionic/angular';
import { ClientService } from './../../services/client.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-client-create',
  templateUrl: './client-create.page.html',
  styleUrls: ['./client-create.page.scss'],
})
export class ClientCreatePage implements OnInit {

  public clientCreateForm: FormGroup;

  constructor(
    private clientService: ClientService,
    private formbuilder: FormBuilder,
    private loadingCtrl: LoadingController,
    private router: Router
  ) { }

  ngOnInit() {
    this.clientCreateForm = this.formbuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      startingWeight: ['', Validators.required]
    });
  }

  public async clientCreate(): Promise<void> {
    if (this.clientCreateForm.valid) {
      const loading = await this.loadingCtrl.create();
      loading.present();
      const { name, email, startingWeight } = this.clientCreateForm.value;
      try {
        await this.clientService.createClient(name, email, startingWeight);
        this.router.navigateByUrl('/home');
      } catch (error) {
        console.error(error);
      } finally {
        loading.dismiss();
      }
    } else {
      console.error(this.clientCreateForm.value);
    }
  }

}
