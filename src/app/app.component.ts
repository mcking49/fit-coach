import { Router } from '@angular/router';
import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';

import { DeviceInfo, Plugins, StatusBarStyle, PushNotification, PushNotificationActionPerformed } from '@capacitor/core';

const { Device, PushNotifications, SplashScreen, StatusBar } = Plugins;

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {

  public notifications: any[];

  constructor(
    private platform: Platform,
    private router: Router
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      SplashScreen.hide().catch((error) => {
        console.error(error);
      });

      Device.getInfo().then((deviceInfo: DeviceInfo) => {
        if (deviceInfo.platform !== 'web') {
          StatusBar.setStyle({style: StatusBarStyle.Light});

          PushNotifications.register();

          PushNotifications.addListener('pushNotificationReceived', (notification: PushNotification) => {
            this.notifications.push(notification);
            this.router.navigateByUrl(`client-detail/${notification.data.clientId}`);
          });

          PushNotifications
            .addListener('pushNotificationActionPerformed', (notification: PushNotificationActionPerformed) => {
              this.notifications.push(notification);
              this.router.navigateByUrl(`client-detail/${notification.notification.data.clientId}`);
            });
        }
      });

    });
  }
}
