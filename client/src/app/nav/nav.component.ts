import { Component, OnInit } from "@angular/core";
import { AccountService } from "../_services/account.service";
import { User } from "../_models/user";
import { Observable } from "rxjs";
import { Router } from "@angular/router";

@Component({
  selector: "app-nav",
  templateUrl: "./nav.component.html",
  styleUrls: ["./nav.component.css"],
})
export class NavComponent implements OnInit {
  model: object = {
    username: "",
    password: "",
  };
  username = "";

  constructor(public accountService: AccountService, private router: Router) {}

  ngOnInit(): void {}

  login(): void {
    console.log(this.model);

    this.accountService.login(this.model).subscribe(
      (user) => {
        console.log(user);
        this.router.navigateByUrl("/members");
      },
      (error) => {
        console.error(error);
      },
    );
  }

  logout(): void {
    this.accountService.logout();
    this.router.navigateByUrl("/");
  }
}
