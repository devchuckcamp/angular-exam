import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  user:any = {};
  userID:number;
  userForm: FormGroup;
  constructor(
    private userService:UserService,
    private router:Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if(params['user_id'] !== undefined){
        this.userID = params['user_id'];
        this.userService.getUser(params['user_id']).subscribe((user:any) =>{
          this.user = user;
          this.userForm = new FormGroup({
            'firstname': new FormControl('', [Validators.required,]),
            'lastname': new FormControl('', [Validators.required,]),
          });
        });
      }
    });
  }

  updateUser(){
    console.log(this.userForm.valid);
    if(this.userForm.valid){
      this.userService.update(this.userForm.value, this.userID).subscribe((res:any)=>{
        if(res.id){
          this.user = res;
          this.userForm.clearAsyncValidators();
        }
      });
    }
    return false;
  }

}
