import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, ToastController } from "@ionic/angular";
import { TranslateService } from "@ngx-translate/core";
import { BaseUI } from '../common/baseui';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { CommonService } from '../../services/common.service';
/**
 * 
 * @export パスワード再設定完了
 * @class PasswordChangeFinishPage
 * @extends {BaseUI}
 * @implements {OnInit}
 */
@Component({
  selector: 'app-password-change-finish',
  templateUrl: './password-change-finish.page.html',
  styleUrls: ['./password-change-finish.page.scss'],
})
export class PasswordChangeFinishPage extends BaseUI implements OnInit {
  // 表示用情報
  public msg001: string;
  // 表示用メール
  private sendToEmail: string;
  // 戻る時計
  private backTime = 5;
  // 戻るボタン押して、時計使用しない
  private isBack: boolean;
  constructor(
    public route: ActivatedRoute,
    public alertController: AlertController,
    public toastCtrl: ToastController,
    public translateService: TranslateService,
    public commonService: CommonService,
  ) {
    super();
    this.route.queryParams.subscribe((params: Params) => {
      this.sendToEmail = params['email'];
    });
  }

  /**
   * 初期化
   *
   * @memberof PasswordChangeFinishPage
   */
  ngOnInit() {
    this.translateService.get('commonMsg.msg001', { email: this.sendToEmail }).subscribe((value) => {
      this.msg001 = value;
    });
    this.backTime = 5;
    this.isBack = false;
    this.timer();
  }
  /**
   *　時計開始
   *
   * @memberof PasswordChangeFinishPage
   */
  timer() {
    setTimeout(() => {
      console.log(this.backTime);
      if (!this.isBack) {
        if (this.backTime <= 0) {
          this.doNext();
        } else {
          this.backTime--;
          this.timer();
        }
      }
    }, 1000);
  }

  /**
   * 戻る
   *
   * @memberof PasswordChangeFinishPage
   */
  async doBack() {
    this.isBack = true;
    // パスワード再設定画面へ
    this.commonService.back('/forget');
  }
  /**
   * パスワード再設定
   *
   * @memberof PasswordChangeFinishPage
   */
  async doNext() {
    this.isBack = true;
    // ログイン画面へ
    this.commonService.forward('/login');
  }
}
