import { Component, OnInit } from '@angular/core';
import { EventService } from '../../services/event.service';
@Component({
  selector: 'app-tabs-personal',
  templateUrl: './tabs-personal.page.html',
  styleUrls: ['./tabs-personal.page.scss'],
})
export class TabsPersonalPage implements OnInit {
  // 未読メッセージ数を表示
  public messageCount: string;
  constructor(
    private eventService: EventService,
  ) { }

  ngOnInit() {
    this.eventService.event.on('messageCount', (result) => {
      if (result > 99) {
        this.messageCount = "99+";
      } else {
        this.messageCount = result;
      }
    })
  }
}
