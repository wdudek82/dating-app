import { Component, OnInit } from "@angular/core";
import { AccountService } from "../_services/account.service";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";

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

  constructor(
    public accountService: AccountService,
    private router: Router,
    private toastr: ToastrService,
  ) {}

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
        this.toastr.error(error.error);
      },
    );
  }

  logout(): void {
    this.accountService.logout();
    this.router.navigateByUrl("/");
  }
}
