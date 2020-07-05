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
    errorMessage: string;
    successMessage: string;


    minRows: Number;

    constructor(private apiService: ApiService) {
      this.resetData();
      this.errorMessage = "";
      this.successMessage = "";
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

  onSubmitClick() {

      this.successMessage = "";
      if (!this.contactData.message ||  this.contactData.message === "") {
        this.errorMessage = "Empty mail...";
        return;
      };

      this.contactData.dateSent = new Date();
      this.apiService.sendContactEmail(this.contactData).subscribe(() => {
        this.resetData();
        this.errorMessage = "";
        this.successMessage = "Message send!";
      },
      err => {
        console.log(err);
        this.errorMessage = "Error :(";
      })
    }
 
}
