import { Component } from '@angular/core';
import { PushNotifications } from '@capacitor/push-notifications';
import { NenService } from '../dichvu/nen.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public danhsach = []
  public trangthai = [{
    mau: 'red',
    ten: 'Chưa gửi hàng'
  }, {
    mau: 'yellow',
    ten: 'Đang gửi hàng'
  }, {
    mau: 'green',
    ten: 'Đã gửi hàng'
  }, {
    mau: 'darkred',
    ten: 'Khách huỷ đơn hàng'
  }]
  constructor(
    public nen: NenService,
    public alert: AlertController
  ) {}

  public async ionViewDidEnter() {
    this.khoitao()
  }

  public async khoitao() {
    this.nen.freeze()
    this.nen.post({
      action: "khoitaodonhangapp"
    }).then((phanhoi) => {
      this.nen.defreeze()
      this.danhsach = phanhoi.danhsach
    }, (e) => {
      this.nen.defreeze()
    })
  }

  public async tailai(event: any) {
    this.nen.freeze()
    this.nen.post({
      action: "khoitaodonhangapp"
    }).then((phanhoi) => {
      this.nen.defreeze()
      event.target.complete()
      this.danhsach = phanhoi.danhsach
    }, (e) => {
      this.nen.defreeze()
      event.target.complete()
    })
  }

  async doitrangthai(id: number, trangthai: number) {
    const alert = await this.alert.create({
      message: 'Thay đổi trạng thái đơn hàng',
      buttons: [{
        text: 'Huỷ',
        role: 'cancel',
      },
      {
        text: 'Xác nhận',
        role: 'confirm',
        handler: () => {
          this.xacnhandoitrangthai(id, trangthai)
        },
      }]
    });

    await alert.present();
  }

  public async xacnhandoitrangthai(id: number, trangthai: number) {
    await this.nen.freeze()
    this.nen.post({
      action: "doitrangthaidonhang",
      iddonhang: id,
      trangthai: trangthai
    }).then((phanhoi) => {
      this.nen.defreeze()
      this.danhsach = phanhoi.danhsach
    }, (e) => {
      this.nen.defreeze()
    })
  }
}
