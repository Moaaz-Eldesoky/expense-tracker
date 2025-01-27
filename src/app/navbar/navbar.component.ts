import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [RouterModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  isMember: boolean = false;
  constructor(private auth: AuthService, private router: Router) {
    auth.userData.subscribe({
      next: () => {
        if (auth.userData.value !== null) this.isMember = true;
        else this.isMember = false;
      },
    });
  }
  logUserOut() {
    this.auth.logOut();
    this.router.navigate(['/welcome']);
  }
}
