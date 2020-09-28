import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface AppUser {
  id: number;
  userName: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'DatingApp';
  appUsers: AppUser[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.http.get<AppUser[]>('https://localhost:5001/api/users').subscribe(
      (users) => {
        this.appUsers = users ?? [];
      },
      (error) => {
        console.error(error);
      },
    );
  }
}
