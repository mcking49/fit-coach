import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';

import { DeviceInfo, Plugins, StatusBarStyle } from '@capacitor/core';

const { Device, SplashScreen, StatusBar } = Plugins;

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor(
    private platform: Platform,
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      SplashScreen.hide();
      Device.getInfo().then((deviceInfo: DeviceInfo) => {
        if (deviceInfo.platform !== 'web') {
          StatusBar.setStyle({style: StatusBarStyle.Light});
        }
      });
    });
  }
}
