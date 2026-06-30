import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { Router } from '@angular/router';
import { FormService } from '../../services/form';

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

interface PaletteItem {
  kind: FieldKind;
  label: string;
  glyph: string;
  bg: string;
}

interface FieldValidation {
  type: 'Length' | 'Number' | 'Text' | 'Regular Expression';
  operator: string;
  value: string;
  errorText: string;
}


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


@Component({
  selector: 'app-form-builder',
  standalone: true,
  imports: [CommonModule, FormsModule, DragDropModule],
  templateUrl: './form-builder.html',
  styleUrl: './form-builder.scss',
})
export class FormBuilder {

  constructor(private router: Router,private formService: FormService) {}

  formSetupData: any;

ngOnInit() {
  const data = localStorage.getItem('formSetupData');
  this.formSetupData = data ? JSON.parse(data) : null;

   const savedFields = localStorage.getItem('previewForm');
  if (savedFields) {
    this.fields = JSON.parse(savedFields);

    this.idCounter = this.fields.length;
  }
}


  palette: PaletteItem[] = [
    { kind: 'single-line', label: 'Single Line', glyph: '/assets/icons-sidebar/icon-1.png', bg: '#fde4cf' },
    { kind: 'paragraph', label: 'Paragraph', glyph: '/assets/icons-sidebar/icon-2.png', bg: '#d7f5e3' },
    { kind: 'checkbox', label: 'Checkbox', glyph: '/assets/icons-sidebar/icon-3.png', bg: '#fdf3c7' },
    { kind: 'dropdown', label: 'Dropdown', glyph: '/assets/icons-sidebar/icon-4.png', bg: '#fde2e1' },
    { kind: 'radio', label: 'Radio Button', glyph: '/assets/icons-sidebar/icon-5.png', bg: '#dde6fb' },
    { kind: 'date', label: 'Date Picker', glyph: '/assets/icons-sidebar/icon-6.png', bg: '#fde4cf' },
    { kind: 'time', label: 'Time Picker', glyph: '/assets/icons-sidebar/icon-7.png', bg: '#d7f5e3' },
    { kind: 'upload', label: 'Upload File', glyph: '/assets/icons-sidebar/icon-8.png', bg: '#e3e0fb' },
    { kind: 'rating-star', label: 'Rating Star', glyph: '/assets/icons-sidebar/icon-9.png', bg: '#fdf3c7' },
    { kind: 'image', label: 'Image', glyph: '/assets/icons-sidebar/icon-10.png', bg: '#dde6fb' },
    { kind: 'terms', label: 'Terms & Conditions', glyph: '/assets/icons-sidebar/icon-11.png', bg: '#fde2e1' },
    { kind: 'rating-number', label: 'Rating Number', glyph: '/assets/icons-sidebar/icon-12.png', bg: '#d7f5e3' },
  ];


  searchTerm = '';

  get filteredPalette(): PaletteItem[] {
    const term = this.searchTerm.trim().toLowerCase();
    if (!term) return this.palette;
    return this.palette.filter((p) => p.label.toLowerCase().includes(term));
  }

  fields: CanvasField[] = [];
  private idCounter = 0;

  validationTypeOptions: FieldValidation['type'][] = [
    'Length',
    'Number',
    'Text',
    'Regular Expression',
  ];

  operatorOptions = [
    'Greater Then or Equal to',
    'Greater Then',
    'Less Then',
    'Less Then or Equal to',
    'Equal to',
    'Not Equal to',
    'Between',
    'Not Between',
    'Is Number',
    'Whole Number',
  ];


  private displayName(kind: FieldKind): string {
    switch (kind) {
      case 'single-line':
        return 'Short Answer';
      case 'paragraph':
        return 'Paragraph';
      case 'checkbox':
        return 'Checkbox';
      case 'dropdown':
        return 'Dropdown';
      case 'radio':
        return 'Radio Button';
      case 'date':
        return 'Date Picker';
      case 'time':
        return 'Time Picker';
      case 'upload':
        return 'Upload File';
      case 'rating-star':
        return 'Rating Star';
      case 'image':
        return 'Image';
      case 'terms':
        return 'Terms & Conditions';
      case 'rating-number':
        return 'Rating Number';
    }
  }

  private hasOptionsList(kind: FieldKind): boolean {
    return kind === 'checkbox' || kind === 'dropdown' || kind === 'radio';
  }

  addField(kind: FieldKind) {
    const palette = this.palette.find((p) => p.kind === kind);
    this.idCounter += 1;
    const field: CanvasField = {
      id: 'field-' + this.idCounter,
      kind,
      displayName: this.displayName(kind),
      glyph: palette?.glyph ?? 'T',
      bg: palette?.bg ?? '#fde4cf',
      label: '',
      placeholder: '',
      required: false,
      expanded: true,
      menuOpen: false,
      showDescription: false,
      description: '',
      showValidation: false,
      validation: { type: 'Number', operator: 'Greater Then', value: '', errorText: '' },
      hasOptions: this.hasOptionsList(kind),
      options: this.hasOptionsList(kind) ? [""] : [],
    };
   
    this.fields.forEach((f) => (f.expanded = false));
    this.fields.push(field);
  }

  trackByIndex(index: number): number {
    return index;
  }

  toggleExpand(field: CanvasField) {
    field.expanded = !field.expanded;
  }

  toggleMenu(field: CanvasField, event: Event) {
    event.stopPropagation();
    const wasOpen = field.menuOpen;
    this.fields.forEach((f) => (f.menuOpen = false));
    field.menuOpen = !wasOpen;
  }

  closeMenus() {
    this.fields.forEach((f) => (f.menuOpen = false));
  }


  selectMenuOption(field: CanvasField, option: 'Show' | 'Description' | 'Response Validation') {
    if (option === 'Description') field.showDescription = !field.showDescription;
    if (option === 'Response Validation') field.showValidation = !field.showValidation;
    if (option === 'Show') field.expanded = true;
    field.menuOpen = false;
  }

  duplicateField(field: CanvasField) {
    this.idCounter += 1;
    const copy: CanvasField = JSON.parse(JSON.stringify(field));
    copy.id = 'field-' + this.idCounter;
    const index = this.fields.indexOf(field);
    this.fields.splice(index + 1, 0, copy);
  }

  removeField(field: CanvasField) {
    this.fields = this.fields.filter((f) => f.id !== field.id);
  }

  addOption(field: CanvasField) {
    field.options.push("");
  }

  removeOption(field: CanvasField, index: number) {
    field.options.splice(index, 1);
  }

  draggingKind: FieldKind | null = null;


  onPaletteDragStart(event: DragEvent, item: PaletteItem) {
    this.draggingKind = item.kind;
    event.dataTransfer?.setData('text/plain', item.kind);
    event.dataTransfer!.effectAllowed = 'copy';
  }

  onCanvasDragOver(event: DragEvent) {
    event.preventDefault();
  }

  onCanvasDrop(event: DragEvent) {
    event.preventDefault();
    const kind = (event.dataTransfer?.getData('text/plain') || this.draggingKind) as FieldKind;
    if (kind) this.addField(kind);
    this.draggingKind = null;
  }


   cancel() {


    if(this.fields.length===0){
      alert("No field is selected");
      return;
    }
    let res=confirm("Are you sure you want to cancel this form ?")

    if(res){
      this.fields=[];
    }
   }

  publishForm() {
  const payload = {
    ...this.formSetupData,
    fields: this.fields
  };

  console.log(payload);

  this.formService.saveForm(payload).subscribe({
    next: (res: any) => {
      alert('Form published successfully');

      console.log(res); 

  this.router.navigate(['/integration', res.id]);
    },
    error: (err) => {
      console.error(err);
    }
  });
}

  preview() {
  localStorage.setItem(
    'previewForm',
    JSON.stringify(this.fields)
  );

  this.router.navigate(['/preview']);
}


}