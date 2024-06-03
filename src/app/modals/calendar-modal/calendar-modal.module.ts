import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CalendarModalRoutingModule } from './calendar-modal-routing.module';
import { IonicModule } from '@ionic/angular';
import { CalendarModalComponent } from './calendar-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CalendarModalRoutingModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class CalendarModalModule { }
