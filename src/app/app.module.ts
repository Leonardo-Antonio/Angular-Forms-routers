import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormControlComponent } from './components/form-control/form-control.component';
import { FormGroupComponent } from './components/form-group/form-group.component';
import { FormBuilderComponent } from './components/form-builder/form-builder.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderNavComponent } from './components/header-nav/header-nav.component'

import { RouterModule, Routes } from '@angular/router'

const rutas:Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'formcontrol',
    component: FormControlComponent
  },
  {
    path: 'formgroup',
    component: FormGroupComponent
  },
  {
    path: 'formbuilder',
    component: FormBuilderComponent
  }
]

@NgModule({
  declarations: [
    AppComponent,
    FormControlComponent,
    FormGroupComponent,
    FormBuilderComponent,
    HomeComponent,
    HeaderNavComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    RouterModule.forRoot(rutas)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
