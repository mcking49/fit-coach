import { ClientService } from './../../services/client.service';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.page.html',
  styleUrls: ['./client-list.page.scss'],
})
export class ClientListPage implements OnInit {

  public clientList: User[] = [];

  constructor(private clientService: ClientService) { }

  ngOnInit() {
    this.clientService.clientListShow().valueChanges().subscribe(clientList => {
      this.clientList = clientList;
    });
  }

}
