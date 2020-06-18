import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { debounceTime } from 'rxjs/operators'
@Component({
  selector: 'app-form-builder',
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.css']
})
export class FormBuilderComponent implements OnInit {

  formUser: FormGroup

  constructor(
    private formBuilder: FormBuilder
  ) {
    this.FormUserGroup()
  }

  ngOnInit(): void {
  }

  private FormUserGroup():void{
    this.formUser = this.formBuilder.group({
      name: ['', [Validators.required]],
      surname: ['', [Validators.required]],
      email: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      sub: ['', [Validators.required]],
      pass: ['', [Validators.required , Validators.minLength(10)]]
    })
  }

  SendData(e: Event){
    e.preventDefault()
    if(this.formUser.valid){
      console.log(this.formUser.value)
    }
  }

  get getpass(){
    return this.formUser.get('pass')
  }

}
