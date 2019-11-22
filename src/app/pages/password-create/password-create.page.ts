import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AlertController, LoadingController, ToastController } from "@ionic/angular";
import { TranslateService } from "@ngx-translate/core";
import { BaseUI } from '../common/baseui';
import { CommonService } from '../../services/common.service';

/**
 *
 * @export パスワードを作成
 * @class PasswordCreatePage
 * @extends {BaseUI}
 * @implements {OnInit}
 */
@Component({
  selector: 'app-password-create',
  templateUrl: './password-create.page.html',
  styleUrls: ['./password-create.page.scss'],
})
export class PasswordCreatePage extends BaseUI implements OnInit {
  @ViewChild('passwordInput', { static: true }) passwordInput: any;
  // パスワード
  public password: string;
  // パスワード表示フラグ
  public pwshow: boolean;
  // メッセージ
  private msg002: string;
  private msg003: string;
  // メールタイトル
  private passwordTitle: string;
  constructor(
    public alertController: AlertController,
    public toastCtrl: ToastController,
    public translateService: TranslateService,
    private commonService: CommonService,
  ) {
    super();
  }
  /**
   * 初期化
   *
   * @memberof PasswordCreatePage
   */
  ngOnInit() {
    this.password = "";
    // 非表示
    this.pwshow = false;
    this.msg002 = '';
    this.msg003 = '';
    this.translateService.get('forgetPage.mail').subscribe((value) => {
      this.passwordTitle = value;
    });
  }
  /**
   * 戻る
   *
   * @memberof PasswordCreatePage
   */
  async doBack() {
    // アカウント登録済画面へ
    this.commonService.back('/account-create-finish');
  }
  /**
   * 次へ
   *
   * @memberof PasswordCreatePage
   */
  async doNext() {
    if (this.doSubmitCheck()) {
      // 入力データを保存
      this.saveInputData();
      // 誓約のお願いへ
      this.commonService.forward('/pledge');
    }
  }

  /**
   * 入力データを保存する
   * @memberof PasswordCreatePage
   */
  saveInputData() {
    // パスワード
    this.commonService.storageSet('create_password', this.password);
  }


  /**
   * 入力内容チェック
   *
   * @private
   * @returns
   * @memberof ForgetPage
   */
  private doSubmitCheck() {
    if (this.password == "") {
      this.translateService.get('commonMsg.msg002', { param: this.passwordTitle }).subscribe((value) => {
        this.msg002 = value;
      });
      super.showToast(this.toastCtrl, this.msg002);
      this.passwordInput.setFocus();
      return false;
    }

    // チェック  密码包含 数字,英文,字符中的两种以上，长度6-20
    // const ischeck = /^(?![0-9]+$)(?![a-z]+$)(?![A-Z]+$)(?!([^(0-9a-zA-Z)])+$).{6,20}$/.test(this.password);
    // if (!ischeck) {
    //   this.translateService.get('commonMsg.msg003').subscribe((value) => {
    //     this.msg003 = value;
    //   });
    //   super.showToast(this.toastCtrl, this.msg003);
    //   this.passwordInput.setFocus();
    //   return false;
    // }
    return true;
  }
}
