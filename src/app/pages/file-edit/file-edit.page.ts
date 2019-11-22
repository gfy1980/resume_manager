import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { TranslateService } from "@ngx-translate/core";
import { CommonService } from '../../services/common.service';
import { BaseUI } from '../common/baseui';
import { ActivatedRoute, Router } from '@angular/router';

/**
 * @export 編集
 * @class FileEditPage
 * @extends {BaseUI}
 * @implements {OnInit}
 */
@Component({
  selector: 'app-file-edit',
  templateUrl: './file-edit.page.html',
  styleUrls: ['./file-edit.page.scss'],
})
export class FileEditPage extends BaseUI implements OnInit {
  // 表示用データリスト
  public dataList: any = [];
  // サーバから取得のデータリスト
  public loadDataList: any = [];
  // 編集したのデータリスト
  public postDataList: any = [];
  // ユーザアドレス
  private userAddress: string;
  // ファイルID
  private fileid: string;
  // 分ページ用
  private page: number;
  constructor(
    public route: ActivatedRoute,
    public router: Router,
    public commonService: CommonService,
    public alertController: AlertController,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public translateService: TranslateService,
  ) {
    super();
    const queryParams = this.route.snapshot.queryParams;
    this.fileid = queryParams.fileid;
  }

  /**
   * 初期化
   *
   * @memberof FileEditPage
   */
  ngOnInit() {
    // ユーザアドレス
    this.commonService.storageGet('address').then((value: string) => {
      this.userAddress = value;
    })
    this.getEditList(false);
  }

  /**
   * 戻る
   *
   * @memberof FileEditPage
   */
  async doBack() {
    // ファイル画面へ
    this.commonService.back('/tabs-personal/file');
  }

  loadData(event: any) {
    setTimeout(() => {
      this.page = this.page + 1;
      this.getEditList(true);
      event.target.complete();
    }, 1000);
  }

  doRefresh(event: any) {
    setTimeout(() => {
      this.page = 1;
      this.getEditList(false);
      event.target.complete();
    }, 2000);
  }

  /**
   * 完了ボタン押して
   *
   * @memberof FileEditPage
   */
  async doNext() {
    this.postEditData();
  }

  /**
   * セキュリティ変更
   * @param {*} item
   * @memberof FileEditPage
   */
  onToggleChange(item: any) {
    // 変更リスト作成
    for (let i = 0; i < this.loadDataList.length; i++) {
      let tmpitem = this.loadDataList[i];
      if (tmpitem.id == item.id) {
        if (tmpitem.permission == item.permission) {
          for (let j = 0; j < this.postDataList.length; j++) {
            if (item.permission == this.postDataList[j].permission) {
              this.postDataList.splice(j, 1);
            }
          }
        } else {
          this.postDataList.push(item);
        }
      }
    }
    console.log(this.postDataList);
  }


  /**
  * 企業選択一覧情報を取得する
  *
  * @memberof LoginPage
  */
  async getEditList(isLoad: boolean) {
    const api = '/fileedit';
    const body = JSON.stringify([
      {
        "address": this.userAddress,
        "fileid": this.fileid,
        "page": this.page
      }
    ]);
    this.commonService.ajaxPost(api, body).then((response: any) => {
      if (response.success) {
        this.loadDataList = response.result.history;
        if (isLoad) {
          for (let i = 0; i < this.loadDataList.length; i++) {
            this.dataList.push(this.loadDataList[i]);
          }
        } else {
          this.dataList = JSON.parse(JSON.stringify(this.loadDataList));
        }
      } else {
        alert(response.message);
      }
    });
  }

  /**
   * 編集したのデータリスト送信
   *
   * @memberof FileEditPage
   */
  async postEditData() {
    const api = '/fileedit';
    const body = JSON.stringify([
      {
        "address": this.userAddress,
        "filelist": this.postDataList,
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
