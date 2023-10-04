import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotesTodosSubmenuComponent } from 'src/app/features/personal/components/notes-todos-submenu/notes-todos-submenu.component';
import { ActivatedRoute } from '@angular/router';
import { TodoGroupComponent } from '../../components/todos/todo-group/todo-group.component';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [CommonModule, NotesTodosSubmenuComponent, TodoGroupComponent],
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
  host: { class: 'w-full' },
})
export class TodoListComponent implements OnInit {
  activatedRoute = inject(ActivatedRoute);

  ngOnInit(): void {
    // this.activatedRoute.params.subscribe((params) => {});
  }
}
