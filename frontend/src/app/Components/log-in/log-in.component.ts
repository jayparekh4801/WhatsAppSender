import { Component, OnInit } from '@angular/core';
import { LogInData } from 'src/app/Datamodels/LogInData';

@Component({
	selector: 'app-log-in',
	templateUrl: './log-in.component.html',
	styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {

	constructor() { }

	logInData : LogInData = {
		userName : "", 
		password : ""
	}
	
	ngOnInit(): void {
	}

}
