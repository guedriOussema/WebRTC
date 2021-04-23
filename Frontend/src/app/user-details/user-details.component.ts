import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../models/user.model';
import { AuthService } from '../services/auth.service';
import { WebRequestService } from '../services/web-request.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {

  @Input() user: User = new User();
  userId: string;
  @Output() formSubmit: EventEmitter<User> = new EventEmitter<User>();
  userExists: boolean;
  
  constructor(private webReqService: WebRequestService, private authService:AuthService, private router:Router) { }

  ngOnInit() {
    if(!this.authService.isLoggedIn()) {
      // the user obj has no value
      // this means that no user object was passed in
      this.userExists = false;
      this.user = new User();
    }
    else {
      // the user object was passed in
      this.userId = this.authService.getUserId();
      this.userExists = true;
    }
    console.log('user exists');
    console.log(this.userExists);
  }

  onFormSubmit(form: NgForm) {
    console.log(form);
    if (form.valid) {
      if(this.userExists == false){
        this.formSubmit.emit(form.value);
      }
      else {
        this.webReqService.patch(`http://localhost:3000/users/${this.userId}`,form.value).subscribe((data)=> {
        console.log(data);
        this.router.navigateByUrl("accueil");
      })
      }
    }
  }
  

}