import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class LogInService {

	constructor(private http: HttpClient) { }

	logIn(data: any) {
		return this.http.post("http://localhost:8000/logIn", data);
	}
}
