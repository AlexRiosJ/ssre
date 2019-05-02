import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
<<<<<<< HEAD
=======
import { SchoolService } from '../school.service';
import { Subscription } from 'rxjs';
import { UserService } from '../user.service';
>>>>>>> 331e87cca86da050df0d949f82410d5424065601

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


}
