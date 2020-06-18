# Formularios Reactivos con Angular:


Tipos de Formularios en Angular :

1. FormControl
2. FormGroup => grupo de formcontrol
3. FormBuilder => crea de forma mas sencilla 

### Form Control:

Es la pieza mas pequeña de formularios con angular ,es la mas pequeña y importante para poder enteder formularios en angular.

1. Importar en el modulo para formularios reactivos
```typescript
import { ReactiveFormsModule } from '@angular/forms';
```
2. Instanciamos en una variable el FormControl y lo importamos 
```typescript
public email: FormControl = new FormControl('')
```
3. Agregamos a nuestro template un input con un Formcontrol:
```html
<div class="col-sm-12 col-md-6 col-lg-8">
  <p class="text-center display-4">Email:</p>
  <input [formControl]='email' type="email" class="form-control">
</div>
``` 
4. obtener el valor del input : 
```typescript
getEmail(event: Event) {
  event.preventDefault();
  console.log(this.emailCtrl.value);
}
```
5. Creamos un botón para recibir el valor
```html
<button (click)='getEmail($event)' class="btn btn-block btn-primary">
  Send Data
</button>
```
> hasta aqui estaria funcionando 

Para poder harlo reactivo:

1. debemos agregar el evento de cambio
esto escuchara el cambio de valor en el input
```typescript 
constructor() {
  this.email.valueChanges
  .subscribe(value=>{
    console.log(value)
  })
}
```
2. Para solo poder escuchar cuando el ususario haya estado en inactividad por n segundo y no estar a la escucha todo el tiempo del input :
```typescript
import { debounceTime } from 'rxjs/operators' // libreria rxjs
constructor() {
    this.email.valueChanges
    .pipe(
      debounceTime(350)// lo usamos para obtener el valor en sieto estado de inactividad  
    )
    .subscribe(value=>{
      console.log(value)
    })
  }
```
Validaciones :
1. Debemos importar el Validators:
```typescript
import { FormControl , Validators } from '@angular/forms';
//implementacion
public email: FormControl = new FormControl('', [
  Validators.required ,
  Validators.email,
  Validators.maxLength(20),
  Validators.minLength(5)
])
```
2. Para que sea obligatorio el campo podemos hacer lo siguiente :
```html
<div class="container">
  <div class="row d-flex justify-content-center">
    <div class="col-sm-12 col-md-6 col-lg-8">
      <p class="text-center display-4">Email:</p>
      <input [formControl]='email' type="email" class="form-control">
      <!-- atravez del if hacemos la logica para el form -->
      <span *ngIf="email.hasError('required') && email.touched" >Este campo es requerido</span>
      <button (click)='getEmail($event)' [disabled]='email.invalid' class="mt-2 btn btn-block btn-primary">
        Send Data
      </button>
    </div>
  </div>
</div>
```
## FormGroup:
Grupo de formControls
debemos de seguir casi los mismos pasos : 
aumentando lo sigiente : 
```typescript
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { debounceTime } from 'rxjs/operators'
```
tambien cambia la forma de declarar el formGroup:

```typescript
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
```

## FormBuild :
Es muy parecido al formGroup , pero con algunos cambio y mejoras .

debemos de seguir casi los mismos pasos : 
aumentando lo sigiente : 
```typescript
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { debounceTime } from 'rxjs/operators' // para poder observar cambio


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


```

templete 
```html
<form [formGroup]='formUser' (submit)='SendData($event)' >
  <input formControlName='name' type="text" class="mt-2 form-control" placeholder="Enter name"/>
  <input formControlName='surname' type="text" class="mt-2 form-control" placeholder="Enter surname"/>
  <input formControlName='email' type="email" class="mt-2 form-control" placeholder="Enter email"/>
  <select formControlName='sub' class="my-2 form-control">
    <option value="1">Value 1</option>
    <option value="2">Value 2</option>
    <option value="3">Value 3</option>
  </select>
  <input formControlName='gender' type="radio" name="gender" value="M" /> Masculino<br>
  <input formControlName='gender' type="radio" name="gender" value="F" /> Femenino<br>
  <input formControlName='gender' type="radio" name="gender" value="O" /> Otros
  <input formControlName='pass' type="password" class="my-2 form-control" placeholder="password"/>
  <small> {{ getpass.value.length }}/10 </small>
  <span *ngIf="getpass.errors && getpass.touched">
    <small *ngIf="getpass.hasError('minlength')" >Debe tener minino 10 caracteres</small>
    <small *ngIf="getpass.hasError('required')" >Este campo es obligatorio</small>
  </span>

<button [disabled]='formUser.invalid' type="submit" class="mt-2 btn btn-block btn-primary">SendData</button>
</form>
```



link : 
> https://gist.github.com/nicobytes/8d588ec2e7e599bbb3fd59a993fdd336
