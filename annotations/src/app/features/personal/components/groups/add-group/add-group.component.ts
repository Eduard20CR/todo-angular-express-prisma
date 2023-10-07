import { Component, ElementRef, HostListener, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { PlusIconComponent } from 'src/app/shared/components/icons/plus-icon/plus-icon.component';
import { GroupsService } from '../../../services/groups.service';

@Component({
  selector: '[app-add-group]',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, PlusIconComponent],
  templateUrl: './add-group.component.html',
  styleUrls: ['./add-group.component.scss'],
  host: { class: 'flex  min-h-[5rem] items-stretch' },
})
export class AddGroupComponent {
  @ViewChild('inputNewTodo', { static: false }) input!: ElementRef<HTMLInputElement>;
  form = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
  });
  addMode = false;

  constructor(private groupsService: GroupsService) {}

  submit() {
    if (this.form.invalid) return;
    this.groupsService.addGroup({ id: '', name: this.form.get('name')?.value as string });
    this.form.reset();
  }

  toggleAddMode() {
    this.addMode ? this.close() : this.open();
  }

  open() {
    this.addMode = true;
    this.focusInput();
  }
  public close() {
    this.addMode = false;
    this.form.reset();
  }
  focusInput() {
    setTimeout(() => {
      if (this.input) this.input.nativeElement.focus();
    });
  }

  @HostListener('document:keydown.escape') closeOnEscape() {
    this.close();
  }
}
