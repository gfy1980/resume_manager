import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AlertController, LoadingController, ToastController } from "@ionic/angular";
import { TranslateService } from "@ngx-translate/core";
import { BaseUI } from '../common/baseui';
import { CommonService } from '../../services/common.service';
/**
 * 個人メール登録
 *
 * @export
 * @class PersonalAccountPage
 * @extends {BaseUI}
 * @implements {OnInit}
 */
@Component({
  selector: 'app-personal-account',
  templateUrl: './personal-account.page.html',
  styleUrls: ['./personal-account.page.scss'],
})
export class PersonalAccountPage extends BaseUI implements OnInit {
  @ViewChild('mailInput', { static: true }) mailInput:any;
  // メール
  public mail: string;
  // 入力チェックエラー情報
  private msg002: string;
  private msg003: string;
  // メール
  private mailTitle: string;
  constructor(
    public alertController: AlertController,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public translateService: TranslateService,
    private commonService: CommonService,
  ) {
    super();
  }

  /**
   * 初期化
   *
   * @memberof PersonalAccountPage
   */
  ngOnInit() {
    this.mail = "";
    this.translateService.get('personalAccountPage.mail').subscribe((value) => {
      this.mailTitle = value;
    });
  }

  /**
   * 戻し
   * @memberof PersonalAccountPage
   */
  async doBack() {
    // アカウント作成画面へ
    this.commonService.back('/account-create');
  }

  /**
   * 次へ
   * @memberof PersonalAccountPage
   */
  async doNext() {
    if (this.doSubmitCheck()) {
      // 入力データ保存
      this.saveInputData();
      // 身分証明書正面写真画面へ
      this.commonService.forward('/idcard-positive', { queryParams: { pageType: 0 } });
    }
  }

  /**
   * 入力データを保存する
   * @memberof PersonalAccountPage
   */
  saveInputData() {
    // メール
    this.commonService.storageSet('create_email', this.mail);
  }

  /**
   * 入力内容チェック
   *
   * @private
   * @returns
   * @memberof PersonalAccountPage
   */
  private doSubmitCheck() {

    if (this.mail == "") {
      this.translateService.get('commonMsg.msg002', { param: this.mailTitle }).subscribe((value) => {
        this.msg002 = value;
      });
      super.showToast(this.toastCtrl, this.msg002);
      this.mailInput.setFocus();
      return false;
    }
    // メールチェック
    const ischeck = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(this.mail);
    if (!ischeck) {
      this.translateService.get('commonMsg.msg003').subscribe((value) => {
        this.msg003 = value;
      });
      super.showToast(this.toastCtrl, this.msg003);
      this.mailInput.setFocus();
      return false;
    }
    return true;
  }
}
