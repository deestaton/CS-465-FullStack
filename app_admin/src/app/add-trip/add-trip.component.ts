import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { TripDataService } from '../services/trip-data.service';

@Component({
  selector: 'app-add-trip',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-trip.component.html',
  styleUrl: './add-trip.component.css',
})

export class AddTripComponent implements OnInit {
  addForm: FormGroup = new FormGroup({
    _id: new FormGroup({}),
    code: new FormGroup({}),
    name: new FormGroup({}),
    length: new FormGroup({}),
    start: new FormGroup({}),
    resort: new FormGroup({}),
    perPerson: new FormGroup({}),
    image: new FormGroup({}),
    description: new FormGroup({}),
  });
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private tripService: TripDataService
  ) {}

  ngOnInit() {
    this.addForm = this.formBuilder.group({
      _id: [],
      code: ['', Validators.required],
      name: ['', Validators.required],
      length: ['', Validators.required],
      start: ['', Validators.required],
      resort: ['', Validators.required],
      perPerson: ['', Validators.required],
      image: ['', Validators.required],
      description: ['', Validators.required],
    })
  }

  onSubmit() {
    this.submitted = true;
    if(this.addForm.valid) {
      this.tripService.addTrip(this.addForm.value)
        .subscribe(
          (data: any) => {
            console.log(data);
            this.router.navigate(['list-trips']);
        });
    }
  }
    // Get the form short name to access the form fields
  get f() { return this.addForm.controls; }
}


