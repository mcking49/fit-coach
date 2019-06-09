import { User } from './../interfaces/user';
import { UserService } from './user.service';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public currentUser: firebase.User;

  constructor(private afAuth: AngularFireAuth, private userService: UserService) {
    this.afAuth.authState.subscribe((user: firebase.User) => {
      if (user) {
        this.currentUser = user;
      } else {
        this.currentUser = null;
      }
    });
  }

  public get currentUserId(): string {
    return this.currentUser.uid;
  }

  public isLoggedIn(): Promise<boolean> {
    return new Promise<boolean>(async (resolve, reject) => {
      try {
        if (this.currentUser) {
          resolve(true);
        }

        this.afAuth.authState.subscribe((user) => {
          if (user) {
            resolve(true);
          } else {
            resolve(false);
          }
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  public async login(email: string, password: string): Promise<firebase.auth.UserCredential> {
    const userCredential = await this.afAuth.auth.signInWithEmailAndPassword(email, password);
    this.userService.registerPushToken(userCredential.user.uid);
    return userCredential;
  }

  public logout(): Promise<void> {
    return this.afAuth.auth.signOut();
  }

  public passwordReset(email: string): Promise<void> {
    return this.afAuth.auth.sendPasswordResetEmail(email);
  }

  public signup(email: string, password: string, fullname: string): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
      try {
        const userCredential: firebase.auth.UserCredential = await this.afAuth.auth.createUserWithEmailAndPassword(email, password);
        const user: User = {
          id: userCredential.user.uid,
          fullname,
          email,
          admin: true
        };
        this.userService.createUser(user);
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }
}
