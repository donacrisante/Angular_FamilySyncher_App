import { Routes } from '@angular/router';
import { CalendarComponent } from './calendar/calendar.component';
import { AddTaskDialogComponent } from './add-task-dialog/add-task-dialog.component';

export const routes: Routes = [
  { path: '', component: CalendarComponent },
  {
    path: '/tasks/add',
    component: AddTaskDialogComponent
  }
];
