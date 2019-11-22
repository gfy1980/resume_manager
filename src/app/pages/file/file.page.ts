import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, ToastController, ActionSheetController } from '@ionic/angular';
import { TranslateService } from "@ngx-translate/core";
import { CommonService } from '../../services/common.service';
import { BaseUI } from '../common/baseui';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { CameraService } from '../../services/camera.service';

/**
 * @export ファイル
 * @class FilePage
 * @extends {BaseUI}
 * @implements {OnInit}
 */
@Component({
  selector: 'app-file',
  templateUrl: './file.page.html',
  styleUrls: ['./file.page.scss'],
})
export class FilePage extends BaseUI implements OnInit {
  // 表示用ファイルデータリスト
  public dataList: any = [];
  // サーバから取得のファイルデータリスト
  public loadDataList: any = [];
  // ユーザアドレス
  private userAddress: string;
  // 選択のファイルID
  public isActiveId: string;
  public fileTransfer: FileTransferObject = this.transfer.create();
  constructor(
    public commonService: CommonService,
    private camera: CameraService,
    public alertController: AlertController,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public translateService: TranslateService,
    private fileOpener: FileOpener,
    private filePath: FilePath,
    private transfer: FileTransfer,
    private fileChooser: FileChooser,
    public actionSheetController: ActionSheetController,
  ) {
    super();
  }


  /**
   * 初期化
   *
   * @memberof FilePage
   */
  ngOnInit() {
    // ユーザアドレス
    this.commonService.storageGet('address').then((value: string) => {
      this.userAddress = value;
    })
    this.isActiveId = "";
    this.getFileList(false);
  }

  /**
   * 編集ボタン
   *
   * @memberof FilePage
   */
  async toEdit() {
    // 編集画面へ
    this.commonService.forward('/file-edit', { queryParams: { fileid: this.isActiveId } });
  }

  /**
   * 所属連携ボタン
   *
   * @memberof FilePage
   */
  async toAffiliation() {
    // 所属連携画面へ
    this.commonService.forward('/affiliation');
  }

  /**
   * 選択のファイル情報
   *
   * @param {*} item
   * @memberof FilePage
   */
  async onItemClick(item: any) {
    console.log(item);
    this.isActiveId = item.id;
  }

  /**
  * 企業選択一覧情報を取得する
  *
  * @memberof LoginPage
  */
  async getFileList(isLoad: boolean) {
    const api = '/uploadhistory';
    const body = JSON.stringify([
      {
        "address": this.userAddress
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
          this.dataList = this.loadDataList;
        }
      } else {
        alert(response.message);
      }
    });
  }

  /**
   *  アップロード
   */
  async doUpload() {
    let title = "";
    let strCamera = "";
    let strFolder = "";
    let strCancel = "";
    this.translateService.get('filePage.sheetTitle').subscribe((value) => {
      title = value;
    });
    this.translateService.get('common.camera').subscribe((value) => {
      strCamera = value;
    });
    this.translateService.get('common.folder').subscribe((value) => {
      strFolder = value;
    });
    this.translateService.get('common.cancel').subscribe((value) => {
      strCancel = value;
    });
    const actionSheet = await this.actionSheetController.create({
      // header: title,
      mode: 'ios',
      buttons: [{
        text: strCamera,
        icon: 'camera',
        handler: () => {
          this.showCamera();
        }
      }, {
        text: strFolder,
        icon: 'folder',
        handler: () => {
          this.showFileChooser();
        }
      }, {
        text: strCancel,
        // icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }

  async showCamera() {
    this.camera.getPicture('CAMERA', 'FILE_URI').then((uri: string) => {
      // this.base64Data = imageData;
      // this.base64Img = 'data:image/jpeg;base64,' + imageData;
      this.filePath.resolveNativePath(uri)
        .then(filePath => {
          this.postFile(filePath);
        })
    }, (err) => {
      // alert(err);
    });
  }

  async showFileChooser() {
    this.fileChooser.open()
      .then(uri => {
        this.filePath.resolveNativePath(uri)
          .then(filePath => {
            this.postFile(filePath);
          })
      })
      .catch(e => console.log(e));
  }

  /**
   * アップロードファイル
   *
   * @param {*} filePath
   * @memberof FilePage
   */
  postFile(filePath) {
    var fileName = filePath.substring(filePath.lastIndexOf("/") + 1, filePath.length);
    var api = this.commonService.getBaseUrl() + '/uploadfile';
    let options: FileUploadOptions = {
      fileKey: 'file',
      fileName: fileName,
      headers: {},
      params: {
        "address": this.userAddress,
        "fileName": fileName
      }
    }
    this.fileTransfer.upload(filePath, api, options)
      .then((response: any) => {
        console.log(response);
        // success
        if (response.success) {
          this.translateService.get('commonMsg.msg012').subscribe((value) => {
            this.showToast(this.toastCtrl, value);
          });
          this.getFileList(false);
        }
      }, (err) => {
        // error\
        console.log(err);
        alert(err.message);
      })
  }

  // download() {
  // const url = 'http://www.example.com/file.pdf';
  // this.fileTransfer.download(url, this.file.dataDirectory + 'file.pdf').then((entry) => {
  //   console.log('download complete: ' + entry.toURL());
  // }, (error) => {
  //   // handle error
  // });
  // }
}
