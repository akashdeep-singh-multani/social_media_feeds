import { Injectable } from "@angular/core";
import { AuthService } from "../services/auth.service";
import { CanActivate, Router } from "@angular/router";
import { Observable, map, take } from "rxjs";
import { Store } from "@ngrx/store";
import { selectIsLoggedIn } from "../store/selectors/auth.selectors";

@Injectable()
export class AuthGuard implements CanActivate{
    constructor(private store:Store,private authService:AuthService, private router: Router){}

    canActivate(): Observable<boolean>{
        return this.store.select(selectIsLoggedIn).pipe(
            take(1),
            map(isLoggedIn=>{
                if(isLoggedIn){
                    return true;
                }
                else{
                    this.router.navigate(['/login']);
                    return false;
                }
            })
        );
    }
}