import { Component, OnInit } from '@angular/core';
import { NavController, AlertController, LoadingController, ToastController } from '@ionic/angular';
import { TranslateService } from "@ngx-translate/core";
import { CommonService } from '../../services/common.service';
import { BaseUI } from '../common/baseui';
import { ActivatedRoute, Router } from '@angular/router';

/**
 * @export 所属連携
 * @class AffiliationPage
 * @extends {BaseUI}
 * @implements {OnInit}
 */
@Component({
  selector: 'app-affiliation',
  templateUrl: './affiliation.page.html',
  styleUrls: ['./affiliation.page.scss'],
})
export class AffiliationPage extends BaseUI implements OnInit {
  // 表示用データリスト
  public dataList: any = [];
  // サーバーから取得のデータリスト
  public loadDataList: any = [];
  // メッセージ
  private msg009: string;
  private msg010: string;
  // 確定ボタン表示文字
  private okBtn: string;
  // キャンセルボタン表示文字
  private cancelBtn: string;
  // 選択の企業ID
  public isActiveId: string;
  // 選択の企業名称
  public selectName: string;
  // ユーザアドレス
  private userAddress: string;
  // 分ページ用
  private page: number;
  // 検索条件
  public searchParam: string;
  constructor(
    public route: ActivatedRoute,
    public router: Router,
    public commonService: CommonService,
    public alertController: AlertController,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public translateService: TranslateService,
    public nav: NavController
  ) {
    super();
  }

  /**
   * 初期化
   *
   * @memberof AffiliationPage
   */
  ngOnInit() {
    this.translateService.get('common.ok').subscribe((value) => {
      this.okBtn = value;
    });
    this.translateService.get('common.cancel').subscribe((value) => {
      this.cancelBtn = value;
    });
    this.translateService.get('commonMsg.msg010').subscribe((value) => {
      this.msg010 = value;
    });
    // ユーザアドレス
    this.commonService.storageGet('address').then((value: string) => {
      this.userAddress = value;
    })
    this.selectName = "";
    this.searchParam = "";
    this.isActiveId = "";
    // 企業情報リストを取得する
    this.getCompanyList(false);
  }

  /**
   * 戻る
   *
   * @memberof AffiliationPage
   */
  async doBack() {
    // ファイル画面へ
    this.commonService.back('/tabs-personal/file');
  }


  /**
   * データをロード
   * @param {*} event
   * @memberof AffiliationPage
   */
  loadData(event: any) {
    setTimeout(() => {
      this.page = this.page + 1;
      this.getCompanyList(true);
      event.target.complete();
    }, 1000);
  }

  /**
   * 最新データを取得する
   * @param {*} event
   * @memberof AffiliationPage
   */
  doRefresh(event: any) {
    setTimeout(() => {
      this.page = 1;
      this.getCompanyList(false);
      event.target.complete();
    }, 2000);
  }

  /**
   * 企業情報をクリーク
   * @param {*} item
   * @memberof AffiliationPage
   */
  onItemClick(item: any) {
    console.log(item);
    this.isActiveId = item.id;
    this.selectName = item.name;
  }

  /**
   * 検索ボタン押して
   *
   * @memberof HomePage
   */
  onSearchClick() {
    console.log(this.searchParam)
    this.page = 1;
    this.getCompanyList(false);
  }

  /**
   * 削除ボタン押して
   * @returns
   * @memberof AffiliationPage
   */
  async onDeleteClick() {
    // 企業情報選択されないの場合
    if (this.isActiveId == "") {
      this.showToast(this.toastCtrl, this.msg010);
      return;
    }
    this.translateService.get('commonMsg.msg009').subscribe((value) => {
      this.msg009 = value;
    });

    // 確定情報を表示する
    const alert = await this.alertController.create({
      //subHeader: 'Subtitle',
      message: this.msg009,
      buttons: [
        {
          text: this.okBtn,
          handler: () => {
            this.postDelete();
          }
        },
        {
          text: this.cancelBtn,
          handler: () => {
          }
        }
      ]
    });
    await alert.present();
  }

  /**
   * 企業選択して、完了ボタン押して
   * @returns
   * @memberof AffiliationPage
   */
  async doNext() {
     // 企業情報選択されないの場合
    if (this.isActiveId == "") {
      this.showToast(this.toastCtrl, this.msg010);
      return;
    }
    this.postCompanyChoose();
  }

  /**
  * 企業選択一覧情報を取得する
  *
  * @memberof LoginPage
  */
  async getCompanyList(isLoad: boolean) {
    const api = '/companylist';
    const body = JSON.stringify([
      {
        "address": this.userAddress,
        "page": this.page,
        "param": this.searchParam
      }
    ]);
    this.commonService.ajaxPost(api, body).then((response: any) => {
      if (response.success) {
        this.loadDataList = response.result.company;
        if (isLoad) {
          for (let i = 0; i < this.loadDataList.length; i++) {
            this.dataList.push(this.loadDataList[i]);
          }
        } else {
          this.dataList = this.loadDataList;
        }
      } else {
        alert(response.message);
      }
    });
  }

  /**
   * 企業選択削除
   *
   * @memberof AffiliationPage
   */
  async postDelete() {
    if (this.isActiveId != "") {
      const api = '/delcompanychoose';
      const body = JSON.stringify([
        {
          "address": this.userAddress,
          "companyid": this.isActiveId
        }
      ]);
      this.commonService.ajaxPost(api, body).then((response: any) => {
        if (response.success) {
          this.page = 1;
          this.getCompanyList(false);
          alert(response.message);
        } else {
          alert(response.message);
        }
      });
    }
  }

  /**
   * 企業選択
   *
   * @memberof AffiliationPage
   */
  async postCompanyChoose() {
    if (this.isActiveId != "") {
      const api = '/companychoose';
      const body = JSON.stringify([
        {
          "address": this.userAddress,
          "companyid": this.isActiveId
        }
      ]);
      this.commonService.ajaxPost(api, body).then((response: any) => {
        if (response.success) {
          // ファイル画面へ
          this.commonService.back('/tabs-personal/file');
        } else {
          alert(response.message);
        }
      });
    }
  }
}
