import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login';
import { PatientFormComponent } from './components/patient-form/patient-form';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'add-patient', component: PatientFormComponent }

];
