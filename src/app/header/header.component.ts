import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { SchoolService } from '../school.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean;
  
  constructor(auth: AuthService) {
    this.isLoggedIn = auth.isAuthenticated();
  }

  ngOnInit() {
  }

}
