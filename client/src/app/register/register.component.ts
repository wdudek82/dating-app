import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { AccountService } from "../_services/account.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"],
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter<boolean>();

  model = {
    username: "",
    password: "",
  };

  constructor(private accountService: AccountService, private toastr: ToastrService) {}

  ngOnInit(): void {}

  register() {
    this.accountService.register(this.model).subscribe(
      (res) => {
        console.log("==", res);
        this.cancel();
      },
      (error) => {
        console.log(error);
        this.toastr.error(error.error);
      },
    );
  }

  cancel() {
    console.log("cancelled");
    this.cancelRegister.emit(false);
  }
}
