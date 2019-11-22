import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, ToastController, ActionSheetController } from "@ionic/angular";
import { TranslateService } from "@ngx-translate/core";
import { BaseUI } from '../common/baseui';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from '../../services/common.service';
import { CameraService } from '../../services/camera.service';

/**
 *
 *
 * @export 身分証明書正面写真
 * @class IdcardPositivePage
 * @extends {BaseUI}
 * @implements {OnInit}
 */
@Component({
  selector: 'app-idcard-positive',
  templateUrl: './idcard-positive.page.html',
  styleUrls: ['./idcard-positive.page.scss'],
})
export class IdcardPositivePage extends BaseUI implements OnInit {
  // 表示用タイトル
  public title: string;
  // 企業担当者、個人区分タイプ
  private pageType: number;
  // 送信用イメージ
  public base64Img: string
  // 表示用イメージ
  private base64Data: string;
  constructor(
    public route: ActivatedRoute,
    public router: Router,
    public alertController: AlertController,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public translateService: TranslateService,
    private commonService: CommonService,
    private camera: CameraService,
    private actionSheetCtrl: ActionSheetController
  ) {
    super();
  }
  /**
   * 初期化
   * @memberof IdcardPositivePage
   */
  ngOnInit() {
    this.base64Img = '';
    this.base64Data = '';
    const queryParams = this.route.snapshot.queryParams;
    this.pageType = queryParams.pageType;
    this.getTitle();
  }

  /**
   * 戻る
   *
   * @memberof IdcardPositivePage
   */
  async doBack() {
    let backPage: string = "";
    if (this.pageType == 0) {     // 個人
      // 個人画面へ
      backPage = '/personal-account';
    } else if (this.pageType == 1) { // 企業担当者
      // 企業担当者画面へ
      backPage = '/company-account';
    }
    this.commonService.back(backPage);
  }

  /**
   * 次へ
   */
  async doNext() {
    // 身分証明書正面写真を保存する
    await this.commonService.storageSet('idcard-p', this.base64Data);
    // 身分証明書裏面写真画面へ
    this.commonService.forward('/idcard-back');
  }

  /**
   *
   * タイトルを設定する
   * 
   * @memberof IdcardPositivePage
   */
  getTitle() {
    if (this.pageType == 0) { // 個人
      this.translateService.get('companyAccountPage.title').subscribe((value) => {
        this.title = value;
      });
    } else if (this.pageType == 1) { // 企業担当者
      this.translateService.get('personalAccountPage.title').subscribe((value) => {
        this.title = value;
      });
    }
  }

  /**
   * カメラから写真を取得する
   *
   * @memberof IdcardPositivePage
   */
  openCamera() {
    this.camera.getPicture('CAMERA', 'DATA_URL').then((imageData: string) => {
      this.base64Data = imageData;
      this.base64Img = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      // alert(err);
    });
  }
}
