import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-family-members',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './family-members.component.html',
  styleUrl: './family-members.component.css',
})
export class FamilyMembersComponent {
  familyMembers: string[] = [
    'Daniel',
    'Martina',
    'Lara',
    'Anni',
    'Jule',
    'Emil',
  ];
}
