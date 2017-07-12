import { Component, OnInit } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular/router';

import { PullToRefresh } from 'nativescript-pulltorefresh';

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

  loadMoreItems() {
    if (this.taskService.listEnd == false) {
      this.taskService.getList()
        .subscribe(list => this.taskList = this.taskList.concat(list));
    }
  }

  refreshList(args) {
    let self = this;
    setTimeout(function() {
      self.taskService.listEnd = false;
      self.taskService.nextPage = undefined;
      self.getList();
      (<PullToRefresh>args.object).refreshing = false;
    }, 1000);
  }
}
