import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CalendarModalComponent } from '../modals/calendar-modal/calendar-modal.component';
import { ApiService } from 'src/services/api.service';
import { POPUP_ACTION } from 'src/models/popup.model';
import * as e from 'cors';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent  implements OnInit {
  public taskList: Task[];
  public calendarObj = {};
  public weeks: Array<Array<number | null>> = [];
  public daysOfWeek: string[] = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  public monthsOfYear: string[] = ['genuary', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'dicember'];
  public year: number;
  public month: number;

  constructor(
    private apiService: ApiService,
    public modalCtrl: ModalController
  ) {
    const today = new Date();
    this.year = today.getFullYear();
    this.month = today.getMonth() + 1;
    this.taskList = [];
  }

  ngOnInit() {
    this.generateCalendar(this.year, this.month)

    this.apiService.getAllTasks().subscribe(
      (tasks: any) => {
        this.taskList = tasks
      }
    )
  }
  
  generateCalendar(year: number, month: number): void {
    const firstDay = new Date(year, month - 1, 1);
    const lastDay = new Date(year, month, 0);
    const daysInMonth = lastDay.getDate();

    this.weeks = []; // Clear the previous weeks

    let week: Array<number | null> = new Array(7).fill(null);
    let currentDayOfWeek = (firstDay.getDay() + 6) % 7; // Adjust to start week on Monday

    for (let day = 1; day <= daysInMonth; day++) {
      week[currentDayOfWeek] = day;
      if (currentDayOfWeek === 6 || day === daysInMonth) {
        this.weeks.push(week);
        week = new Array(7).fill(null);
      }
      currentDayOfWeek = (currentDayOfWeek + 1) % 7;
    }
  }

  previousMonth(): void {
    if (this.month === 1) {
      this.month = 12;
      this.year -= 1;
    } else {
      this.month -= 1;
    }
    this.generateCalendar(this.year, this.month);
  }

  nextMonth(): void {
    if (this.month === 12) {
      this.month = 1;
      this.year += 1;
    } else {
      this.month += 1;
    }
    this.generateCalendar(this.year, this.month);
  }

  previousYear(step: number = 1): void {
    this.year -= step;
    this.generateCalendar(this.year, this.month);
  }

  nextYear(step: number = 1): void {
    this.year += step;
    this.generateCalendar(this.year, this.month);
  }

  public convertMonthNumber(month: number) {
    const index = month - 1;
    return this.monthsOfYear[index]
  }

  public async openDayDetails(day: any) {

    const data = {
            title: 'new_event',
            subTitle: 'create_new_event',
            month: this.month,
            year: this.year,
            day: day,
            buttons: [
                {
                    label: 'confirm',
                    action: POPUP_ACTION.CONFIRM
                },
                {
                    label: 'cancel',
                    action: POPUP_ACTION.CANCEL
                }
            ],
            value: ''
    }

    const modal = await this.modalCtrl.create({
      component: CalendarModalComponent,
      componentProps: data,
      cssClass: ''
    });

    modal.present();

    modal.onDidDismiss()
    .then((data) => {

        if (data['data']) {

          const task = data['data']

          this.apiService.storeNewTask(task).subscribe(
            (response) => {
              this.taskList.push(response)
            },
            (error) => {
              console.error('Error saving data', error);
            }
          )
        }
    })
  }

  public hasEvent(day: any) {

    if (day) {
      const dayFixed = day < 10  ? `0${day}` : `${day}`
      const monthFixed = this.month < 10  ? `0${this.month}` : `${this.month}`
      const date = `${this.year}-${monthFixed}-${dayFixed}`
  
      return this.taskList.some((task: any) => {
        const startDateFormatted = this.convertMillisecondsToDate(task.startDate);
        const endDateFormatted = this.convertMillisecondsToDate(task.smallDate);

        return startDateFormatted === date || endDateFormatted === date;
      });
    }

    return false
  }

  private convertMillisecondsToDate(milliseconds: number) {
    const date = new Date(milliseconds);
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  }

  public onSwichYear(ev: any) {
    const value = ev.target.value
    if (value) {
      const year = ev.target.value.split('-')[0]
      this.year = year
  
      return this.generateCalendar(this.year, this.month);
    }
  }

  public onSwichMonth(ev: any) {
    const value = ev.target.value
    if (value) {
      const month = (ev.target.value.split('-')[1]).split('-')[0]
      this.month = month

      return this.generateCalendar(this.year, this.month);
    }
  }

  public onAddEvent() {
    const today = new Date().getDay()

    this.openDayDetails(today)
  }

}
