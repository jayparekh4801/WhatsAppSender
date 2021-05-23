import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class DashboardService {

	constructor(private http: HttpClient) { }

	createMessage(data : any) {
		let header = new HttpHeaders();
		header = header.set('authorization', "Bearer " + localStorage.getItem('accessToken'));
		return this.http.post('http://localhost:8000/addMessage', data, {headers : header});
	}

	getMessages() {
		let header = new HttpHeaders();
		header = header.set('authorization', "Bearer " + localStorage.getItem('accessToken'));
		return this.http.get('http://localhost:8000/getMessages', {headers : header});
	}

}
