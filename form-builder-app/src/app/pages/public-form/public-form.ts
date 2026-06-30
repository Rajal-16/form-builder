import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormService } from '../../services/form';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';



type FieldKind =
  | 'single-line'
  | 'paragraph'
  | 'checkbox'
  | 'dropdown'
  | 'radio'
  | 'date'
  | 'time'
  | 'upload'
  | 'rating-star'
  | 'image'
  | 'terms'
  | 'rating-number';

interface FieldValidation {
  type: 'Length' | 'Number' | 'Text' | 'Regular Expression';
  operator: string;
  value: string;
  errorText: string;
}

// Same shape as the CanvasField interface in form-builder.ts, so JSON.parse
// of the "previewForm" localStorage entry maps onto it directly.
interface CanvasField {
  id: string;
  kind: FieldKind;
  displayName: string;
  glyph: string;
  bg: string;
  label: string;
  placeholder: string;
  required: boolean;
  expanded: boolean;
  menuOpen: boolean;
  showDescription: boolean;
  description: string;
  showValidation: boolean;
  validation: FieldValidation;
  hasOptions: boolean;
  options: string[];
}

interface FormSetupData {
  formName: string;
  branch: string;
  logoUrl: string;
  section: string;
  responsibleUser: string;
  status: string;
  buttonName: string;
  academicYear: string;
  description: string;
  successMessage: string;
  confirmMessage: string;
}


@Component({
  selector: 'app-public-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './public-form.html',
  styleUrl: './public-form.scss',
})
export class PublicForm {



  constructor(
    private route: ActivatedRoute,
    private formService: FormService,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) { }
  form: any = null;


  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id')!;

    this.formService.getForm(id).subscribe((res: any) => {
      console.log(res.formName);
      this.form = res;
      this.fields = res.fields;

      this.initAnswers();
      this.cdr.detectChanges();
    });
  }

  setup: FormSetupData = {
    formName: 'Untitled Form',
    branch: '',
    logoUrl: '',
    section: '',
    responsibleUser: '',
    status: 'unpublished',
    buttonName: 'Submit',
    academicYear: '',
    description: '',
    successMessage: 'Your Inquiry Has Been Submitted Successfully!',
    confirmMessage:
      'Are you sure you want to submit your inquiry? Please review your details before proceeding.',
  };

  fields: CanvasField[] = [];


  answers: { [fieldId: string]: any } = {};

  errors: { [fieldId: string]: string | null } = {};

  fileNames: { [fieldId: string]: string } = {};

  submitted = false;


  private initAnswers() {
    for (const field of this.fields) {
      if (field.kind === 'checkbox') {
        this.answers[field.id] = [];
      } else if (field.kind === 'terms') {
        this.answers[field.id] = false;
      } else if (field.kind === 'rating-star' || field.kind === 'rating-number') {
        this.answers[field.id] = 0;
      } else {
        this.answers[field.id] = '';
      }
      this.errors[field.id] = null;
    }
  }



  isChecked(field: CanvasField, option: string): boolean {
    return (this.answers[field.id] as string[]).includes(option);
  }

  toggleCheckbox(field: CanvasField, option: string) {
    const list: string[] = this.answers[field.id];
    const idx = list.indexOf(option);
    if (idx > -1) {
      list.splice(idx, 1);
    } else {
      list.push(option);
    }
  }

  setRating(field: CanvasField, value: number) {
    this.answers[field.id] = value;
  }

  ratingRange(field: CanvasField): number[] {
    const max = field.kind === 'rating-star' ? 5 : 10;
    return Array.from({ length: max }, (_, i) => i + 1);
  }

  onFileChange(field: CanvasField, event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files && input.files.length ? input.files[0] : null;
    this.answers[field.id] = file;
    this.fileNames[field.id] = file ? file.name : '';
  }



  private validateField(field: CanvasField): string | null {
    const value = this.answers[field.id];

    if (field.required) {
      const empty =
        value === '' ||
        value === null ||
        value === undefined ||
        (Array.isArray(value) && value.length === 0) ||
        (field.kind === 'terms' && value === false) ||
        ((field.kind === 'rating-star' || field.kind === 'rating-number') && value === 0);

      if (empty) {
        return 'This field is required';
      }
    }

    if (field.showValidation && field.validation && typeof value === 'string' && value !== '') {
      const v = field.validation;

      if (v.type === 'Length') {
        if (!this.compare(value.length, v.operator, v.value)) {
          return v.errorText || `Length must be ${v.operator.toLowerCase()} ${v.value}`;
        }
      }

      if (v.type === 'Number') {
        if (v.operator === 'Is Number') {
          if (value.trim() === '' || isNaN(Number(value))) {
            return v.errorText || 'Must be a number';
          }
        } else if (v.operator === 'Whole Number') {
          if (!/^-?\d+$/.test(value.trim())) {
            return v.errorText || 'Must be a whole number';
          }
        } else {
          const num = Number(value);
          if (isNaN(num)) {
            return v.errorText || 'Must be a number';
          }
          if (!this.compare(num, v.operator, v.value)) {
            return v.errorText || `Value must be ${v.operator.toLowerCase()} ${v.value}`;
          }
        }
      }

      if (v.type === 'Regular Expression' && v.value) {

        const regex = new RegExp(v.value);
        if (!regex.test(value)) {
          return v.errorText || 'Invalid format';
        }

      }
    }

    return null;
  }

  private compare(actual: number, operator: string, raw: string): boolean {
    if (operator === 'Between' || operator === 'Not Between') {
      const [minStr, maxStr] = raw.split(',').map((s) => s.trim());
      const min = Number(minStr);
      const max = Number(maxStr);
      const inRange = actual >= min && actual <= max;
      return operator === 'Between' ? inRange : !inRange;
    }

    const target = Number(raw);
    switch (operator) {
      case 'Greater Then or Equal to': return actual >= target;
      case 'Greater Then': return actual > target;
      case 'Less Then': return actual < target;
      case 'Less Then or Equal to': return actual <= target;
      case 'Equal to': return actual === target;
      case 'Not Equal to': return actual !== target;
      default: return true;
    }
  }

  private validateAll(): boolean {
    let valid = true;
    for (const field of this.fields) {
      const message = this.validateField(field);
      this.errors[field.id] = message;
      if (message) valid = false;
    }
    return valid;
  }



  onSubmit() {

    if (!this.validateAll()) {
      return;
    }

    if (!confirm(this.setup.confirmMessage)) {
      return;
    }

    const formattedAnswers: any = {};

    this.fields.forEach(field => {

      const key = field.label?.trim() || field.displayName;

      formattedAnswers[key] = this.answers[field.id];

    });

    const payload = {
      formId: Number(this.route.snapshot.paramMap.get('id')),
      answers: formattedAnswers
    };

    this.formService.submitResponse(payload).subscribe({
      next: () => {
        alert(this.setup.successMessage);
        this.submitted = true;
      },
      error: (err) => {
        console.error(err);
        alert('Submission failed.');
      }
    });

  }

  submitAnother() {
    this.submitted = false;
    this.initAnswers();
    this.fileNames = {};

  }

}
