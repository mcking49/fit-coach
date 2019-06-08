import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ClientDetailPage } from './client-detail.page';

import { MomentModule } from 'ngx-moment';

const routes: Routes = [
  {
    path: '',
    component: ClientDetailPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    MomentModule
  ],
  declarations: [ClientDetailPage]
})
export class ClientDetailPageModule {}
