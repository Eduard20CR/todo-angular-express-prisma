import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-not-selected',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './not-selected.component.html',
  styleUrls: ['./not-selected.component.scss'],
  host: { class: 'flex w-full align-center justify-center items-center' },
})
export class NotSelectedComponent {}
