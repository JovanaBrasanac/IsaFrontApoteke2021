import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  username: String = "";
  constructor(private router: Router) { }

  ngOnInit() {
    this.username = sessionStorage.getItem("authenticatedUser");
  }

  logout() {
    sessionStorage.removeItem('authenticatedUser');
    sessionStorage.setItem("authenticatedUserRole", "")
    this.router.navigate(['/login']);
    console.log(sessionStorage.getItem('authenticatedUser'));
  }

}
