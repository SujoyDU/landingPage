import { Component } from '@angular/core';
import { FormBuilder, FormGroup} from '@angular/forms';
import {Observable} from "rxjs";
import {RequestOptions, Headers, Response, Http} from "@angular/http";

declare let $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [FormBuilder]
})
export class AppComponent {
  title = 'app works!';
  url:string;
  msg:string;
  userForm: FormGroup;
  success:boolean;

  constructor(private formBuilder: FormBuilder, private http: Http) {
    this.url = 'http://localhost:3000/api/comments';
  }

  ngOnInit() {
    this.userForm = this.formBuilder.group({
      email: ['']
    });
    this.success = false;
  }
  signup(){
    console.log(this.userForm.value);
    // if (this.userForm.value.test(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)) {
    //     console.log("correct");
    // }

     let EMAIL_REGEXP = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

     if(EMAIL_REGEXP.test(this.userForm.value.email)){
       this.success = true;
       console.log("correct");
       $('#myModal').modal('show');
       this.msg = 'Thank you!! For your email!!';
       this.addEmails(this.userForm.value.email);
     }
     else {
       this.success = false;
       $('#myModal').modal('show');
       this.msg  = 'Please give a valid email!';
     }
     //

  }

   addEmails (email: string): Observable<string> {
        let bodyString = JSON.stringify(email); // Stringify payload
        let headers      = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        let options       = new RequestOptions({ headers: headers }); // Create a request option

        return this.http.post(this.url, email, options) // ...using post request
                         .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
                         .catch((error:any) => Observable.throw(error.json().error || 'Server error')); //...errors if any
    }



}
