import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AlertController, LoadingController, ToastController } from "@ionic/angular";
import { TranslateService } from "@ngx-translate/core";
import { BaseUI } from '../common/baseui';
import { CommonService } from '../../services/common.service';
/**
 * @export アカウント作成
 * @class AccountCreatePage
 * @extends {BaseUI}
 * @implements {OnInit}
 */
@Component({
  selector: 'app-account-create',
  templateUrl: './account-create.page.html',
  styleUrls: ['./account-create.page.scss'],
})
export class AccountCreatePage extends BaseUI implements OnInit {
  @ViewChild('nameInput', { static: true }) nameInput:any;
  @ViewChild('furiganaInput', { static: true }) furiganaInput:any;
  // 企業人事担当者
  public isToggled: boolean;
  // お名前
  public name: string;
  // フリガナ
  public furigana: string;
  // 入力チェックエラー情報
  private msg002: string;
  // 会社コード
  private nameTitle: string;
  // 会社名称
  private furiganaTitle: string;
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
   * 画面初期化
   *
   * @memberof AccountCreatePage
   */
  ngOnInit() {
    this.name = "";
    this.furigana = "";
    this.isToggled = false;
    this.translateService.get('accountCreatePage.name').subscribe((value) => {
      this.nameTitle = value;
    });
    this.translateService.get('accountCreatePage.furigana').subscribe((value) => {
      this.furiganaTitle = value;
    });
  }

  /**
   * 戻しボタン押す
   * @memberof AccountCreatePage
   */
  async doBack() {
    // そのたのオプション
    this.commonService.back('/other-option');
  }

  /**
   * 次へボタン押す
   * @memberof AccountCreatePage
   */
  async doNext() {
    if (this.doSubmitCheck()) {
      // 入力データを保存する
      this.saveInputData();
      if (this.isToggled) {
        // 企業担当者の場合
        this.commonService.forward('/company-account');
      } else {
        // 個人の場合
        this.commonService.forward('/personal-account');
      }
    }
  }
  /**
   * 企業人事担当者／個人　変更の場合
   * @memberof AccountCreatePage
   */
  public onToggleChange() {
    console.log("Toggled: " + this.isToggled);
  }

  /**
 * 入力データを保存する
 * @memberof PersonalAccountPage
 */
  saveInputData() {
    // お名前
    this.commonService.storageSet('create_username', this.name);
    // フリガナ
    this.commonService.storageSet('create_furigana', this.furigana);
    // 企業人事担当者
    this.commonService.storageSet('create_istoggled', this.isToggled);
  }

  /**
   * 入力内容チェック
   *
   * @private
   * @returns
   * @memberof AccountCreatePage
   */
  private doSubmitCheck() {
    // お名前入力されない
    if (this.name == "") {
      this.translateService.get('commonMsg.msg002', { param: this.nameTitle }).subscribe((value) => {
        this.msg002 = value;
      });
      super.showToast(this.toastCtrl, this.msg002);
      this.nameInput.setFocus();
      return false;
    }
    return true;
  }
}
