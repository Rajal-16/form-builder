import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  private http = inject(HttpClient);

  private apiUrl = 'http://localhost:3000/forms';

  saveForm(data: any) {
    return this.http.post(this.apiUrl, data);
  }

  
   getForm(id: string) {
    return this.http.get(
      `http://localhost:3000/forms/${id}`
    );
  }

  submitResponse(data: any) {

  return this.http.post(

      'http://localhost:3000/response',

      data

  );

}
}