import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-patient-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './patient-form.html',
  styleUrls: ['./patient-form.scss']
})
export class PatientFormComponent {
  patientForm: FormGroup;
  successMsg = '';
  photoBase64: string = '';

  constructor(private fb: FormBuilder, private router: Router) {
    this.patientForm = this.fb.group({
      name: ['', Validators.required],
      age: ['', [Validators.required, Validators.min(1)]],
      gender: ['', Validators.required],
      phone: ['', [Validators.required, Validators.minLength(10)]],
      admissionDate: ['', Validators.required],
      dischargeDate: [''],
      address: ['', Validators.required],
      doctor: ['', Validators.required],
      bill: ['', Validators.required]
    });
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      this.photoBase64 = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  onSubmit() {
    if (this.patientForm.invalid) return;
    const newPatient = this.patientForm.value;
    const patients = JSON.parse(localStorage.getItem('patients') || '[]');
    newPatient.id = Date.now();
    patients.push(newPatient);
    localStorage.setItem('patients', JSON.stringify(patients));
    this.successMsg = 'Patient added successfully';
    this.patientForm.reset();
    setTimeout(() => {
      this.router.navigate(['/patients']);
    }, 1000);
  }
}