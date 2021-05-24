import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { AddMessage } from 'src/app/Datamodels/AddMessage';
import { DashboardService } from 'src/app/Services/dashboardServices/dashboard.service';
import Swal from 'sweetalert2';

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

	constructor(private dashboardService : DashboardService,
				private sanitizer : DomSanitizer) { }
	newMessage : AddMessage = {
		title : "",
		message : "",
		link : "whatsapp://send?text="
	}

	savedMessages : AddMessage[];

	// update message vars

	updateMessageBool : boolean = false;
	updateMessage : string = "";

	ngOnInit(): void {
		this.dashboardService.getMessages().subscribe((data : any) => {
			this.savedMessages = data.data
			console.log(this.savedMessages)
		})
	}

	

	addMessage() {
		this.newMessage.title = prompt("Enter Title Of Message");
		this.newMessage.link = this.newMessage.link + this.newMessage.message;
		this.dashboardService.createMessage(this.newMessage).subscribe((data : any) => {
			if(data.success) {
				window.location.reload()
			}
			else {
				Swal.fire("WhatsAppSender", data.message, "warning");
			}
			
		});
	}

	deleteMessage(title : any) {
		this.dashboardService.deleteMessage(title).subscribe((data : any) => {
			if(data.success) {
				window.location.reload()
			}
			else {
				Swal.fire("WhatsAppSender", data.message, "warning");
			}
		})
	}

	update(message : any) {
		this.updateMessageBool = true;
		this.updateMessage = message;
	}

	urlSanitizer(url : any) {
		return this.sanitizer.bypassSecurityTrustUrl(url);
	}

}
