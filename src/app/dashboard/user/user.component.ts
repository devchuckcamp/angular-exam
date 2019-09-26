import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  users:any = [];
  new_user:any = {};
  newUserForm: FormGroup;
  formDisplay:string = 'Show';
  displayNewUserForm:boolean = false;
  constructor(
    private userService:UserService
  ){
    this.newUserForm = new FormGroup({
      'username': new FormControl('', [Validators.required,]),
      'password': new FormControl('', [Validators.required,]),
      'firstname': new FormControl('', [Validators.required,]),
      'lastname': new FormControl('', [Validators.required,]),
      'email': new FormControl('', [Validators.required, Validators.email]),
    });
  }

  ngOnInit(){

    this.userService.get();
    this.userService.users.subscribe( (res:any) => {
      this.users = res;
    });
  }
  toggleNewUserForm(){
    this.displayNewUserForm = this.displayNewUserForm ? false:true;
    this.formDisplay = this.displayNewUserForm ? 'Hide' : 'Show';
    console.log(this.displayNewUserForm);
    return false;
  }

  addUser(){
    if(this.newUserForm.valid){
      this.userService.create(this.new_user);

      this.new_user = {};
      this.newUserForm.clearAsyncValidators();
      this.userService.get();
    }
    return false;
  }

  removeUser(userID:number){
    this.userService.delete(userID).subscribe( (res:any) => {
      this.userService.get();
    });
    return false;
  }

}
