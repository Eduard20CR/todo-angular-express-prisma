import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLinkActive } from '@angular/router';
import { AddGroupComponent } from '../add-group/add-group.component';
import { GroupItemComponent } from '../group-item/group-item.component';
import { GroupsService } from '../../../services/groups.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { of } from 'rxjs';

@Component({
  selector: '[app-group-list]',
  standalone: true,
  imports: [CommonModule, RouterLinkActive, AddGroupComponent, GroupItemComponent, MatProgressSpinnerModule],
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.scss'],
  host: { class: 'w-full sm:h-full' },
})
export class GroupListComponent implements OnInit, AfterViewInit {
  @ViewChild('scroll', { static: false }) scroll!: ElementRef<HTMLElement>;
  @ViewChild('newGroup', { static: false }) newGroup!: AddGroupComponent;
  groups$ = this.groupsService.groups$;
  loading$ = this.groupsService.loading$;

  // MENU
  mobileMenuOpen = false;
  isMobile = false;
  activateTransition = true;
  timeOut: any;

  constructor(private groupsService: GroupsService) {}
  ngOnInit(): void {
    this.groupsService.fetchGroups();
  }
  ngAfterViewInit(): void {
    this.isMobile = window.innerWidth <= 640;
  }

  toggleMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
    this.scrollUp();
  }
  scrollUp() {
    if (this.scroll) this.scroll.nativeElement.scrollTop = 0;
    if (this.newGroup) this.newGroup.close();
  }
  @HostListener('window:resize', ['$event']) resize(event: any) {
    this.handleIsMobile(event.target.innerWidth);
    this.handleTransition();
  }
  @HostListener('document:click', ['$event']) clickOutside(event: MouseEvent) {
    if (!(event.target as HTMLElement).closest('[data-menu-groups-no-action]')) {
      this.mobileMenuOpen = false;
    }
  }
  handleIsMobile(width: number) {
    this.isMobile = width <= 640;
    if (!this.isMobile) {
      this.mobileMenuOpen = false;
    }
  }
  handleTransition() {
    this.timeOut && clearTimeout(this.timeOut);
    this.activateTransition = false;
    this.timeOut = setTimeout(() => {
      this.activateTransition = true;
    }, 100);
  }
}
