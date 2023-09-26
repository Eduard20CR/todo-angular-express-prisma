import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoteItemComponent } from '../note-item/note-item.component';
import { AddNoteComponent } from '../add-note/add-note.component';
import { Note } from '../../../models/note.model';

@Component({
  selector: 'app-note-group',
  standalone: true,
  imports: [CommonModule, NoteItemComponent, AddNoteComponent],
  templateUrl: './note-group.component.html',
  styleUrls: ['./note-group.component.scss'],
})
export class NoteGroupComponent {
  notes: Note[] = [
    {
      id: 1,
      title: 'Note 1',
      description:
        'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ratione illo modi, voluptatibus vero cumque repellat officia aut aspernatur praesentium cupiditate, doloremque aliquam similique qui eaque?',
    },
    {
      id: 2,
      title: 'Note 2',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum debitis quas culpa aliquam consectetur voluptatem. Nostrum exercitationem reiciendis adipisci magnam voluptate. Ullam architecto distinctio, ipsam repellendus itaque error veniam id quo quas asperiores dolor deleniti ad sit dicta. Dolor voluptatibus laboriosam odio corrupti fuga quam sunt minima harum libero illum.',
    },
    {
      id: 3,
      title: 'Note 2',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum debitis quas culpa aliquam consectetur voluptatem. Nostrum exercitationem reiciendis adipisci magnam voluptate. Ullam architecto distinctio, ipsam repellendus itaque error veniam id quo quas asperiores dolor deleniti ad sit dicta. Dolor voluptatibus laboriosam odio corrupti fuga quam sunt minima harum libero illum.',
    },
    {
      id: 4,
      title: 'Note 2',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum debitis quas culpa aliquam consectetur voluptatem. Nostrum exercitationem reiciendis adipisci magnam voluptate. Ullam architecto distinctio, ipsam repellendus itaque error veniam id quo quas asperiores dolor deleniti ad sit dicta. Dolor voluptatibus laboriosam odio corrupti fuga quam sunt minima harum libero illum.',
    },
  ];
}
