import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css',
})
export class CalendarComponent implements OnInit {
  familyMembers = [
    { name: 'Daniel', color: '#FF5733' },
    { name: 'Martina', color: '#33FF57' },
    { name: 'Lara', color: '#3357FF' },
    { name: 'Anni', color: '#F39C12' },
    { name: 'Jule', color: '#9db4c9' },
    { name: 'Emil', color: '#e8b0b1' },
  ];

  viewMode: 'day' | 'week' | 'month' = 'month'; // Standardansicht

  // Variablen für die Monatsansicht
  currentMonth!: number;
  currentYear!: number;
  daysInMonth: { day: string; date: number; belongsToCurrentMonth: boolean }[] =
    [];
  monthName!: string;

  // Variablen für die Wochenansicht
  currentWeek: { day: string; date: number }[] = [];
  weekDays: string[] = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'];
  currentWeekStartDate!: Date;

  // Variablen für die Tagesansicht
  selectedDay!: Date;
  dayAppointments: { time: string; description: string }[] = [
    { time: '', description: '' }, // Platzhalter für Tagesansichtstermine
  ];

  ngOnInit() {
    const today = new Date();
    this.currentMonth = today.getMonth(); // Monat von 0 (Januar) bis 11 (Dezember)
    this.currentYear = today.getFullYear();
    this.currentWeekStartDate = this.getStartOfWeek(today);
    this.selectedDay = today;
    this.updateCalendar();
  }

  updateCalendar(): void {
    this.daysInMonth = this.getDaysInMonth(this.currentMonth, this.currentYear);
    this.monthName = this.getMonthName(this.currentMonth);
    if (this.viewMode === 'week') {
      this.currentWeek = this.getCurrentWeek(this.currentWeekStartDate);
    } else if (this.viewMode === 'day') {
      this.loadDayAppointments(this.selectedDay);
    }
  }

  getDaysInMonth(
    month: number,
    year: number
  ): { day: string; date: number; belongsToCurrentMonth: boolean }[] {
    const days = [];
    const date = new Date(year, month, 1);
    const dayNames = ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'];

    // Tage des aktuellen Monats hinzufügen
    while (date.getMonth() === month) {
      days.push({
        day: dayNames[date.getDay()],
        date: date.getDate(),
        belongsToCurrentMonth: true,
      });
      date.setDate(date.getDate() + 1);
    }

    // Tage des vorherigen Monats hinzufügen
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const daysInPreviousMonth = new Date(year, month, 0).getDate();
    const dayOfWeekFirstDay = firstDayOfMonth === 0 ? 7 : firstDayOfMonth; // Falls Sonntag, als letzter Wochentag betrachten
    for (let i = 0; i < dayOfWeekFirstDay - 1; i++) {
      const prevDate = new Date(year, month, -i);
      days.unshift({
        day: dayNames[prevDate.getDay()],
        date: daysInPreviousMonth - i,
        belongsToCurrentMonth: false,
      });
    }

    // Tage des nächsten Monats hinzufügen
    const lastDayOfMonth = new Date(year, month + 1, 0).getDay();
    for (let i = 1; i < 7 - (lastDayOfMonth === 0 ? 7 : lastDayOfMonth); i++) {
      const nextDate = new Date(year, month + 1, i);
      days.push({
        day: dayNames[nextDate.getDay()],
        date: i,
        belongsToCurrentMonth: false,
      });
    }

    return days;
  }

  getDayName(dayIndex: number): string {
    const dayNames = ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'];
    return dayNames[dayIndex];
  }

  getCurrentWeek(startOfWeek: Date): { day: string; date: number }[] {
    const week = [];
    for (let i = 0; i < 7; i++) {
      const currentDay = new Date(startOfWeek);
      currentDay.setDate(startOfWeek.getDate() + i);
      week.push({
        day: this.getDayName(currentDay.getDay()),
        date: currentDay.getDate(),
      });
    }
    return week;
  }

  getMonthName(month: number): string {
    const monthNames = [
      'Januar',
      'Februar',
      'März',
      'April',
      'Mai',
      'Juni',
      'Juli',
      'August',
      'September',
      'Oktober',
      'November',
      'Dezember',
    ];
    return monthNames[month];
  }

  getStartOfWeek(date: Date): Date {
    const day = date.getDay(); // Sonntag - Samstag : 0 - 6
    const diff = date.getDate() - day + (day === 0 ? -6 : 1); // Adjust when day is sunday
    return new Date(date.setDate(diff));
  }

  getFormattedWeekRange(): string {
    const options: Intl.DateTimeFormatOptions = { month: 'short', day: '2-digit' };
    const startOfWeek = this.currentWeekStartDate.toLocaleDateString('de-DE', options);
    const endOfWeek = new Date(this.currentWeekStartDate);
    endOfWeek.setDate(this.currentWeekStartDate.getDate() + 6);
    const endOfWeekFormatted = endOfWeek.toLocaleDateString('de-DE', options);
    const year = this.currentWeekStartDate.getFullYear();
    return `${startOfWeek} - ${endOfWeekFormatted}, ${year}`;
  }

  getFormattedDay(): string {
    const options: Intl.DateTimeFormatOptions = { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' };
    return this.selectedDay.toLocaleDateString('de-DE', options);
  }

  onDayClick(day: { day: string; date: number }): void {
    const selectedDate = new Date(this.currentYear, this.currentMonth, day.date);
    this.selectedDay = selectedDate;
    this.setViewMode('day');
  }

  onViewModeChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    if (target) {
      this.setViewMode(target.value as 'day' | 'week' | 'month');
    }
  }

  setViewMode(mode: 'day' | 'week' | 'month'): void {
    this.viewMode = mode;
    if (mode === 'day') {
      this.selectedDay = new Date(); // Setze auf den aktuellen Tag
      this.loadDayAppointments(this.selectedDay); // Lade Termine für den aktuellen Tag
    }
    this.updateCalendar();
  }

  previousMonth(): void {
    if (this.currentMonth === 0) {
      this.currentMonth = 11;
      this.currentYear--;
    } else {
      this.currentMonth--;
    }
    this.updateCalendar();
  }

  nextMonth(): void {
    if (this.currentMonth === 11) {
      this.currentMonth = 0;
      this.currentYear++;
    } else {
      this.currentMonth++;
    }
    this.updateCalendar();
  }

  previousWeek(): void {
    this.currentWeekStartDate.setDate(this.currentWeekStartDate.getDate() - 7);
    this.updateCalendar();
  }

  nextWeek(): void {
    this.currentWeekStartDate.setDate(this.currentWeekStartDate.getDate() + 7);
    this.updateCalendar();
  }

  previousDay(): void {
    this.selectedDay.setDate(this.selectedDay.getDate() - 1);
    this.updateDayView();
  }

  nextDay(): void {
    this.selectedDay.setDate(this.selectedDay.getDate() + 1);
    this.updateDayView();
  }

  updateDayView(): void {
    this.loadDayAppointments(this.selectedDay); // Beispielaufruf einer Methode zum Laden von Terminen
  }

  loadDayAppointments(date: Date): void {
    // Implementieren Sie hier die Logik zum Laden der Termine für den angegebenen Tag
    // Beispiel: Setzen Sie die dayAppointments basierend auf dem Datum
    /* this.dayAppointments = [
      { time: '09:00', description: 'Meeting mit dem Team' },
      { time: '13:00', description: 'Mittagessen mit Kunden' },
      { time: '15:00', description: 'Projektbesprechung' },
    ]; */
  }
}
