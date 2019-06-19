import { Component, OnInit } from '@angular/core'; 
import { ContactData } from 'src/app/Model/contactFolder/contactData';
@Component({
  selector: 'app-contact-form-component',
  templateUrl: './contactFormComponent.component.html',
  styleUrls: ['./contactFormComponent.component.scss']
})
export class ContactFormComponent implements OnInit {
 
    contactData : ContactData;

    constructor() { }
 
    ngOnInit() {
    }
 
}