import { Component, ElementRef, HostListener, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NotesService } from '../../../services/notes.service';
import { Subscription } from 'rxjs';
import { EditIconComponent } from 'src/app/shared/components/icons/edit-icon/edit-icon.component';
import { PlusIconComponent } from 'src/app/shared/components/icons/plus-icon/plus-icon.component';
import { TrashIconComponent } from 'src/app/shared/components/icons/trash-icon/trash-icon.component';
import { CheckIconComponent } from 'src/app/shared/components/icons/check-icon/check-icon.component';
import { GroupsService } from '../../../services/groups.service';
import { Group } from '../../../models/group.model';
import { TodosService } from '../../../services/todos.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-title',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, EditIconComponent, PlusIconComponent, TrashIconComponent, CheckIconComponent],
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.scss'],
  host: { class: 'w-full' },
})
export class TitleComponent implements OnInit, OnDestroy {
  @ViewChild('inputEdit', { static: false }) input!: ElementRef<HTMLInputElement>;
  title$!: Subscription;

  title = 'Notes';
  editMode = false;
  form = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
  });

  constructor(private notesService: NotesService, private groupService: GroupsService, private todosService: TodosService, private router: Router) {}

  ngOnInit(): void {
    this.title$ = this.groupService.name$.subscribe((name) => {
      if (!name) return;

      this.title = name;
      this.form.patchValue({ name });
    });
  }
  ngOnDestroy(): void {
    this.title$.unsubscribe();
  }

  deleteGroup() {
    const id = this.notesService.getGroupId();
    this.groupService.deleteGroup(id);
  }

  submit() {
    if (this.form.invalid) return;

    const idGroup = this.router.url.includes('notes') ? this.notesService.getGroupId() : this.todosService.getGroupId();

    const groupEdited: Group = {
      id: idGroup,
      name: this.form.value.name as string,
    };
    console.log(groupEdited);

    this.groupService.updateGroup(groupEdited);

    this.close();
  }

  toggleAddMode() {
    this.editMode ? this.close() : this.open();
  }
  open() {
    this.editMode = true;
    this.focusInput();
  }
  close() {
    this.editMode = false;
    this.form.patchValue({ name: this.title });
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
