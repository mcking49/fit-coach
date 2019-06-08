import { UserService } from './../services/user.service';
import { ClientService } from './../services/client.service';
import { AuthService } from './../services/auth.service';
import { Observable } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { WeightTrack } from '../interfaces/weight-track';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  public isAdmin = false;
  public weightTrackForm: FormGroup;
  public weightHistory$: Observable<WeightTrack[]>;

  constructor(
    private authService: AuthService,
    private clientService: ClientService,
    private formbuilder: FormBuilder,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.weightTrackForm = this.formbuilder.group({
      weight: ['', Validators.required]
    });

    this.authService.isLoggedIn().then((isLoggedIn) => {
      this.userService.isAdmin(this.currentUserId).then((isAdmin: boolean) => {
        this.isAdmin = isAdmin;
      });
    });

    this.weightHistory$ = this.clientService.clientWeightHistory().valueChanges();
  }

  public weightTrack() {
    const weight: number = this.weightTrackForm.value.weight;
    this.clientService.clientTrackWeight(weight);
    this.weightTrackForm.reset();
  }

  private get currentUserId(): string {
    return this.authService.currentUserId;
  }

}
