import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NavController, AlertController, LoadingController, ToastController } from "@ionic/angular";
import { TranslateService } from "@ngx-translate/core";
import { ActivatedRoute, Router } from '@angular/router';
import { BaseUI } from '../common/baseui';
import { CommonService } from '../../services/common.service';

/**
 * 
 * @export 企業担当者
 * @class CompanyAccountPage
 * @extends {BaseUI}
 * @implements {OnInit}
 */
@Component({
  selector: 'app-company-account',
  templateUrl: './company-account.page.html',
  styleUrls: ['./company-account.page.scss'],
})
export class CompanyAccountPage extends BaseUI implements OnInit {
  @ViewChild('companyCodeInput', { static: true }) companyCodeInput: any;
  @ViewChild('companyNameInput', { static: true }) companyNameInput: any;
  @ViewChild('companyUrlInput', { static: true }) companyUrlInput: any;
  @ViewChild('companyMailInput', { static: true }) companyMailInput: any;
  // 会社コード
  public companyCode: string;
  // 会社名称
  public companyName: string;
  // 会社URL
  public companyUrl: string;
  // メールアドレス
  public companyMail: string;
  // 入力チェックエラー情報
  private msg002: string;
  private msg003: string;
  // 会社コード
  private companyCodeTitle: string;
  // 会社名称
  private companyNameTitle: string;
  // 会社URL
  private companyUrlTitle: string;
  // メールアドレス
  private companyMailTitle: string;
  constructor(
    public route: ActivatedRoute,
    public router: Router,
    public alertController: AlertController,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public translateService: TranslateService,
    public nav: NavController,
    private commonService: CommonService,
  ) {
    super();
  }

  /**
   * 初期化
   *
   * @memberof CompanyAccountPage
   */
  ngOnInit() {
    this.companyCode = '';
    this.companyName = '';
    this.companyUrl = '';
    this.companyMail = '';
    this.translateService.get('companyAccountPage.companyCode').subscribe((value) => {
      this.companyCodeTitle = value;
    });
    this.translateService.get('companyAccountPage.companyName').subscribe((value) => {
      this.companyNameTitle = value;
    });
    this.translateService.get('companyAccountPage.companyUrl').subscribe((value) => {
      this.companyUrlTitle = value;
    });
    this.translateService.get('companyAccountPage.companyMail').subscribe((value) => {
      this.companyMailTitle = value;
    });
  }

  /**
   * 戻る
   *
   * @memberof CompanyAccountPage
   */
  async doBack() {
    // アカウント作成画面へ
    this.commonService.back('/account-create');
  }

  /**
   * 次へ
   *
   * @memberof CompanyAccountPage
   */
  async doNext() {
    if (this.doSubmitCheck()) {
      // 入力データ保存
      this.saveInputData();
      // 身分証明書正面写真画面へ
      this.commonService.forward('/idcard-positive', { queryParams: { pageType: 1 } });
    }
  }

  /**
   * 入力データを保存する
   * @memberof CompanyAccountPage
   */
  saveInputData() {
    // 会社コード
    this.commonService.storageSet('create_companycode', this.companyCode);
    // 会社名称
    this.commonService.storageSet('create_companyname', this.companyName);
    // 会社URL
    this.commonService.storageSet('create_companyurl', this.companyUrl);
    // メールアドレス
    this.commonService.storageSet('create_companymail', this.companyMail);
  }

  /**
   * 入力内容チェック
   *
   * @private
   * @returns
   * @memberof CompanyAccountPage
   */
  private doSubmitCheck() {

    if (this.companyCode == "") {
      this.translateService.get('commonMsg.msg002', { param: this.companyCodeTitle }).subscribe((value) => {
        this.msg002 = value;
      });
      super.showToast(this.toastCtrl, this.msg002);
      this.companyCodeInput.setFocus();
      return false;
    }

    if (this.companyName == "") {
      this.translateService.get('commonMsg.msg002', { param: this.companyNameTitle }).subscribe((value) => {
        this.msg002 = value;
      });
      super.showToast(this.toastCtrl, this.msg002);
      this.companyNameInput.setFocus();
      return false;
    }
    if (this.companyUrl != "") {
      // URLチェック
      const isUrlCheck = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\*\+,;=.]+$/.test(this.companyUrl);
      if (!isUrlCheck) {
        this.translateService.get('commonMsg.msg003').subscribe((value) => {
          this.msg003 = value;
        });
        super.showToast(this.toastCtrl, this.msg003);
        this.companyUrlInput.setFocus();
        return false;
      }
    }
    if (this.companyMail != "") {
      // メールチェック
      const ischeck = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(this.companyMail);
      if (!ischeck) {
        this.translateService.get('commonMsg.msg003').subscribe((value) => {
          this.msg003 = value;
        });
        super.showToast(this.toastCtrl, this.msg003);
        this.companyMailInput.setFocus();
        return false;
      }
    }
    return true;
  }
}
