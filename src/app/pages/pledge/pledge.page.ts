import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, ToastController } from "@ionic/angular";
import { TranslateService } from "@ngx-translate/core";
import { BaseUI } from '../common/baseui';
import { CommonService } from '../../services/common.service';
/**
 *
 * @export 誓約のお願い
 * @class PledgePage
 * @extends {BaseUI}
 * @implements {OnInit}
 */
@Component({
  selector: 'app-pledge',
  templateUrl: './pledge.page.html',
  styleUrls: ['./pledge.page.scss'],
})
export class PledgePage extends BaseUI implements OnInit {

  constructor(
    public alertController: AlertController,
    public toastCtrl: ToastController,
    public translateService: TranslateService,
    public commonService: CommonService,
  ) {
    super();
  }

  /**
   * 初期化
   *
   * @memberof PledgePage
   */
  ngOnInit() {
  }

  /**
   * 戻る
   *
   * @memberof PledgePage
   */
  async doBack() {
    // パスワードを作成画面へ
    this.commonService.back('/password-create');
  }
  
  /**
   * 同意
   *
   * @memberof PledgePage
   */
  async doAgree() {
    // グーグルリップス画面へ
    this.commonService.forward('/google-recaptcha');
  }

  /**
   * 不同意
   *
   * @memberof PledgePage
   */
  async doDisagree() {
    this.alertConfirm();
  }

  async alertConfirm() {
    let msg013 = "";
    let btnOk = "";
    let btnCancel = "";
    this.translateService.get('commonMsg.msg013').subscribe((value) => {
      msg013 = value;
    });
    this.translateService.get('common.ok').subscribe((value) => {
      btnOk = value;
    });
    this.translateService.get('common.cancel').subscribe((value) => {
      btnCancel = value;
    });
    const alert = await this.alertController.create({
      // header: 'Confirm!',
      message: msg013,
      buttons: [
        {
          text: btnCancel,
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
          }
        }, {
          text: btnOk,
          handler: () => {
            this.submitDataClear();
            this.commonService.forward('/login-quite');
          }
        }
      ]
    });
    await alert.present();
  }

  
  submitDataClear(){
    this.commonService.storageRemove('create_username');
    this.commonService.storageRemove('create_furigana');
    this.commonService.storageRemove('create_istoggled');
    this.commonService.storageRemove('create_email');
    this.commonService.storageRemove('create_companycode');
    this.commonService.storageRemove('create_companyname');
    this.commonService.storageRemove('create_companyurl');
    this.commonService.storageRemove('create_companymail');
    this.commonService.storageRemove('idcard-p');
    this.commonService.storageRemove('idcard-b');
    this.commonService.storageRemove('create_password');
  }
}
