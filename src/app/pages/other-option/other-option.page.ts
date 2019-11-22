import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, ToastController } from "@ionic/angular";
import { TranslateService } from "@ngx-translate/core";
import { BaseUI } from '../common/baseui';
import { CommonService } from '../../services/common.service';
/**
 *
 *
 * @export そのたのオプション
 * @class OtherOptionPage
 * @extends {BaseUI}
 * @implements {OnInit}
 */
@Component({
  selector: 'app-other-option',
  templateUrl: './other-option.page.html',
  styleUrls: ['./other-option.page.scss'],
})
export class OtherOptionPage extends BaseUI implements OnInit {
  // wechatイメージURL
  public wechatSrc: string;
  // facebookイメージURL
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
   * 画面初期化
   *
   * @memberof OtherOptionPage
   */
  ngOnInit() {
    this.wechatSrc = "./assets/imgs/wechat.png";
    this.facebookSrc = "./assets/imgs/facebook.png";
  }

  ngOnDestroy(){
  }
  /**
   * 戻し
   *
   * @memberof OtherOptionPage
   */
  async doBack() {
    // クイックログイン画面へ
    this.commonService.back('/login-quite');
  }

  /**
   * アカウント作成
   *
   * @memberof OtherOptionPage
   */
  async toAccountCreate() {
    // アカウントを作成画面へ
    this.commonService.forward('/account-create');
  }
}
