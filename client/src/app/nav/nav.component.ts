import { Component, OnInit } from "@angular/core";
import { AccountService } from "../_services/account.service";
import { User } from "../_models/user";
import { Observable } from "rxjs";

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

  constructor(public accountService: AccountService) {}

  ngOnInit(): void {}

  login(): void {
    console.log(this.model);

    this.accountService.login(this.model).subscribe(
      (user) => {
        console.log(user);
      },
      (error) => {
        console.error(error);
      },
    );
  }

  logout(): void {
    this.accountService.logout();
  }
}
