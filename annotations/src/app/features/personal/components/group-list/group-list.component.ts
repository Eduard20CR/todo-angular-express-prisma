import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AddGroupComponent } from '../add-group/add-group.component';

@Component({
  selector: '[app-group-list]',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, AddGroupComponent],
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.scss'],
  host: { class: 'w-full' },
})
export class GroupListComponent {
  groups = ['', '', '', '', '', '', '', '', ''];

  mobileMenuOpen = true;
  isMobile = true;
}
