import { Component, OnInit } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular/router';

import { Task } from './shared/product/task';
import { TaskService } from './shared/product/task.service';

@Component({
  selector: 'task-list',
  providers: [TaskService],
  templateUrl: 'taskList.component.html'
})

export class TaskListComponent implements OnInit {
  taskList: Array<Task> = [];
  constructor(
    private taskService: TaskService,
    private routerExtensions: RouterExtensions,
  ) {}

  ngOnInit() {
    this.getList();
  }

  getList() {
    this.taskService.getList().subscribe(list => this.taskList = list);
  }

  goBack() {
    this.routerExtensions.back();
  }
}
