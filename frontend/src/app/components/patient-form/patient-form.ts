import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

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
  selectedFile: File | null = null;

  constructor(private fb: FormBuilder, private router: Router, private http: HttpClient) {
    this.patientForm = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
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

  const formData = new FormData();

  formData.append('first_name', this.patientForm.value.first_name);
  formData.append('last_name', this.patientForm.value.last_name);
  formData.append('age', this.patientForm.value.age);
  formData.append('gender', this.patientForm.value.gender);
  formData.append('phone', this.patientForm.value.phone);
  formData.append('address', this.patientForm.value.address);
  formData.append('doctor', this.patientForm.value.doctor);
  formData.append('bill', this.patientForm.value.bill);
  formData.append('admissionDate', this.patientForm.value.admissionDate);
  formData.append('dischargeDate', this.patientForm.value.dischargeDate);

  // send image
  if (this.selectedFile) {
    formData.append('photo', this.selectedFile);
  }

  this.http.post('http://127.0.0.1:5000/patients', formData)
    .subscribe({
      next: (res: any) => {
        this.successMsg = res.message;
        this.patientForm.reset();

        setTimeout(() => {
          this.router.navigate(['/patients']);
        }, 1000);
      },
      error: (err) => {
        console.error(err);
        alert('Error adding patient');
      }
    });
}


  fillDummy() {
  this.patientForm.patchValue({
    first_name: 'Steve',
    last_name: 'Doe',
    age: 30,
    gender: 'Male',
    phone: '9999999999',
    address: 'Noida Sector 1',
    doctor: 'Dr. Sharma',
    bill: 2000,
    admissionDate: '2024-01-10',
    dischargeDate: '2024-01-15'
  });
}



}