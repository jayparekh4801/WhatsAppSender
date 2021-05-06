import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SignUpData } from 'src/app/Datamodels/SignUpData';
import { SignUpService } from 'src/app/Services/sign-up.service';
import Swal  from 'sweetalert2'

@Component({
	selector: 'app-sign-up',
	templateUrl: './sign-up.component.html',
	styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

	constructor(private signUpService : SignUpService,
				private router : Router) { }

	signUpData : SignUpData = {
		email : "",
		userName : "",
		password : ""
	}

	ngOnInit(): void {
	}

	signUp() {
		this.signUpService.signUp(this.signUpData).subscribe((data : any) => {
			if(data.success) {
				Swal.fire("WhatsAppSender", "You Registered Successfully", "success").then((result) => {
					if(result) {
						this.router.navigate(["/logIn"]);
					}
				})
			}
			else {
				Swal.fire("WhatsAppSender", "This User Is Already Registered Or Username Is In Already Used Please Use Different Onne","error");
			}
		})
	}

}
