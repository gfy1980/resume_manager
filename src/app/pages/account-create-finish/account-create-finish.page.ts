import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, ToastController } from "@ionic/angular";
import { TranslateService } from "@ngx-translate/core";
import { BaseUI } from '../common/baseui';
import { CommonService } from '../../services/common.service';
/**
 * @export アカウント登録済
 * @class AccountCreateFinishPage
 * @extends {BaseUI}
 * @implements {OnInit}
 */
@Component({
  selector: 'app-account-create-finish',
  templateUrl: './account-create-finish.page.html',
  styleUrls: ['./account-create-finish.page.scss'],
})
export class AccountCreateFinishPage extends BaseUI implements OnInit {
  // 表示イメージパス
  public wechatSrc: string;
  public facebookSrc: string;
  constructor(
    public alertController: AlertController,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public translateService: TranslateService,
    public commonService: CommonService,
  ) {
    super();
  }

  /**
   * 初期化
   *
   * @memberof AccountCreateFinishPage
   */
  ngOnInit() {
    this.wechatSrc = "./assets/imgs/wechat.png";
    this.facebookSrc = "./assets/imgs/facebook.png";
  }

  /**
   * 戻る
   *
   * @memberof AccountCreateFinishPage
   */
  async doBack() {
    // 身分証明書裏面写真画面へ
    this.commonService.back('/idcard-back');
  }

  /**
   * パスワードを作成
   *
   * @memberof AccountCreateFinishPage
   */
  async toPasswordCreate() {
    // パスワードを作成画面へ
    this.commonService.forward('/password-create');
  }
}
