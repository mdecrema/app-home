import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CalendarModalRoutingModule } from './calendar-modal-routing.module';
import { IonicModule } from '@ionic/angular';
import { CalendarModalComponent } from './calendar-modal.component';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CalendarModalRoutingModule,
    IonicModule
  ]
})
export class CalendarModalModule { }
