import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, catchError, map, of, tap } from 'rxjs';
import { environment } from './../environments/environment';
import { Task } from './../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiServerUri: string;

  public _taskList$ = new BehaviorSubject<Task[]>([])

  constructor(
    private httpClient: HttpClient 
  ) { 
    this.apiServerUri = environment.apiServerUri
  }

  // Get task list
  public getAllTasks(): Observable<Task[]> {
    return this.httpClient.get<Task[]>(`${this.apiServerUri}tasks/`).pipe(
      tap(taskList => this._taskList$.next(taskList))
    );
  }

  // Save new task
  public storeNewTask(task: Task) {
    // const httpOptions = {
    //   headers: new HttpHeaders({
    //     'Access-Control-Allow-Origin':'*',
    //     'Content-Type':  'application/json'
    //   })
    // };

    return this.httpClient.post<Task>(`${this.apiServerUri}tasks/`, task)
      .pipe(
        map((data: any) => {
          // this._taskList$.push(data)
          return data
        }),
        catchError((err) => {
          return of(err)
        })
      );
  }

  public geTaskList$(): Observable<Task[]> {
    return this._taskList$.asObservable()
}

public setLayoutList$(layoutList: Task[]) {
    this._taskList$.next(layoutList)
}
}
