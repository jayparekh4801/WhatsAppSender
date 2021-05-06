import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class SignUpService {

	constructor(private http : HttpClient) { }

	signUp(data : any) {
		return this.http.post("http://localhost:8000/signUp", data)
	}
}
