import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs'; 
import { environment } from 'src/environments/environment';
import { ContactData } from 'src/app/Model/contactFolder/contactData';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  constructor(private http: HttpClient) { }

  sendContactEmail(data: ContactData): Observable<null> {
    let url = environment.apiUrl + "/home/sendEmail";
    let options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post<null>(url, data, options);
  }
}
