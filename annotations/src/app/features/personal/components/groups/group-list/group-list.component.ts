import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLinkActive } from '@angular/router';
import { AddGroupComponent } from '../add-group/add-group.component';
import { AnnotationsGroupsService } from '../../../services/annotations-groups.service';
import { GroupItemComponent } from '../group-item/group-item.component';

@Component({
  selector: '[app-group-list]',
  standalone: true,
  imports: [CommonModule, RouterLinkActive, AddGroupComponent, GroupItemComponent],
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.scss'],
  host: { class: 'w-full' },
})
export class GroupListComponent {
  annotationsGroupsService = inject(AnnotationsGroupsService);
  groups = this.annotationsGroupsService.groups$;

  mobileMenuOpen = true;
  isMobile = true;
}
