import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/services/api.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
})
export class TasksComponent  implements OnInit {
  public tasksList: any[];

  constructor(
    private apiService: ApiService
  ) { 
    this.tasksList = [];
  }

  ngOnInit() {
    this.apiService.getAllTasks().subscribe(
      (tasks: any) => {
        this.tasksList = tasks
      }
    )
  }

  public setStatusMessage(status: boolean): string {
    return status
      ? 'Completed'
      : 'To do'
  }

}
