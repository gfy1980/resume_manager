import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, ToastController } from "@ionic/angular";
import { TranslateService } from "@ngx-translate/core";
import { BaseUI } from '../common/baseui';
import { CommonService } from '../../services/common.service';
/**
 *
 * @export アカウントを作成完了
 * @class AccountConfirmationFinishPage
 * @extends {BaseUI}
 * @implements {OnInit}
 */
@Component({
  selector: 'app-account-confirmation-finish',
  templateUrl: './account-confirmation-finish.page.html',
  styleUrls: ['./account-confirmation-finish.page.scss'],
})
export class AccountConfirmationFinishPage extends BaseUI implements OnInit {
  // 表示イメージ
  public okImageSrc: string;
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
   * @memberof AccountConfirmationFinishPage
   */
  ngOnInit() {
    this.okImageSrc = "./assets/imgs/icon_ok.png";
  }
  /**
   * OKボタン
   *
   * @memberof AccountConfirmationFinishPage
   */
  async doNext() {
    // ログイン画面へ
    this.commonService.forward('/login');
  }

}
