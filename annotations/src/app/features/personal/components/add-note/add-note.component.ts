import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlusIconComponent } from 'src/app/shared/components/icons/plus-icon/plus-icon.component';

@Component({
  selector: 'app-add-note',
  standalone: true,
  imports: [CommonModule, PlusIconComponent],
  templateUrl: './add-note.component.html',
  styleUrls: ['./add-note.component.scss'],
  host: { class: 'flex ' },
})
export class AddNoteComponent {
  addNote() {
    console.log('asd');
  }
}
