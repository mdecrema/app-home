import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TASK_KEY, Task } from './../../../models/task.model';
import { TranslateService } from '@ngx-translate/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-calendar-modal',
  templateUrl: './calendar-modal.component.html',
  styleUrls: ['./calendar-modal.component.scss'],
})
export class CalendarModalComponent  implements OnInit {
  public task: Task
  public startDate: string;
  public endDate: string;
  public taskForm!: FormGroup;
  public fields: any;

  @Input()
  title: any;

  @Input()
  subTitle: any;

  @Input()
  month: any;

  @Input()
  year: any;

  @Input()
  day: any;
  
  TITLE: TASK_KEY = TASK_KEY.TITLE
  DESCRIPTION: TASK_KEY = TASK_KEY.DESCRIPTION
  STARTDATE: TASK_KEY = TASK_KEY.STARTDATE
  SMALLDATE: TASK_KEY = TASK_KEY.SMALLDATE
  FROMTIME: TASK_KEY = TASK_KEY.FROMTIME
  TOTIME: TASK_KEY = TASK_KEY.TOTIME
  COLOR: TASK_KEY = TASK_KEY.COLOR
  COMPLETED: TASK_KEY = TASK_KEY.COMPLETED

  constructor(
    private translateService: TranslateService,
    public modalCtrl: ModalController
  ) {
    this.startDate = ''
    this.endDate = ''
    this.fields = new Array<any>()
    this.task = {} as Task
  }

  ngOnInit() {
    this.startDate = this.setInitialDate()
    this.endDate = this.setInitialDate(true)

    this.task = {
      title: this.translateService.instant('new_event'),
      description: '-',
      completed: false,
      startDate: new Date(this.startDate).getMilliseconds(),
      smallDate: new Date(this.startDate).getMilliseconds(),
      fromTime: '00:00',
      toTime: '23:59',
      color: ''
    }

    const form = this.buildForm();
    console.log(form)
  }

  public onChangeTitle(ev: any) {
    this.task.title = ev.target.value
  }

  public onChangeKeyValue(key: TASK_KEY, ev: any) {
    switch (key) {
      case TASK_KEY.TITLE:
      case TASK_KEY.DESCRIPTION:

        this.task[key] = ev.target.value

        break;
      case TASK_KEY.STARTDATE:

        const startValue = ev.target.value
        const startDate = startValue.split('T')[0]
        const fromTime = startValue.split('T')[1]

        this.task[key] = new Date(startDate).getTime()
        this.task.fromTime = fromTime

        break;

      case TASK_KEY.SMALLDATE:

        const endValue = ev.target.value
        const endDate = endValue.split('T')[0]
        const toTime = endValue.split('T')[1]

        this.task[key] = new Date(endDate).getTime()
        this.task.toTime = toTime
      
        break;
    
      default:
        break;
    }
  }

  public setInitialDate(isEnd: boolean = false): string {
    const time = !isEnd ? 'T00:00' : 'T23:59'
    const day = this.day.length < 2 ? `0${this.day}` : `${this.day}`
    const month = this.month.length < 2 ? `0${this.month}` : `${this.month}`

    return `${this.year}-${month}-${day}${time}`
  }

  public buildForm() {
    const formGroupFields = this.getFormControlsFields();
    this.taskForm = new FormGroup(formGroupFields);
  }

  public getFormControlsFields() {

    const formGroupFields: any = {};

    const task: any = this.task;

    for (const field of Object.keys(task)) {

        const fieldProps: any = field;

        formGroupFields[fieldProps] = new FormControl(fieldProps, [Validators.required]);

        this.fields.push({ ...fieldProps, fieldName: fieldProps });
    }

    return formGroupFields;
  }

  public setTextTranslation(key: string) {
    return this.translateService.instant('enter_event_description')
  }

  public onDismiss() {
    this.modalCtrl.dismiss()
  }

  public onSubmit() {
    this.modalCtrl.dismiss(this.task)
  }

}
