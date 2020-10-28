import { Component, OnInit } from "@angular/core";
import { AccountService } from "../_services/account.service";

export interface AppUser {
  username: string;
  password: string;
}

@Component({
  selector: "app-nav",
  templateUrl: "./nav.component.html",
  styleUrls: ["./nav.component.css"],
})
export class NavComponent implements OnInit {
  model: AppUser = {
    username: "",
    password: "",
  };
  loggedIn: boolean = false;

  constructor(private accountService: AccountService) {
  }

  ngOnInit(): void {
  }

  login() {
    console.log(this.model);

    this.accountService.login(this.model)
      .subscribe(
        (response) => {
          console.log(response);
          this.loggedIn = true;
        },
        (error) => {
          console.error(error);
        });
  }
}
