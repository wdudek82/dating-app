import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { User } from "./_models/user";
import { AccountService } from "./_services/account.service";

interface AppUser {
  id: number;
  userName: string;
}

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  title = "DatingApp";
  users: AppUser[];

  constructor(
    private http: HttpClient,
    private accountService: AccountService,
  ) {}

  ngOnInit(): void {
    this.getUsers();
    this.setCurrentUser();
  }

  setCurrentUser() {
    const user: User = JSON.parse(localStorage.getItem("user"));
    this.accountService.setCurrentUser(user);
  }

  getUsers(): void {
    this.http.get<AppUser[]>("https://localhost:5001/api/users").subscribe(
      (users) => {
        this.users = users;
      },
      (error) => {
        console.error(error);
      },
    );
  }
}
