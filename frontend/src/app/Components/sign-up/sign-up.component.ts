import { Component, OnInit } from '@angular/core';
import { SignUpData } from 'src/app/Datamodels/SignUpData';
import { SignUpService } from 'src/app/Services/sign-up.service';

@Component({
	selector: 'app-sign-up',
	templateUrl: './sign-up.component.html',
	styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

	constructor(private signUpService : SignUpService) { }

	signUpData : SignUpData = {
		email : "",
		userName : "",
		password : ""
	}

	ngOnInit(): void {
	}

	signUp() {
		this.signUpService.signUp(this.signUpData).subscribe((data : any) => {
			console.log(data);
		})
	}

}
