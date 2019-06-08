import { User } from './../interfaces/user';
import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';

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
        const user: User = await this.firestore
          .doc<User>(`${this.rootPath}/${userId}`)
          .valueChanges()
          .toPromise();
        resolve(user.admin);
      } catch (error) {
        reject(error);
      }
    });
  }
}
