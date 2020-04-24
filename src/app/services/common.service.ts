import { Injectable } from '@angular/core';
import { TranslateService } from "@ngx-translate/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Storage } from '@ionic/storage';
import { NavController, AlertController, ToastController } from "@ionic/angular";
import { Platform, Events } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';

/**
 * 共通
 *
 * @export
 * @class CommonService
 */
@Injectable({
  providedIn: 'root'
})
export class CommonService {

  public config: any = {
    // サーバーのURL
    baseUrl: 'http://www.jpis.co.jp/mock'
  }

  constructor(
    public http: HttpClient,
    public toastCtrl: ToastController,
    public translateService: TranslateService,
    public storage: Storage,
    private platform: Platform,
    private events: Events,
    public route: ActivatedRoute,
    public router: Router,
    public navCrl: NavController,
    private alertController: AlertController,
  ) { }

  //封装了一个get请求
  ajaxGet(url: String) {
    var api = this.config.baseUrl + url;
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8' })
    };
    return new Promise((resolve, reject) => {
      this.http.get(api, httpOptions).subscribe((response) => {
        console.log(response);
        resolve(response);
      }, (err) => {
        this.translateService.get('commonMsg.msg004').subscribe((value) => {
          this.showToast(this.toastCtrl, value);
        });
        reject(err);
      })
    })
  }

  //封装了一个post请求 
  ajaxPost(url: String, json: Object) {
    var api = this.config.baseUrl + url;
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8' })
    };
    return new Promise((resove, reject) => {
      this.http.post(api, json, httpOptions).subscribe((response: any) => {
        console.log(response);
        resove(response);
      }, (error) => {
        this.translateService.get('commonMsg.msg004').subscribe((value) => {
          this.showToast(this.toastCtrl, value);
        });
        reject(error);
      })
    })
  }

  ajaxPostUrl(url: string, json: Object) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8' })
    };
    return new Promise((resove, reject) => {
      this.http.post(url, json, httpOptions).subscribe((response: any) => {
        console.log(response);
        resove(response);
      }, (error) => {
        this.translateService.get('commonMsg.msg004').subscribe((value) => {
          this.showToast(this.toastCtrl, value);
        });
        reject(error);
      })
    })
  }

  storageSet(key: string, value: any) {
    if (!key) {
      return;
    }
    this.storage.ready().then(() => {
      this.storage.set(key, JSON.stringify(value));
    });
  }

  storageGet(key: string) {
    if (!key) {
      return;
    }
    return new Promise((resove, reject) => {
      this.storage.ready().then(() => {
        this.storage.get(key).then(val => {
          resove(JSON.parse(val))
        }).catch(error => {
          reject(error);
        });
      });
    })
  }

  storageRemove(key: string) {
    if (!key) {
      return;
    }
    return new Promise((resove, reject) => {
      this.storage.ready().then(() => {
        this.storage.remove(key).then(val => {
          resove(JSON.stringify(val))
        }).catch(error => {
          reject(error);
        });
      });
    })
  }

  getBaseUrl() {
    return this.config.baseUrl;
  }
  // storageGet(key:string): Promise<string>  {
  //   return  this.storage.get(key).then(val => {
  //       return JSON.parse(val)
  //     }).catch(error => {
  //       return error;
  //     });
  // }

  getStore(name: string) {
    if (!name) {
      return;
    }
    return window.localStorage.getItem(name);
  }

  setStore(name: string, content: any) {
    if (!name) {
      return;
    }
    if (typeof content !== 'string') {
      content = JSON.stringify(content);
    }
    window.localStorage.setItem(name, content);
  }

  removeStore(name: string) {
    if (!name) {
      return;
    }
    window.localStorage.removeItem(name);
  }

  async showToast(toastCtrl: ToastController,
    message: string) {
    const toast = await toastCtrl.create({
      message: message,
      duration: 2000,  // 默认展示的时长
      position: 'bottom',
      // cssClass: 'success',
      // showCloseButton: true,            //是否显示关闭按钮
      // closeButtonText: 'Ok',            //关闭按钮的文字内容
    });
    await toast.present();
    return toast;
  }


  isMobile(): boolean {
    return this.platform.is('mobile') && !this.platform.is('mobileweb');
  }

  isAndroid(): boolean {
    return this.isMobile && this.platform.is('android');
  }

  back(page: string) {
    // this.navCrl.setDirection('back');
    // this.router.navigateByUrl(page);
    // this.navCrl.navigateBack(page);
    this.navCrl.setDirection('back');
    this.router.navigateByUrl(page);
    // document.getElementById("pageShow").style.display = "none";
    // setTimeout(() => {
    //   document.getElementById("pageShow").style.display = "block";
    // }, 500);
  }

  forward(page: string, extras?: any) {
    // this.router.navigate([page], extras);
    this.navCrl.navigateForward(page, extras);
  }

  root(url: string) {
    this.navCrl.navigateRoot(url);
  }
}
