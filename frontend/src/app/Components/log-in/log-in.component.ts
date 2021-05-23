import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LogInData } from 'src/app/Datamodels/LogInData';
import { LogInService } from 'src/app/Services/log-in.service';
import Swal from 'sweetalert2';
@Component({
	selector: 'app-log-in',
	templateUrl: './log-in.component.html',
	styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {

	constructor(private logInService : LogInService,
				private router : Router) { }

	logInData : LogInData = {
		userName : "", 
		password : ""
	}

	ngOnInit(): void {
	}

	logIn() {
		this.logInService.logIn(this.logInData).subscribe((data : any) => {
			console.log(data)
			if(data.success) {
				localStorage.setItem("accessToken", data.accessToken);
				this.router.navigate(['/dashBoard']);
			}
			else {
				Swal.fire("WhatsAppSender", data.message, "error");
			}
			
		})
	}
}
