import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup , Validators , ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-form-setup',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
 
    
  ],
  templateUrl: './form-setup.html',
  styleUrl: './form-setup.scss'
})
export class FormSetupComponent {

  form: FormGroup;

  branches = [
    'Computer Engineering',
    'Information Technology',
    'Mechanical Engineering',
    'Civil Engineering',
    'Electrical Engineering',
    'Electronics & Communication'
  ];

  sections = [
    'Section A',
    'Section B',
    'Section C',
    'Section D',
    'Section E'
  ];

  responsibleUsers = [
    'Wama Software',
    'Admin User',
    'Rajal Patel',
    'Faculty Coordinator',
    'Student Support'
  ];

  buttonNames = [
    'Submit',
    'Apply Now',
    'Register',
    'Send Inquiry',
    'Save'
  ];

  academicYears = [
    '2025-2026',
    '2026-2027',
    '2027-2028'
  ];

  constructor(private fb: FormBuilder , private router: Router) {



   this.form = this.fb.group({
  formName: ['', [Validators.required, Validators.minLength(3)]],
  branch: ['', Validators.required],
  logoUrl: [''],
  section: ['', Validators.required],
  responsibleUser: [''],
  status: ['unpublished', Validators.required],
  buttonName: ['', Validators.required],
  academicYear: [''],
  description: [''],
  successMessage: [
   'Your Inquiry Has Been Sumited Successfully!' ,
    Validators.required
  ],
  confirmMessage: [
    'Are you sure you want to submit your inquiry? Please review your details before proceeding.',
    Validators.required
  ]
});

    this.loadForm();
  }

  saveAndNext() {
  if (this.form.invalid) {
    this.form.markAllAsTouched();
    return;
  }


  localStorage.setItem(
    'formSetupData',
    JSON.stringify(this.form.value)
  );
  
  this.router.navigate(['/form-builder']);
}

  cancel() {

    localStorage.removeItem('formSetup');

    this.form.reset({
      branch: '',
      section: '',
      responsibleUser: '',
      status: 'unpublished',
      buttonName: '',
      academicYear: '',
      successMessage:
        'Your Inquiry Has Been Sumited Successfully!',
      confirmMessage:
        'Are you sure you want to submit your inquiry? Please review your details before proceeding.'
    });
  }

  private loadForm() {

    const saved = localStorage.getItem('formSetup');

    if (saved) {
      this.form.patchValue(
        JSON.parse(saved)
      );
    }
  }

  get f() {
    return this.form.controls;
  }
}