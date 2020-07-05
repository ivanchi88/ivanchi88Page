import { Component, OnInit } from '@angular/core'; 
import { ContactData } from 'src/app/Model/contactFolder/contactData';
import { ApiService } from 'src/app/Services/ApiService/api-service.service';
@Component({
  selector: 'app-contact-form-component',
  templateUrl: './contactFormComponent.component.html',
  styleUrls: ['./contactFormComponent.component.scss']
})
export class ContactFormComponent implements OnInit {
 
    contactData : ContactData;
    message: string;

    minRows: Number;

    constructor(private apiService: ApiService) {
      this.resetData();
      this.message = "";
     }

    resetData() {
      this.contactData = {
        dateSent: null,
        message: "",
        subject: "",
        senderFirstName: "",
        senderLastName: "",
        sender :""
      }; 
    }
 
    ngOnInit() {
      this.minRows = 10;
    }

    onSubmitClick () {
      if (!this.contactData.message ||  this.contactData.message === "") {
        this.message = "Empty mail...";
        return;
      };
      this.contactData.dateSent = new Date();
      this.apiService.sendContactEmail(this.contactData).subscribe(() => {
        this.resetData();
        this.message = "Succes :)";
      },
      err => {
        console.log(err);
        this.message = "Error :(";
      })
    }
 
}
