import { Component, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuIconComponent } from 'src/app/shared/components/icons/menu-icon/menu-icon.component';

@Component({
  selector: '[app-submenu]',
  standalone: true,
  imports: [CommonModule, MenuIconComponent],
  templateUrl: './submenu.component.html',
  styleUrls: ['./submenu.component.scss'],
})
export class SubmenuComponent {
  submenuOpen = false;
  @Output() edit = new EventEmitter<void>();
  @Output() delete = new EventEmitter<void>();

  constructor(private eRef: ElementRef) {}

  onToggleMenu() {
    this.submenuOpen = !this.submenuOpen;
  }

  @HostListener('document:click', ['$event'])
  clickout(event: any) {
    if (!this.eRef.nativeElement.contains(event.target)) this.submenuOpen = false;
  }

  onEdit() {
    this.edit.emit();
    this.submenuOpen = false;
  }
  onDelete() {
    this.delete.emit();
    this.submenuOpen = false;
  }
}
