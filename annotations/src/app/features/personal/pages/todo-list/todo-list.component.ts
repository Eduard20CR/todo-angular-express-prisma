import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotesTodosSubmenuComponent } from 'src/app/features/personal/components/notes-todos-submenu/notes-todos-submenu.component';
import { ActivatedRoute, Router } from '@angular/router';
import { TodoGroupComponent } from '../../components/todos/todo-group/todo-group.component';
import { Subscription } from 'rxjs';
import { TodosService } from '../../services/todos.service';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [CommonModule, NotesTodosSubmenuComponent, TodoGroupComponent],
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
  host: { class: 'w-full' },
})
export class TodoListComponent implements OnInit {
  dataSubcription!: Subscription;
  paramsSubcription!: Subscription;

  constructor(private activatedRoute: ActivatedRoute, private todosService: TodosService, private router: Router) {}

  ngOnInit(): void {
    this.paramsSubcription = this.activatedRoute.paramMap.subscribe((data) => {
      this.todosService.setGroupId(data.get('id') as string);
    });
    this.dataSubcription = this.activatedRoute.data.subscribe((data) => {
      this.todosService.emitTodos(data['group'].todo);
      this.todosService.emitName(data['group'].name);
    });
  }
  ngOnDestroy(): void {
    this.dataSubcription.unsubscribe();
    this.paramsSubcription.unsubscribe();
  }
}
