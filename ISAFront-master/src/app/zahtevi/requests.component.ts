import { Component, OnInit } from "@angular/core";
import { RequestService } from '../service/requests.service';
import { Patient } from '../model/Patient';

@Component({
    templateUrl: './requests.component.html',
    styleUrls: ['./requests.component.css']
})

export class RequestComponent implements OnInit {

    requests: Patient[] = [];
    message = "";
    denyClicked = false;
    constructor(private service: RequestService) { }
    deletedUser = "";
    ngOnInit(): void {
        this.getRequest();
    }

    getRequest() {
        this.service.getRequest().subscribe(
            data => {
                this.requests = data;
            }, error => {
                console.log(error);
            }
        )
    }

    deleteRequests(patient: Patient) {
        this.denyClicked = true;
        this.service.deleteRequest(patient).subscribe((result) => {
        })
        this.deletedUser = patient.email;
    }

    accept(patient: Patient) {
        this.service.acceptRequest(patient).subscribe((result) => {
            this.getRequest();
        })
    }
    sendMessage() {
        this.denyClicked = false;
        console.log(this.message);
        this.getRequest();
        this.service.sendMessage(this.message, this.deletedUser).subscribe((result) => {
            this.getRequest();
        })
    }

}