import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoadingController, NavController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class NenService {
  // public baseurl: string = 'http://localhost/api/';
  public baseurl: string = 'https://api.thanhxuanpet.com/api/';
  public load: any = []
  public toast: any = []
  constructor(
    public http: HttpClient,
    public toastCtrl: ToastController,
    public loadCtrl: LoadingController,
    public navCtrl: NavController,
  ) { }

  public tachdau(x: string) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  public async freeze(text: string = 'Đang tải dữ liệu...') {
    let loading = await this.loadCtrl.create({
      message: text
    })
    this.load.push(loading)
    await loading.present()
  }

  public defreeze() {
    if (this.load.length) this.load[this.load.length - 1].dismiss()
    this.load.pop()
  }

  public async notify(text: string, duration: number = 1000) {
    this.toast = await this.toastCtrl.create({
      message: text,
      duration: duration,
      position: 'bottom'
    })
    this.toast.present()
  }

  public async post(param: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.post(this.baseurl, param).toPromise().then((data: any) => {
        if (data.messenger && data.messenger.length) this.notify(data.messenger)
        if (data.status) resolve(data)
        else reject(data)
      }, (error) => {
        if (error.messenger && error.messenger.length) this.notify(error.messenger)
        else this.notify('Có lỗi xảy ra >.<')
        reject(1)
      })
    })
  }
}
