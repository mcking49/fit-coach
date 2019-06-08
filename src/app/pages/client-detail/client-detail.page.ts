import { ClientService } from './../../services/client.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/interfaces/user';
import { WeightTrack } from 'src/app/interfaces/weight-track';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-client-detail',
  templateUrl: './client-detail.page.html',
  styleUrls: ['./client-detail.page.scss'],
})
export class ClientDetailPage implements OnInit {

  public client$: Observable<User>;
  public clientWeightTrack: Observable<WeightTrack[]>;

  constructor(
    private route: ActivatedRoute,
    private clientService: ClientService,
    private router: Router
  ) { }

  ngOnInit() {
    const clientId: string = this.route.snapshot.paramMap.get('id');
    this.client$ = this.clientService.getClientDetails(clientId).valueChanges();
    this.clientWeightTrack = this.clientService.clientWeightHistoryCoach(clientId).valueChanges();
  }

}
