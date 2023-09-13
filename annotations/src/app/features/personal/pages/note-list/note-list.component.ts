import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotesTodosSubmenuComponent } from 'src/app/features/personal/components/notes-todos-submenu/notes-todos-submenu.component';
import { ActivatedRoute } from '@angular/router';
import { Note } from 'src/app/features/personal/models/note.interface';
import { NoteItemComponent } from 'src/app/features/personal/components/note-item/note-item.component';
import { AddNoteComponent } from 'src/app/features/personal/components/add-note/add-note.component';

@Component({
  selector: 'app-note-list',
  standalone: true,
  imports: [CommonModule, NotesTodosSubmenuComponent, NoteItemComponent, AddNoteComponent],
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.scss'],
  host: { class: 'w-full' },
})
export class NoteListComponent implements OnInit {
  activatedRoute = inject(ActivatedRoute);
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
      id: 2,
      title: 'Note 2',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum debitis quas culpa aliquam consectetur voluptatem. Nostrum exercitationem reiciendis adipisci magnam voluptate. Ullam architecto distinctio, ipsam repellendus itaque error veniam id quo quas asperiores dolor deleniti ad sit dicta. Dolor voluptatibus laboriosam odio corrupti fuga quam sunt minima harum libero illum.',
    },
    {
      id: 2,
      title: 'Note 2',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum debitis quas culpa aliquam consectetur voluptatem. Nostrum exercitationem reiciendis adipisci magnam voluptate. Ullam architecto distinctio, ipsam repellendus itaque error veniam id quo quas asperiores dolor deleniti ad sit dicta. Dolor voluptatibus laboriosam odio corrupti fuga quam sunt minima harum libero illum.',
    },
    {
      id: 2,
      title: 'Note 2',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum debitis quas culpa aliquam consectetur voluptatem. Nostrum exercitationem reiciendis adipisci magnam voluptate. Ullam architecto distinctio, ipsam repellendus itaque error veniam id quo quas asperiores dolor deleniti ad sit dicta. Dolor voluptatibus laboriosam odio corrupti fuga quam sunt minima harum libero illum.',
    },
    {
      id: 2,
      title: 'Note 2',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum debitis quas culpa aliquam consectetur voluptatem. Nostrum exercitationem reiciendis adipisci magnam voluptate. Ullam architecto distinctio, ipsam repellendus itaque error veniam id quo quas asperiores dolor deleniti ad sit dicta. Dolor voluptatibus laboriosam odio corrupti fuga quam sunt minima harum libero illum.',
    },
    {
      id: 2,
      title: 'Note 2',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum debitis quas culpa aliquam consectetur voluptatem. Nostrum exercitationem reiciendis adipisci magnam voluptate. Ullam architecto distinctio, ipsam repellendus itaque error veniam id quo quas asperiores dolor deleniti ad sit dicta. Dolor voluptatibus laboriosam odio corrupti fuga quam sunt minima harum libero illum.',
    },
    {
      id: 2,
      title: 'Note 2',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum debitis quas culpa aliquam consectetur voluptatem. Nostrum exercitationem reiciendis adipisci magnam voluptate. Ullam architecto distinctio, ipsam repellendus itaque error veniam id quo quas asperiores dolor deleniti ad sit dicta. Dolor voluptatibus laboriosam odio corrupti fuga quam sunt minima harum libero illum.',
    },
    {
      id: 2,
      title: 'Note 2',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum debitis quas culpa aliquam consectetur voluptatem. Nostrum exercitationem reiciendis adipisci magnam voluptate. Ullam architecto distinctio, ipsam repellendus itaque error veniam id quo quas asperiores dolor deleniti ad sit dicta. Dolor voluptatibus laboriosam odio corrupti fuga quam sunt minima harum libero illum.',
    },
    {
      id: 2,
      title: 'Note 2',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum debitis quas culpa aliquam consectetur voluptatem. Nostrum exercitationem reiciendis adipisci magnam voluptate. Ullam architecto distinctio, ipsam repellendus itaque error veniam id quo quas asperiores dolor deleniti ad sit dicta. Dolor voluptatibus laboriosam odio corrupti fuga quam sunt minima harum libero illum.',
    },
    {
      id: 2,
      title: 'Note 2',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum debitis quas culpa aliquam consectetur voluptatem. Nostrum exercitationem reiciendis adipisci magnam voluptate. Ullam architecto distinctio, ipsam repellendus itaque error veniam id quo quas asperiores dolor deleniti ad sit dicta. Dolor voluptatibus laboriosam odio corrupti fuga quam sunt minima harum libero illum.',
    },
  ];

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      console.log(params);
    });
  }
}
