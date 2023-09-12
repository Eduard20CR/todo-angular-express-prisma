import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContainerComponent } from 'src/app/shared/components/container/container.component';
import { RouterOutlet } from '@angular/router';
import { TopBottonMarginComponent } from 'src/app/shared/components/top-botton-margin/top-botton-margin.component';
import { GroupListComponent } from '../group-list/group-list.component';

@Component({
  selector: '[app-personal-wrapper]',
  standalone: true,
  imports: [CommonModule, ContainerComponent, RouterOutlet, TopBottonMarginComponent, GroupListComponent],
  templateUrl: './personal-wrapper.component.html',
  styleUrls: ['./personal-wrapper.component.scss'],
})
export class PersonalWrapperComponent {}
