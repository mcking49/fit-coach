import { WeightTrack } from './../interfaces/weight-track';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';

import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private readonly userRootPath = 'userProfile';

  constructor(
    private authService: AuthService,
    private firestore: AngularFirestore,
  ) { }

  private get userId(): string {
    return this.authService.currentUserId;
  }

  public getClientDetails(clientId: string): AngularFirestoreDocument<User> {
    return this.firestore.doc<User>(this.getClientPath(clientId));
  }

  public async createClient(
    fullname: string,
    email: string,
    startingWeight: number,
  ): Promise<void> {
    const id: string = this.firestore.createId();
    const user: User = {
      admin: false,
      email,
      fullname,
      id,
      startingWeight
    };

    return this.firestore.doc<User>(this.getClientPath(user.id)).set(user);
  }

  public clientListShow(): AngularFirestoreCollection<User> {
    return this.firestore.collection<User>(this.getClientListPath());
  }

  public clientTrackWeight(weight: number) {
    const weightTrack: WeightTrack = {
      weight,
      date: firebase.firestore.Timestamp
    };
    return this.firestore.collection<WeightTrack>(`userProfile/${this.userId}/weightTrack`).add(weightTrack);
  }

  public clientWeightHistory(): AngularFirestoreCollection<WeightTrack> {
    return this.firestore.collection<WeightTrack>(`${this.userRootPath}/${this.userId}/weightTrack`,
      ref => ref.orderBy('date').limit(5)
    );
  }

  public clientWeightHistoryCoach(clientId: string): AngularFirestoreCollection<WeightTrack> {
    return this.firestore.collection<WeightTrack>(`${this.getClientPath(clientId)}/weightTrack`,
      ref => ref.orderBy('date').limit(5)
    );
  }

  private getClientListPath(): string {
    return `${this.userRootPath}/${this.userId}/clientList`;
  }

  private getClientPath(clientId: string): string {
    return `${this.userRootPath}/${this.userId}/clientList/${clientId}`;
  }
}
