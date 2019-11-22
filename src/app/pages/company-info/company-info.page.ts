import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, ToastController } from "@ionic/angular";
import { TranslateService } from "@ngx-translate/core";
import { BaseUI } from '../common/baseui';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from '../../services/common.service';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
/**
 * @export スカウト詳細
 * @class CompanyInfoPage
 * @extends {BaseUI}
 * @implements {OnInit}
 */
@Component({
  selector: 'app-company-info',
  templateUrl: './company-info.page.html',
  styleUrls: ['./company-info.page.scss'],
})
export class CompanyInfoPage extends BaseUI implements OnInit {
  private item: any;
  // ユーザアドレス
  private userAddress: string;
  // 会社名
  public companyName: string;
  // 会社URL
  private companyUrl: string;
  public message: string;
  // 許可、不許可状態
  public permissionChecked: boolean;
  // 許可、不許可状態表示文字
  public statesText: string;
  // 許可、不許可状態表示カラー
  public chipColor: string;
  constructor(
    public route: ActivatedRoute,
    public router: Router,
    public alertController: AlertController,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public translateService: TranslateService,
    public commonService: CommonService,
    private iab: InAppBrowser
  ) {
    super();
  }

  /**
   * 初期化
   *
   * @memberof CompanyInfoPage
   */
  ngOnInit() {
    // ユーザアドレス
    this.commonService.storageGet('address').then((value: string) => {
      this.userAddress = value;
    })
    this.companyUrl = "";
    const queryParams = this.route.snapshot.queryParams;
    this.item = queryParams.item;
    this.getScoutDetail();
  }

  /**
   *　戻る
   *
   * @memberof CompanyInfoPage
   */
  async doBack() {
    // 個人スマホン画面へ
    this.commonService.back('/tabs-personal');
  }

  /**
   * 会社名クリーク
   * @memberof CompanyInfoPage
   */
  async doShowUrl() {
    if (this.companyUrl != "") {
      const browser = this.iab.create(this.companyUrl);
      browser.show();
    }
  }

  /**
   * 許可、不許可状態変更
   *
   * @memberof CompanyInfoPage
   */
  public onToggleChange() {
    this.postPermission();
  }

  /**
  * スカウト一覧情報を取得する
  *
  * @memberof LoginPage
  */
  async getScoutDetail() {
    const api = '/scoutdetail';
    const body = JSON.stringify([
      {
        "address": this.userAddress,
        "id": this.item.id
      }
    ]);
    this.commonService.ajaxPost(api, body).then((response: any) => {
      if (response.success) {
        this.companyName = response.result.companyname; // 会社名
        this.message = response.result.message; // メッセージ
        this.permissionChecked = response.result.permission; // 許可、不許可状態
        this.companyUrl = response.result.url; // URL
        if (response.result.states == 1) {  // 申請中
          this.chipColor = 'warning';
          this.translateService.get('companyInfoPage.apply').subscribe((value) => {
            this.statesText = value;
          });
        } else if (response.result.states == 2) {  // 許可
          this.chipColor = 'primary';
          this.translateService.get('companyInfoPage.permission').subscribe((value) => {
            this.statesText = value;
          });
        } else if (response.result.states == 3) { // 不許可
          this.chipColor = 'danger';
          this.translateService.get('companyInfoPage.noPermission').subscribe((value) => {
            this.statesText = value;
          });
        } else if (response.result.states == 4) { // 支払済
          this.chipColor = 'success';
          this.translateService.get('companyInfoPage.payment').subscribe((value) => {
            this.statesText = value;
          });
        } else {
          this.chipColor = 'light';
        }

      } else {
        alert(response.message);
      }
    });
  }
  
  /**
   * 許可、不許可状態送信
   * @memberof CompanyInfoPage
   */
  async postPermission() {
    const api = '/permission';
    const body = JSON.stringify([
      {
        "address": this.userAddress,
        "id": this.item.id,
        "permission": this.permissionChecked
      }
    ]);
    this.commonService.ajaxPost(api, body).then((response: any) => {
      if (response.success) {
      } else {
        alert(response.message);
      }
    });
  }
}
