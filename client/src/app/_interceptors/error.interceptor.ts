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
        this.handle400And401Error(error);
        break;
      case 404:
        this.router.navigateByUrl("/not-found");
        break;
      case 500:
        this.handle500ServerError(error);
        break;
      default:
        this.toastr.error("Something unexpected went wrong.");
        console.error(error);
        break;
    }
  }

  private handle400And401Error(error) {
    if (error?.error?.errors) {
      ErrorInterceptor.handleModalStateErrors(error.error.errors);
    } else {
      this.toastr.error(error.statusText, error.status);
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

  private handle500ServerError(error) {
    const navigationExtras: NavigationExtras = {
      state: { error: error.error },
    };
    this.router.navigateByUrl("/server-error", navigationExtras);
  }
}
