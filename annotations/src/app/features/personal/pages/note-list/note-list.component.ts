import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotesTodosSubmenuComponent } from 'src/app/features/personal/components/notes-todos-submenu/notes-todos-submenu.component';
import { ActivatedRoute } from '@angular/router';
import { NoteGroupComponent } from '../../components/notes/note-group/note-group.component';

@Component({
  selector: 'app-note-list',
  standalone: true,
  imports: [CommonModule, NotesTodosSubmenuComponent, NoteGroupComponent],
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.scss'],
  host: { class: 'w-full' },
})
export class NoteListComponent implements OnInit {
  activatedRoute = inject(ActivatedRoute);

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {});
  }
}
