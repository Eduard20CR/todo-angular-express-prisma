import { AfterViewInit, Component, ElementRef, HostListener, ViewChild, inject } from '@angular/core';
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
export class GroupListComponent implements AfterViewInit {
  @ViewChild('scroll') scroll!: ElementRef<HTMLElement>;
  @ViewChild('newGroup') newGroup!: AddGroupComponent;
  groups = this.annotationsGroupsService.groups$;
  mobileMenuOpen = false;
  isMobile = false;

  constructor(private annotationsGroupsService: AnnotationsGroupsService) {}
  ngAfterViewInit(): void {
    this.isMobile = window.innerWidth <= 640;
  }
  toggleMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
    this.scrollUp();
  }
  scrollUp() {
    this.scroll.nativeElement.scrollTop = 0;
    this.newGroup.close();
  }
  @HostListener('window:resize', ['$event']) resize(event: any) {
    this.isMobile = event.target.innerWidth <= 640;
    if (this.isMobile) {
      this.mobileMenuOpen = false;
    }
  }
}
