import { Injectable } from '@angular/core';
import { ApiService } from '../ApiService/api-service.service';

@Injectable({
    providedIn: 'root'
  })

  export class ContactFormService {
  
    constructor(private apiService: ApiService) { }
  
}