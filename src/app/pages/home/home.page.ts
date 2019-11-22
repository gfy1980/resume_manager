import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertController, LoadingController, ToastController, IonSlides } from "@ionic/angular";
import { TranslateService } from "@ngx-translate/core";
import { BaseUI } from '../common/baseui';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { CommonService } from '../../services/common.service';
import { EventService } from '../../services/event.service';

/**
 * @export 個人スマホン 
 * @class HomePage
 * @extends {BaseUI}
 * @implements {OnInit}
 */
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage extends BaseUI implements OnInit {


  @ViewChild(IonSlides, { static: true }) slides: IonSlides;

  public slideOpts = {
    speed: 500,
    effect: 'flip',  //轮播效果
    autoplay: {
      delay: 2000,
      disableOnInteraction: false//这个属性很关键，拖动完自动播放
    },
    loop: true
  };
  public bannerList: any = [];
  public dataList: any = [];
  public loadDataList: any = [];
  public searchParam: string;
  private userAddress: string;
  private messageCount: string;
  private scoutPage: number;
  public divshow: boolean;
  constructor(
    public alertController: AlertController,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public translateService: TranslateService,
    public commonService: CommonService,
    private statusBar: StatusBar,
    private eventService: EventService
  ) {
    super();
    // let status bar overlay webview
    // this.statusBar.overlaysWebView(true);
    // set status bar to white
    if (this.commonService.isMobile()) {
      this.statusBar.backgroundColorByHexString('#1996DD');
    }
  }

  /**
   * 初期化
   *
   * @memberof HomePage
   */
  ngOnInit() {
    // ユーザアドレス
    this.commonService.storageGet('address').then((value: string) => {
      this.userAddress = value;
    })
    this.searchParam = "";
    this.scoutPage = 1;
    this.divshow = true;
    this.getMessage();
    this.getScoutList(false);
    this.bannerList = [
      { "id": "0", "url": "http://thumbs.dreamstime.com/b/%E9%A3%9E%E8%A1%8C%E5%B9%BF%E5%91%8A%E6%A8%AA%E5%B9%85-%E9%A3%9E%E8%A1%8C%E4%B8%8E%E5%9C%A8%E8%93%9D%E5%A4%A9%E8%83%8C%E6%99%AF%E7%9A%84-%E5%B9%B3%E7%9A%84%E6%A8%AA%E5%B9%85-93035166.jpg" },
      { "id": "1", "url": "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1679769573,1689034488&fm=26&gp=0.jpg" },
      { "id": "2", "url": "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3196560053,2522877159&fm=15&gp=0.jpg" },
    ];
    // for (let i = 0; i < 10; i++) {
    //   let data = { "id": `${i}`, "name": `我是第${i}条数据` }
    //   this.dataList.push(data);
    // }
  }
  // async testGetStorage() {
  //        setTimeout(() => {
  //         this.commonService.storageGet('username').then((value) => {
  //           console.log(value);
  //         });
  //        }, 500);
  // }
  // 界面重新进入时，轮播图自动播放
  ionViewWillEnter() {
    if (this.slides) {
      this.slides.startAutoplay();
    }
  }
  // 退出界面时，轮播图停止
  ionViewWillLeave() {
    if (this.slides) {
      this.slides.stopAutoplay();
    }
  }

  slideDidChange() {
    if (this.slides) {
      this.slides.startAutoplay();
    }
  }

  loadData(event: any) {
    setTimeout(() => {
      this.scoutPage = this.scoutPage + 1;
      this.getScoutList(true);
      // for (let i = 0; i < 10; i++) {
      //   let data = { "id": `${i}`, "name": `这是第${i}条上拉数据--服务器获取` }
      //   this.dataList.push(data);
      // }
      event.target.complete(); // 告诉ion-infinite-scroll数据已经更新完成 不加这句话的话会卡死
      // // 当列表条数到达最大值禁用上拉
      // if (this.dataList.length > 40) {
      //   event.target.disabled = true;
      // }
    }, 1000);
  }

  doRefresh(event: any) {
    setTimeout(() => {
      // for (let i = 10; i < 15; i++) {
      //   let data = { "id": `${i}`, "name": `这是第${i}下拉数据` }
      //   this.dataList.unshift(data);
      // }
      this.scoutPage = 1;
      this.getScoutList(false);
      event.target.complete(); // 告诉ion-refresher 更新数据
    }, 2000);
  }

  /**
   * 企業を選択する
   *
   * @param {*} item
   * @memberof HomePage
   */
  onItemClick(item: any) {
    console.log(item);
    this.commonService.storageGet('username').then((value) => {
      console.log(value);
    });
    this.commonService.forward('/company-info', { queryParams: { item: item } });
  }

  /**
   * 検索ボタン押して
   *
   * @memberof HomePage
   */
  onSearchClick() {
    console.log(this.searchParam)
    this.divshow = false;
    this.scoutPage = 1;
    this.getScoutList(false);
  }
  /**
   * 最新メッセージ情報を取得する
   *
   * @memberof LoginPage
   */
  async getMessage() {
    const api = '/message';
    const body = JSON.stringify([
      {
        "address": this.userAddress
      }
    ]);
    this.commonService.ajaxPost(api, body).then((response: any) => {
      if (response.success) {
        this.messageCount = response.result.count;
        this.eventService.event.emit('messageCount', this.messageCount);
      } else {
        alert(response.message);
      }
    });
  }

  /**
   * ピックアップ情報を取得する
   *
   * @memberof LoginPage
   */
  async getPickup() {
    const api = '/pickup';
    const body = JSON.stringify([
      {
        "page": this.userAddress
      }
    ]);
    this.commonService.ajaxPost(api, body).then((response: any) => {
      if (response.success) {
        this.messageCount = response.result.count;
      } else {
        alert(response.message);
      }
    });
  }

  /**
  * スカウト一覧情報を取得する
  *
  * @memberof LoginPage
  */
  async getScoutList(isLoad: boolean) {
    const api = '/scoutlist';
    const body = JSON.stringify([
      {
        "address": this.userAddress,
        "page": this.scoutPage,
        "param": this.searchParam
      }
    ]);
    this.commonService.ajaxPost(api, body).then((response: any) => {
      if (response.success) {
        this.loadDataList = response.result.scout;
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
}
