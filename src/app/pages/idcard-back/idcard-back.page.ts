import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, ToastController } from "@ionic/angular";
import { TranslateService } from "@ngx-translate/core";
import { BaseUI } from '../common/baseui';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from '../../services/common.service';
import { CameraService } from '../../services/camera.service';

/**
 *
 *
 * @export 身分証明書裏面写真
 * @class IdcardBackPage
 * @extends {BaseUI}
 * @implements {OnInit}
 */
@Component({
  selector: 'app-idcard-back',
  templateUrl: './idcard-back.page.html',
  styleUrls: ['./idcard-back.page.scss'],
})
export class IdcardBackPage extends BaseUI implements OnInit {
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
  ) {
    super();
  }

  /**
   * 初期化
   *
   * @memberof IdcardBackPage
   */
  ngOnInit() {
    this.base64Img = '';
    this.base64Data = '';
    const queryParams = this.route.snapshot.queryParams;
    this.pageType = queryParams.pageType;
    this.title = "";
  }

  /**
   * 戻る
   * 
   * @memberof IdcardBackPage
   */
  async doBack() {
    // 身分証明書正面写真画面へ
    this.commonService.back('/idcard-positive');
  }

  /**
   * 次へ
   *
   * @memberof IdcardBackPage
   */
  async doNext() {
    // 身分証明書正面写真を保存する
    await this.commonService.storageSet('idcard-b', this.base64Data);
    // アカウント登録済画面へ
    this.commonService.forward('/account-create-finish');
  }

  /**
   * カメラから写真を取得する
   *
   * @memberof IdcardBackPage
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
