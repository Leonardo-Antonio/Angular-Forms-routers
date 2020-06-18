import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { debounceTime } from 'rxjs/operators'
@Component({
  selector: 'app-form-group',
  templateUrl: './form-group.component.html',
  styleUrls: ['./form-group.component.css']
})
export class FormGroupComponent implements OnInit {

  public formUser: FormGroup

  constructor() {
    this.groupFromUser()
  }

  ngOnInit(): void {
  }

  private groupFromUser(){

    this.formUser = new FormGroup({
      name: new FormControl('' , [Validators.required]),
      surname: new FormControl('' , [Validators.required]),
      number: new FormControl('' , [Validators.required]),
      email: new FormControl('' , [Validators.required , Validators.email]),
      pass: new FormControl('' , [Validators.required , Validators.minLength(10)])
    })
    /* this.formUser.valueChanges
    .pipe(
      debounceTime(350)
    )
    .subscribe(value=>{
      console.log(value)
    }) */
  }

  saveData():void{
    /* event.preventDefault() */
    console.log(this.formUser.value)
  }

}
