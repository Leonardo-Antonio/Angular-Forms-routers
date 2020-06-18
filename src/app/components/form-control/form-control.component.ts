import { Component, OnInit } from '@angular/core';
import { FormControl , Validators } from '@angular/forms';

import { debounceTime } from 'rxjs/operators'

@Component({
  selector: 'app-form-control',
  templateUrl: './form-control.component.html',
  styleUrls: ['./form-control.component.css']
})
export class FormControlComponent implements OnInit {

  public email: FormControl = new FormControl('', [
    Validators.required ,
    Validators.email,
    Validators.maxLength(20),
    Validators.minLength(5)
  ])

  public numberForm: FormControl = new FormControl('',[
    Validators.required,
    Validators.maxLength(9),
  ])

  constructor() {
    this.email.valueChanges
    .pipe(
      debounceTime(350)
    )
    .subscribe(value=>{
      console.log(value)
    })

    this.numberForm.valueChanges
    .pipe(
      debounceTime(400)
    )
    .subscribe(value=>{
      console.log(value)
    })

  }

  ngOnInit(): void {
  }

  getNumber(event: Event){
    event.preventDefault()
    console.log(this.numberForm.value)
  }

  getEmail(event: Event) {
    event.preventDefault();
    console.log(this.email.value);
  }

}
