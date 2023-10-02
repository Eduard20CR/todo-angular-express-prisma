import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContainerComponent } from 'src/app/shared/components/container/container.component';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [CommonModule, ContainerComponent, RouterLink, RouterLinkActive],
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent {
  user$ = this.userService.user$;
  constructor(private userService: UserService) {}

  logOut() {
    this.userService.logOut();
  }
}
