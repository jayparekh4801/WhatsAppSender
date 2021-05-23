import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
// import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
	providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

	constructor(private auth: AuthService,
				private router : Router) { }
	canActivate(): boolean {
		if(!this.auth.isAuthenticated()) {
			this.router.navigate(['/logIn']);
      		return false;
		}
		return true;
	}
}
