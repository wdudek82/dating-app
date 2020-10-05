import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { AppUser } from "../nav/nav.component";

@Injectable({
  providedIn: "root",
})
export class AccountService {
  baseUrl = "https://localhost:5001/api";

  constructor(private http: HttpClient) {
  }

  login(model: AppUser) {
    return this.http.post(`${this.baseUrl}/account/login`, model);
  }
}
