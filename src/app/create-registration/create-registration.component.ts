import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-create-registration',
  templateUrl: './create-registration.component.html',
  styleUrls: ['./create-registration.component.scss'],
})
export class CreateRegistrationComponent implements OnInit {
  public packages: string[] = ['Monthly', 'Quarterly', 'Yearly'];
  public genders: string[] = ['Male', 'Female', 'Other'];
  public importantList: string[] = [
    'Toxic Fat reduction',
    'Energy and Endurance',
    'Building Lean Muscle',
    'Healthy Digstive System',
    'Sugar Craving Body',
    'Fitness and Flexibility',
  ];

  public registerForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      firstName: [''],
      lastName: [''],
      email: [''],
      phone: [''],
      weight: [''],
      height: [''],
      bmi: [''],
      bmiResult: [''],
      gender: [''],
      requireTrainer: [''],
      package: [''],
      important: [''],
      haveGymBefore: [''],
      enquiryDate: [''],
    });

    this.registerForm.controls['height'].valueChanges.subscribe((res) => {
      this.calculateBMI(res);
    });
  }

  submitForm(): void {
    console.log(this.registerForm.value);
  }

  calculateBMI(heightValue: number): void {
    const weight = this.registerForm.value.weight;
    const height = heightValue;
    const bmi = weight / (height * height); // BMI Formula
    this.registerForm.controls['bmi'].patchValue(bmi);

    switch (true) {
      case bmi < 18.5:
        this.registerForm.controls['bmiReqult'].patchValue('Underweight');
        break;
      case bmi >= 18.5 && bmi < 25:
        this.registerForm.controls['bmiReqult'].patchValue('Normal');
        break;
      case bmi >= 25 && bmi < 30:
        this.registerForm.controls['bmiReqult'].patchValue('Overweight');
        break;

      default:
        this.registerForm.controls['bmiReqult'].patchValue('Obese');
        break;
    }
  }
}
