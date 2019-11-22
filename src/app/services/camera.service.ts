import { Injectable } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { CommonService } from '../services/common.service';
import { TranslateService } from "@ngx-translate/core";
@Injectable({
  providedIn: 'root'
})
export class CameraService {

  constructor(
    private camera: Camera,
    private commonService: CommonService,
    public translateService: TranslateService,
  ) { }

  options: CameraOptions = {
    quality: 100,   // 图片质量
    destinationType: this.camera.DestinationType.DATA_URL, // 返回类型 .FILE_URI 返回文件地址 .DATA_URL 返回base64编码
    encodingType: this.camera.EncodingType.JPEG, // 图片格式 JPEG=0 PNG=1
    mediaType: this.camera.MediaType.PICTURE, // 媒体类型
    sourceType: this.camera.PictureSourceType.CAMERA, // 图片来源  CAMERA相机 PHOTOLIBRARY 图库
    allowEdit: false, // 允许编辑
    targetWidth: 800, // 缩放图片的宽度
    // targetHeight: 300, // 缩放图片的高度
    saveToPhotoAlbum: false, // 是否保存到相册
    correctOrientation: true, // 设置摄像机拍摄的图像是否为正确的方向
    cameraDirection: 0,         //前后摄像头类型：Back= 0,Front-facing = 1
  }

  /**
   * 得到图片
   * type:调用相机类型，camera：相机 photo：相册
   * call: 回调函数
   */
  getPicture(sourceType, PictureSourceType = 'DATA_URL') {
    this.options.sourceType = sourceType == 'CAMERA' ? this.camera.PictureSourceType.CAMERA : this.camera.PictureSourceType.PHOTOLIBRARY;
    this.options.destinationType = PictureSourceType == 'DATA_URL' ? this.camera.DestinationType.DATA_URL : this.camera.DestinationType.FILE_URI;
    return new Promise((resolve, reject) => {
      if (this.commonService.isMobile()) {
        this.camera.getPicture(this.options).then(data => {
          resolve(data)
        }, err => {
          reject(err)
        });
      } else {
        this.translateService.get('commonMsg.msg005').subscribe((value) => {
          reject(value);
          console.log(value);
        });
      }
    })
  }
}
