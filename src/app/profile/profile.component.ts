import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  username: string | null = null;
  email: string | null = null;

  constructor(private userService: UserService,private router: Router) {}

  ngOnInit() {
    const userData = this.userService.getUserData();
    if (userData) {
      this.username = userData.username;
      this.email = userData.email;
    }
  }


  goHome(): void {
    this.router.navigate(['/home']);
  }

}
