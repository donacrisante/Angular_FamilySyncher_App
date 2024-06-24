import { Component } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { TasksComponent } from './tasks/tasks.component';
import { FamilyMembersComponent } from './family-members/family-members.component';
import { CalendarComponent } from './calendar/calendar.component';
import { RouterOutlet } from '@angular/router';
import { bootstrapApplication } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent, TasksComponent, FamilyMembersComponent, CalendarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'FamilySyncher';
}

bootstrapApplication(AppComponent);
