import { Injectable } from '@angular/core';
import { HttpClient,HttpClientModule, HttpErrorResponse, HttpHeaders, HttpRequest, HttpResponse, HttpResponseBase } from '@angular/common/http';
import { Observable, throwError, Subject, BehaviorSubject } from 'rxjs';
import { catchError, retry } from 'rxjs/operators'
import { map, take } from 'rxjs/operators';
import { ConfigService } from '../core/config.service';

class  User {
    username: string;
    email: string;
    firstname: string;
    lastname: string;
    password: string;
}

@Injectable({
  providedIn: 'root'
})

export class UserService {

    constructor(
      private configService:ConfigService,
      private http:HttpClient
    ) {
      this.dataStore = { users: [] };
      this._users = <BehaviorSubject<User[]>>new BehaviorSubject([]);
      this.users = this._users.asObservable();
    }

    users: Observable<User[]>
        private _users: BehaviorSubject<User[]>;
        private baseUrl: string;
        private dataStore: {
            users: any[]
        };
    UserList: User[]= [];
    URI = this.configService.apiEndPoint();

    create(user: User) {
      this.http.post(this.configService.apiEndPoint()+'/api/v1/users', JSON.stringify(user), this.headers()).subscribe( (data:any) => {
          // this.dataStore.users.unshift(data);
          // this._users.next(Object.assign({}, this.dataStore).users);
        }, error => console.log('Could not create user.'));
    }

    get() {
      this.http.get(this.configService.apiEndPoint()+'/api/v1/users', this.headers()).subscribe( (data :any)=> {
        this.dataStore.users = data.data;
        this._users.next(Object.assign({}, this.dataStore).users);
      }, error => console.log('Could not load users.'));
    }

    getUser(userID:number) {
      return this.http.get(this.configService.apiEndPoint()+'/api/v1/users/'+userID, this.headers());
    }

    update(user:any, userID = null) {
      let data = JSON.stringify({
        firstname: user.firstname,
        lastname: user.lastname
      });
      if(userID){
        return this.http.put(this.configService.apiEndPoint()+'/api/v1/users/'+userID, data, this.headers());
      }
    }

    delete(userID = null) {
      if(userID){
        return this.http.delete(this.configService.apiEndPoint()+'/api/v1/users/'+userID, this.headers());
      }
    }

    private headers() {
      let headers = new HttpHeaders({
          'Content-Type':  'application/json',
          'Accept':'application/json',
          'Access-Control-Allow-Origin':'*',
          'Allow_Headers':' Allow, Access-Control-Allow-Origin, Content-type, Accept',
          'Allow':'GET,POST,PUT,DELETE,OPTION'
        })
      let options = { headers: headers };
      return options;
  }
}
