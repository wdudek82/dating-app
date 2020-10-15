import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, ReplaySubject } from "rxjs";
import { map } from "rxjs/operators";
import { User } from "../_models/user";

@Injectable({
  providedIn: "root",
})
export class AccountService {
  baseUrl = "https://localhost:5001/api";
  private currentUserSource = new ReplaySubject<User>(1);
  currentUser$: Observable<User> = this.currentUserSource.asObservable();

  constructor(private http: HttpClient) {}

  login(model: object): Observable<void> {
    return this.http.post<User>(`${this.baseUrl}/account/login`, model).pipe(
      map((res) => {
        const user = res;
        if (user) {
          localStorage.setItem("user", JSON.stringify(user));
          this.currentUserSource.next(user);
        }
        // return res;
      }),
    );
  }

  setCurrentUser(user: User): void {
    this.currentUserSource.next(user);
  }

  logout(): void {
    localStorage.removeItem("user");
    this.currentUserSource.next(null);
  }
}
