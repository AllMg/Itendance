import {Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import { CalendarComponent } from 'ng-fullcalendar';
import { Options } from 'fullcalendar';
import {CalendarDataModel} from '../../models/CalendarDataModel';

@Component({
  selector: 'app-calendrier',
  templateUrl: './calendrier.component.html',
  styleUrls: ['./calendrier.component.css']
})
export class CalendrierComponent implements OnInit, OnChanges {
  calendarOptions: Options;
  events: any;
  @Input() data: CalendarDataModel[];
  @Input() right =  '';
  @Input() date: Date;
  @ViewChild(CalendarComponent) ucCalendar: CalendarComponent;
  constructor() {
    if (this.right === '') {
      this.right = 'month,agendaWeek';
    }
  }

  ngOnInit() {
    this.calendarOptions = {
      locale: 'fr',
      editable: true,
      eventLimit: false,
      header: {
        left: 'prev,next today',
        center: 'title',
        right: this.right
      },
      events: this.data
    };
  }
  clickday(event)  {
      this.ucCalendar.fullCalendar('changeView', 'agendaDay');
      this.ucCalendar.fullCalendar('gotoDate', event.detail.date);
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes.data) {
      this.events = changes.data.currentValue;
      if (this.ucCalendar) {
        this.ucCalendar.fullCalendar('renderEvent', this.events);
        this.ucCalendar.updateEvent(this.data);
      }
    }
    if (changes.right) {
      this.right = changes.right.currentValue;
    }
    if (changes.date) {
      this.date = changes.date.currentValue;
      console.log(this.date);
      if (this.date) {
        this.ucCalendar.fullCalendar('gotoDate', this.date);
      } else {
        this.ucCalendar.fullCalendar('gotoDate', new Date());
      }
    }
  }
  eventClick($event) {
    this.ucCalendar.fullCalendar('changeView', 'agendaDay');
    this.ucCalendar.fullCalendar('gotoDate', $event.event.start._i);
  }
}
