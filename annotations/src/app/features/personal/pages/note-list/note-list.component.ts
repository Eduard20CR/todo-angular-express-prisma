import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotesTodosSubmenuComponent } from 'src/app/features/personal/components/notes-todos-submenu/notes-todos-submenu.component';
import { ActivatedRoute, Router } from '@angular/router';
import { NoteGroupComponent } from '../../components/notes/note-group/note-group.component';
import { NotesService } from '../../services/notes.service';
import { Subscription } from 'rxjs';
import { TitleComponent } from '../../components/groups/title/title.component';

@Component({
  selector: 'app-note-list',
  standalone: true,
  imports: [CommonModule, NotesTodosSubmenuComponent, NoteGroupComponent, TitleComponent],
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.scss'],
  host: { class: 'w-full' },
})
export class NoteListComponent implements OnInit, OnDestroy {
  dataSubcription!: Subscription;
  paramsSubcription!: Subscription;

  constructor(private activatedRoute: ActivatedRoute, private notesService: NotesService, private router: Router) {}

  ngOnInit(): void {
    this.paramsSubcription = this.activatedRoute.paramMap.subscribe((data) => {
      this.notesService.setGroupId(data.get('id') as string);
    });
    this.dataSubcription = this.activatedRoute.data.subscribe((data) => {
      this.notesService.emitNotes(data['group'].notes);
      this.notesService.emitName(data['group'].name);
    });
  }
  ngOnDestroy(): void {
    this.dataSubcription.unsubscribe();
    this.paramsSubcription.unsubscribe();
  }
}
