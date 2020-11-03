import { Injectable } from "@angular/core";
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { NavigationExtras, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { catchError } from "rxjs/operators";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private router: Router, private toastr: ToastrService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler,
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error) => {
        console.log("==", error);

        if (error) {
          this.handleErrors(error);
        }
        return throwError(error);
      }),
    );
  }

  private handleErrors(error) {
    switch (error.status) {
      case 400:
      case 401:
        if (error?.error?.errors) {
          ErrorInterceptor.handleModalStateErrors(error.error.errors);
        } else {
          this.toastr.error(error.statusText, error.status);
        }
        break;
      case 404:
        this.router.navigateByUrl("/not-found");
        break;
      case 500:
        const navigationExtras: NavigationExtras = {
          state: { error: error.error },
        };
        this.router.navigateByUrl("/server-error", navigationExtras);
        break;
      default:
        this.toastr.error("Something unexpected went wrong.");
        console.error(error);
        break;
    }
  }

  private static handleModalStateErrors(errors) {
    const modalStateErrors = [];

    for (const key in errors) {
      let errorBody = errors[key];
      if (errorBody) {
        modalStateErrors.push(errorBody);
      }
    }
    throw modalStateErrors.flat();
  }
}
