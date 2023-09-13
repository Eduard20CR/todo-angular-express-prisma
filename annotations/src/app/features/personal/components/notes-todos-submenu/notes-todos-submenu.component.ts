import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink, RouterLinkActive } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: '[app-notes-todos-submenu]',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './notes-todos-submenu.component.html',
  styleUrls: ['./notes-todos-submenu.component.scss'],
})
export class NotesTodosSubmenuComponent implements OnInit, OnDestroy {
  activatedRoute = inject(ActivatedRoute);
  params$!: Subscription;
  id!: string;

  ngOnInit(): void {
    this.params$ = this.activatedRoute.params.subscribe((params) => (this.id = params['id']));
  }

  ngOnDestroy(): void {
    this.params$.unsubscribe();
  }
}
