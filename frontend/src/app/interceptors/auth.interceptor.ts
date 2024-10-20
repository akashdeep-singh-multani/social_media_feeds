import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {

  constructor(private cookieService:CookieService) { }

  intercept(req:HttpRequest<any>, next:HttpHandler): Observable<HttpEvent<any>>{
    const token=this.cookieService.get('jwt');
    if(token){
      console.log("intercept token present")
      const clonedRequest=req.clone({
        setHeaders:{
          Authorization: `Bearer ${token}`
        }
      });
      return next.handle(clonedRequest);
    }
    console.log("intercept token not present")
    return next.handle(req);
  }

}
