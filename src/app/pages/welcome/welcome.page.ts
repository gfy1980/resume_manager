import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../services/common.service';
import { BaseUI } from '../common/baseui';
import { Platform, AlertController } from '@ionic/angular';
import { TranslateService } from "@ngx-translate/core";
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { AppVersion } from '@ionic-native/app-version/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { File } from '@ionic-native/file/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { LoadingController } from '@ionic/angular';
@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage extends BaseUI implements OnInit {
  // Version
  private appVer: string;
  // LoginFlag
  private isLogin: number;
  private wechatLogin: number;
  private facebookLogin: number;
  private mailLogin: number;
  // 戻る時計
  private backTime = 3;
  public downPercent: number = 0;
  constructor(
    public commonService: CommonService,
    private alertController: AlertController,
    private translateService: TranslateService,
    private iab: InAppBrowser,
    private appVersion: AppVersion,
    private file: File,
    private transfer: FileTransfer,
    private fileOpener: FileOpener,
    private androidPermissions: AndroidPermissions,
    private localNotifications: LocalNotifications,
    public loadingCtrl: LoadingController,
  ) {
    super();
  }

  /**
   * 初期化
   *
   * @memberof PasswordChangeFinishPage
   */
  ngOnInit() {
    this.backTime = 5;
    this.commonService.storageSet('isAlertShow', false);
    // Login Flag
    this.commonService.storageGet('isLogin').then((value: number) => {
      this.isLogin = value;
    });
    this.commonService.storageGet('wechatLogin').then((value: number) => {
      this.wechatLogin = value;
    });
    this.commonService.storageGet('facebookLogin').then((value: number) => {
      this.facebookLogin = value;
    });
    this.commonService.storageGet('mailLogin').then((value: number) => {
      this.mailLogin = value;
    });
    // Mobile の場合
    if (this.commonService.isMobile() && this.commonService.isAndroid()) {
      // Version
      this.appVersion.getVersionNumber().then(v => {
        this.appVer = v;
      });
      this.getVer();
    } else {
      // Web　の場合
      this.timer();
    }
  }

  /**
  *　時計開始
  *
  * @memberof WelcomePage
  */
  timer() {
    setTimeout(() => {
      console.log(this.backTime);
      if (this.backTime <= 0) {
        this.doLogin();
      } else {
        this.backTime--;
        this.timer();
      }
    }, 1000);
  }

  getVer() {
    const api = '/versionupgrade';
    this.commonService.ajaxGet(api).then((response: any) => {
      if (response.success) {
        this.checkVer(response);
      } else {
        alert(response.message);
      }
    }, (error) => {
      console.log("getVer Error");
      this.timer();
    });
  }

  async checkVer(response: any) {
    if (this.appVer != response.result.version) {
      let msg011 = "";
      let btnOk = "";
      let btnCancel = "";
      this.translateService.get('commonMsg.msg011').subscribe((value) => {
        msg011 = value;
      });
      this.translateService.get('common.ok').subscribe((value) => {
        btnOk = value;
      });
      this.translateService.get('common.cancel').subscribe((value) => {
        btnCancel = value;
      });
      const alert = await this.alertController.create({
        // header: 'Confirm!',
        message: response.result.readme,
        buttons: [
          {
            text: btnCancel,
            role: 'cancel',
            cssClass: 'secondary',
            handler: (blah) => {
              this.doLogin();
            }
          }, {
            text: btnOk,
            handler: () => {
              if ("" != response.result.apkurl) {
                // const browser = this.iab.create(response.result.apkurl, '_self', 'location=no');
                //const browser = this.iab.create(response.result.apkurl);
                //browser.show();
                // window.open(response.result.apkurl, '_blank', 'hidden=yes');
                this.checkPermission(response.result.apkurl);
              }
            }
          }
        ]
      });
      await alert.present();
    } else {
      this.timer();
    }
  }

  checkPermission(targetUrl: string) {
    // console.log("download");
    this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE).then(
      result => {
        // console.log('Has permission?', result.hasPermission);
        if (!result.hasPermission) {
          this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE).then(data => {
            // console.log("download", data);
            this.downloadApp(targetUrl);
          });
        } else {
          this.downloadApp(targetUrl);
        }
      },
      err => {
        this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE).then(data => {
          // console.log("download", data);
          this.downloadApp(targetUrl);
        });;
      }
    );
  }

  downloadApp(targetUrl: string) {
    // this.showLocalNotifications();
    this.doLogin();
    const fileTransfer: FileTransferObject = this.transfer.create();
    const savePath = this.commonService.isAndroid() ? this.file.externalDataDirectory : this.file.documentsDirectory;
    const fileName = savePath + 'doraGoGo.apk';
    console.log(targetUrl);
    console.log(this.file.externalRootDirectory);
    fileTransfer.download(encodeURI(targetUrl), fileName).then((entry) => {
      //6、下载完成调用打开应用
      this.fileOpener.open(entry.toURL(),
        'application/vnd.android.package-archive')
        .then(() => {
          console.log('File is opened')
        })
        .catch(e => {
          console.log('Error openening file', e)
        });

    }, (error) => {
      // this.localNotifications.clear(666666);
      alert(JSON.stringify(error));
    });

    //5、获取下载进度    
    // var oProgressNum = document.getElementById('progressnum');
    fileTransfer.onProgress((event) => {
      if (event.total > 0) {
        let percent = Math.ceil(event.loaded / event.total * 100);  //转化成1-100的进度
        if (this.downPercent < percent) {
          this.downPercent = percent;
          if (percent === 100) {
            // oProgressNum.innerHTML = '下载完成';
            // this.localNotifications.clear(666666);
            console.log('下载完成')
          } else {
            // oProgressNum.innerHTML = '下载进度：' + percent  + '%';
            console.log('下载进度：' + percent + '%')
          }
          // this.updateLocalNotifications(); 
        }
      }
    });

  }

  showDownLoading() {
    this.loadingCtrl.create({
      spinner: 'dots',
      message: 'update：' + this.downPercent + '%'
    }).then(a => {
      a.present();
    });
  }

  dismissDownLoading() {
    this.loadingCtrl.dismiss();
  }

  showLocalNotifications() {
    this.localNotifications.hasPermission().then(data => {
      // console.log('Has permission?', data);
      if (!data) {
        this.localNotifications.requestPermission().then(data => {
          // console.log("localNotifications requestPermission", data);

          this.localNotifications.schedule({
            id: 666666,
            title: 'app update',
            text: this.downPercent + '%',
            sound: null,
            progressBar: { value: this.downPercent }
          });
        })
      } else {
        this.localNotifications.schedule({
          id: 666666,
          title: 'app update',
          text: this.downPercent + '%',
          sound: null,
          progressBar: { value: this.downPercent }
        });
      }
    });
  }

  updateLocalNotifications() {
    this.localNotifications.update({
      id: 666666,
      title: 'app update',
      text: this.downPercent + '%',
      sound: null,
      trigger: { at: new Date(new Date().getTime() + 3600) },
      progressBar: { value: this.downPercent }
    });
  }

  async doLogin() {
    if (this.isLogin == 1) {
      this.commonService.root('/tabs-personal');
      return;
    }
    if (this.wechatLogin == 1 || this.facebookLogin == 1) { // 使用过Wechat或facebook的共享用户后
      this.commonService.root('/login-quite');
      return;
    }
    if (this.mailLogin == 1) {
      this.commonService.root('/login');
    } else {
      // 第一次使用DORAGOGO的LOGIN画面そのたのオプション画面表示
      this.commonService.root('/other-option');
    }
  }
}
