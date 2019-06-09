import { User } from './../interfaces/user';
import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';

import { Plugins, PushNotificationToken } from '@capacitor/core';

const { PushNotifications } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly rootPath: string = 'userProfile';

  constructor(private firestore: AngularFirestore) { }

  public createUser(user: User): Promise<void> {
    return this.firestore.doc<User>(`${this.rootPath}/${user.id}`).set(user);
  }

  public isAdmin(userId: string): Promise<boolean> {
    return new Promise<boolean>(async (resolve, reject) => {
      try {
        this.firestore
          .doc<User>(`${this.rootPath}/${userId}`)
          .valueChanges()
          .subscribe((user: User) => {
            resolve(user.admin);
          });
      } catch (error) {
        reject(error);
      }
    });
  }

  public registerPushToken(userId: string) {
    PushNotifications.register();
    PushNotifications.addListener('registration', (token: PushNotificationToken) => {
      this.firestore.doc<User>(`${this.rootPath}/${userId}`).update({token: token.value});
    });
  }
}
