import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  onNavigateToHome(){
    this.router.navigateByUrl('accueil');
  }

  logout(){
    this.authService.logout();
  }


  isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  goToUserDetails(){
    this.router.navigateByUrl('accueil/user-details');
  }

}
