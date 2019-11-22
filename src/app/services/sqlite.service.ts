import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject, SQLiteTransaction } from "@ionic-native/sqlite/ngx";
import { Platform, Events } from '@ionic/angular';
import { CommonService } from '../services/common.service';
@Injectable({
  providedIn: 'root'
})
export class SqliteService {
  database: SQLiteObject;
  win_db: any;//H5数据库对象
  win: any = window;//window对象
  constructor(
    private sqlite: SQLite,
    private platform: Platform,
    private events: Events,
    private commonService: CommonService,
    ) {
  }

  initDatabase() {
    if (this.commonService.isMobile()) {
      this.sqlite.create({
        name: 'dms.db',
        location: 'default'
      })
        .then((db: SQLiteObject) => {
          this.database = db;
          //创建表
          this.createTable();
          console.log('init database successfully')
        })
        .catch(e => {
          console.log(e)
        });
    } else {
      //H5数据库存储
      this.win_db = this.win.openDatabase("dms.db", '1.0', 'database', 5 * 1024 * 1024);//声明H5 数据库大小
      this.createTable();
    }
  }

  /**
    * 创建表
    */
  async createTable() {
    // this.querySql('', []);
    //可能存在多个执行创建表语句，只需最后一个使用await 
    await this.executeSql('CREATE TABLE IF NOT EXISTS users(userid VARCHAR(250) NOT NULL PRIMARY KEY, username VARCHAR(250) NOT NULL, furigana VARCHAR(250), password VARCHAR(30) NOT NULL,istoggled boolean, email VARCHAR(250), companycode VARCHAR(250), companyname VARCHAR(250), companyurl VARCHAR(250), companymail VARCHAR(250))', []);
  }

  /**
   * 执行语句
   */
  executeSql(sql: string, array: Array<string>): Promise<any> {
    return new Promise((resolve, reject) => {
      if (!!!!this.database) {
        this.database.executeSql(sql, array).then((data) => {
          resolve(data);
        }, (err) => {
          reject(err);
          console.log('Unable to execute sql: ' + err);
        });

      } else {
        return new Promise((resolve) => {
          resolve([]);
        });
      }
    });
  }

  /**
    * 查询H5数据库
    */
  execWebSql(sql: string, params: Array<string>): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        this.win_db.transaction((tx) => {
          tx.executeSql(sql, params,
            (tx, res) => resolve(res),
            (tx, err) => reject(err));
        },
          (err) => reject(err));
      } catch (err) {
        reject(err);
      }
    });
  }
}
