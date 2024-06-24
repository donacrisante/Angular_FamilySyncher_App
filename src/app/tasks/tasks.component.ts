import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css'
})
export class TasksComponent {
  tasks: string[] = [
    'Hunde füttern',
    'Katzen füttern',
    'Kaninchen füttern',
    'Mit dem Hund Gassi gehen',
    'Müll rausbringen',
    'Staubsaugen',
    'Spülmaschine ausräumen',
    'Pflanzen gießen',
    'Garten gießen',
  ];

}
