import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Route, Router } from "@angular/router";

@Component({
  selector: "app-test-errors",
  templateUrl: "./test-errors.component.html",
  styleUrls: ["./test-errors.component.css"],
})
export class TestErrorsComponent implements OnInit {
  baseUrl = "https://localhost:5001/api/";
  validationErrors: string[] = [];

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {}

  get404Error() {
    this.http.get(this.baseUrl + "buggy/not-found").subscribe(
      (res) => {
        console.log(res);
      },
      (error) => {
        console.log(error);
        this.router.navigateByUrl("/not-found");
      },
    );
  }

  get400Error() {
    this.http.get(this.baseUrl + "buggy/bad-request").subscribe(
      (res) => {
        console.log(res);
      },
      (error) => {
        console.log(error);
      },
    );
  }

  get500Error() {
    this.http.get(this.baseUrl + "buggy/server-error").subscribe(
      (res) => {
        console.log(res);
      },
      (error) => {
        console.log(error);
      },
    );
  }

  get401Error() {
    this.http.get(this.baseUrl + "buggy/auth").subscribe(
      (res) => {
        console.log(res);
      },
      (error) => {
        console.log(error);
      },
    );
  }

  get400ValidationError() {
    this.http.post(this.baseUrl + "account/register", {}).subscribe(
      (res) => {
        console.log(res);
      },
      (error) => {
        console.warn(error);
        this.validationErrors = error;
      },
    );
  }
}
