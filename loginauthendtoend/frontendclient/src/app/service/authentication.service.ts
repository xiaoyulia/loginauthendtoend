import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {map, filter, switchMap, catchError} from 'rxjs/operators';
import {logger} from "codelyzer/util/logger";
import {printLine} from "tslint/lib/verify/lines";
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/catch';
// import 'rxjs/add/observable/throw';


/*
Now when coming to JWT authorization integration in angular5 with spring security,
first we need to make a POST request for login with username and password.
In the response, server will provide you a JWT token after successfull authentication.
Once, we get this token, we can cache it in our browser for reuse for further API calls.
For now let us define our AuthenticationService that will request for JWT token on login.
*/

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
 // private authUrl = '<a class="vglnk" href="http://localhost:8080/login" rel="nofollow"><span>http</span><span>://</span><span>localhost</span><span>:</span><span>8080</span><span>/</span><span>auth</span></a>';
  //private headers = new Headers({'Content-Type': 'application/json'});

  private options={ headers: new HttpHeaders().set('Content-Type','application/json')};

  public token: string;

  constructor(private http: HttpClient,
              ) {
// from: https://embed.plnkr.co/plunk/mOhyur
    // set token if saved in local storage
    //var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    //this.token = currentUser && currentUser.token;
  }

// From devglan: Angular 5 JWT Authentication (Spring Boot Security)
  attemptAuth(name: string, password: string): Observable<any> {
    const credentials = JSON.stringify({name: name, password: password});
    return this.http.post("http://localhost:8099/token/generate-token" , credentials, this.options);

  }





// // This is modified for Angular 6 using rxjs6. Some of the operations maybe be slightly different
//   // See original code here: https://chariotsolutions.com/blog/post/angular-2-spring-boot-jwt-cors_part2/
//   login(name: string, password: string): Observable<boolean> {
//     console.log("in authentication service");
//     console.log(JSON.stringify({name: name, password: password}));
//
//     return this.http.post("http://localhost:8080/token/generate-token", JSON.stringify({name: name, password: password}), this.options)
//       .pipe(map((response: Response) => {
//
//         // login successful if there's a jwt token in the response
//         //let token = response.json() && response.json().token
//         let token = response.json() && response.json();
//         console.log("Response from backend: "+response.json());
//
//         if (token) {
//           // store username and jwt token in local storage to keep user logged in between page refreshes
//           localStorage.setItem('currentUser', JSON.stringify({ username: name, token: token }));
//          // localStorage.setItem('currentUser', "dddddddd");
//
//           // return true to indicate successful login
//           return true;
//         } else {
//           // return false to indicate failed login
//           return false;
//         }
//       })).pipe(catchError((error) => throwError(error)));
//       //.catch((error:any) => Observable.throw(error.json().error || 'Server error'));
//   }







  //
  // getToken(): String {
  //   var currentUser = JSON.parse(localStorage.getItem('currentUser'));
  //   var token = currentUser && currentUser.token;
  //   return token ? token : "";
  // }
  //
  // logout(): void {
  //   // clear token remove user from local storage to log user out
  //   localStorage.removeItem('currentUser');
  // }
}
