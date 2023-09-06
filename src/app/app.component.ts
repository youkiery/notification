import { Component } from '@angular/core';
import { FCM } from "@capacitor-community/fcm";
import { PushNotifications } from "@capacitor/push-notifications";
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  private _currentPlatform: string = 'browser';
  constructor(
    private platform: Platform,
  ) {
    this.platform.ready().then(() => {
      this.setCurrentPlatform()
      if (this.isNative()) this.khoitao()
    })
  }

  private setCurrentPlatform() {
    // Are we on mobile platform? Yes if platform is ios or android, but not desktop or mobileweb, no otherwise
    if (
      this.platform.is('ios')
      || this.platform.is('android')
      && !(this.platform.is('desktop') || this.platform.is('mobileweb'))) {
      this._currentPlatform = 'mobile';
    } else {
      this._currentPlatform = 'browser';
    }
  }
  
  isNative() {
    return this._currentPlatform === 'native';
  }

  isBrowser() {
    return this._currentPlatform === 'browser';
  }

  public async khoitao() {
    await PushNotifications.requestPermissions();
    await PushNotifications.register();

    // now you can subscribe to a specific topic
    FCM.subscribeTo({ topic: "donhang" }).then((r) => {
      console.log('Đăng ký kênh nhận thông báo đơn hàng')
    }).catch((err) => {
      console.log(err)
    });

    // Unsubscribe from a specific topic
    // FCM.unsubscribeFrom({ topic: "test" })
    //   .then(() => alert(`unsubscribed from topic`))
    //   .catch((err) => console.log(err));

    // Get FCM token instead of the APN one returned by Capacitor
    // FCM.getToken()
    //   .then((r) => alert(`Token ${r.token}`))
    //   .catch((err) => console.log(err));

    // // Delete the old FCM token and get a new one
    // FCM.refreshToken()
    //   .then((r) => alert(`Token ${r.token}`))
    //   .catch((err) => console.log(err));

    // // Remove FCM instance
    // FCM.deleteInstance()
    //   .then(() => alert(`Token deleted`))
    //   .catch((err) => console.log(err));

    // // Enable the auto initialization of the library
    // FCM.setAutoInit({ enabled: true }).then(() => alert(`Auto init enabled`));

    // // Check the auto initialization status
    // FCM.isAutoInitEnabled().then((r) => {
    //   console.log("Auto init is " + (r.enabled ? "enabled" : "disabled"));
    // });
  }
}
