import { Component, OnInit } from '@angular/core';
import { Router} from "@angular/router";
import {MatSliderModule} from '@angular/material/slider';
import { MatDialogRef, MatDialog } from "@angular/material/dialog";
import { FormBuilder, FormGroup} from "@angular/forms"
import { RegistrationModel } from './registration.model';
import { ApiService } from "../shared/api.service"

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  myform:any;
  emp !:any;
  
  formValue !: FormGroup;
  registrationModelObj : RegistrationModel = new RegistrationModel();

  constructor(private router:Router, private api:ApiService, private formBuilder: FormBuilder, public MatDialogRef: MatDialogRef<RegistrationComponent>, private slider:MatSliderModule, private matDialog: MatDialog) { }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      firstName : [''],
      lastName : [''],
      email : [''],
      mobile : [''],
      state : [''],
      country : [''],
      address : [''],
      tag : [''],
    })
  }

  Cancel() {
    this.MatDialogRef.close(this.myform);
  }

  postRegistrion(){
    this.registrationModelObj.firstname = this.formValue.value.firstName;
    this.registrationModelObj.lastName = this.formValue.value.lastName;
    this.registrationModelObj.email = this.formValue.value.email;
    this.registrationModelObj.mobile = this.formValue.value.mobile;
    this.registrationModelObj.address = this.formValue.value.address;
    this.registrationModelObj.tag = this.formValue.value.tag;

    this.api.postRegisterData(this.registrationModelObj)
    .subscribe(res=>{
      console.log(res);
      alert("Registration Data Added Successfully");
      let ref = document.getElementById("cancel")
      ref?.click(); 
      this.formValue.reset();
      
    },
    err=>{
      alert("Something Went Wrong")
    })
  }
}
