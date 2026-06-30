import { Routes } from '@angular/router';
import { FormSetupComponent } from './pages/form-setup/form-setup';
import { FormBuilder } from './pages/form-builder/form-builder';
import { Integration } from './pages/integration/integration';
import { Preview } from './pages/form-preview/form-preview';
import { PublicForm } from './pages/public-form/public-form';


export const routes: Routes = [
  { path: '', redirectTo: 'form-setup', pathMatch: 'full' },



  { path: 'form-setup', component: FormSetupComponent },
  { path: 'form-builder', component: FormBuilder },
  { path: 'integration/:id', component: Integration },
  { path: 'preview', component: Preview },
  { path: 'form/:id', loadComponent: () =>
    import('./pages/public-form/public-form')
      .then(m => m.PublicForm)
}
];