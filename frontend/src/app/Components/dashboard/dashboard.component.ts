import { Component, OnInit } from '@angular/core';
import { AddMessage } from 'src/app/Datamodels/AddMessage';
import { DashboardService } from 'src/app/Services/dashboardServices/dashboard.service';

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

	constructor(private dashboardService : DashboardService) { }

	ngOnInit(): void {
	}

	newMessage : AddMessage = {
		title : "",
		message : ""
	}

	addMessage() {
		this.newMessage.title = prompt("Enter Title Of Message");
		this.dashboardService.createMessage(this.newMessage).subscribe((data : any) => {
			console.log(data)
		})
	}

}
