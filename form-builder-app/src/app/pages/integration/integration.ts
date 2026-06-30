import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QRCodeComponent } from 'angularx-qrcode';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-integration',
    standalone: true,
  imports: [CommonModule, QRCodeComponent],
  templateUrl: './integration.html',
  styleUrl: './integration.scss',
})
export class Integration {

   formId!: number;

  formUrl = '';

  embedCode = '';

 

  ngOnInit() {

   const formId = Number(this.route.snapshot.paramMap.get('id'));

  this.formUrl = `http://localhost:4200/form/${formId}`;

    this.embedCode =

`<iframe
src="${this.formUrl}"
width="100%"
height="700"
frameborder="0">
</iframe>`;

  }

  isCopied = false;



  constructor(
    private route: ActivatedRoute,
     private router : Router
  ) {}

  copy(text: string) {

    navigator.clipboard.writeText(text);

    alert('form link copied sucessfully');

  }


  PublishForm(){
 alert("form publish sucessfully..")
 localStorage.clear();
 this.router.navigate(['/form-setup'])

  }

  cancel(){
 let res=confirm("are you sure you want to cancel this form ?")

 if(res){
   this.router.navigate(['/form-setup']);
   localStorage.clear();
 }
  }


}
