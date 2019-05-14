import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { SchoolService } from '../school.service';
import { Subscription } from 'rxjs';
import { UserService } from '../user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  private subscript: Subscription;
  isLoggedIn: boolean;
  username: string;

  constructor(private auth: AuthService,
              private userService: UserService) {
  }

  ngOnInit() {
    this.subscript = this.auth.isLoggedIn
      .subscribe(
        (value) => {
           this.isLoggedIn = value;
        }
      );
    this.subscript = this.userService.userName
      .subscribe(
        (value) => {
           this.username = value;
        }
      );
  }

  logout() {
    this.auth.logout();
  }


}
