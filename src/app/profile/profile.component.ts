import { Component, OnInit } from '@angular/core';
import { Router} from "@angular/router";
import { ApiService } from "../shared/api.service";
import {MatDialog} from '@angular/material/dialog';
import { RegistrationComponent } from '../registration/registration.component';
import { FormBuilder, FormGroup} from "@angular/forms"
import { DomSanitizer } from '@angular/platform-browser';
import { RegistrationModel } from '../registration/registration.model';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {

  employeeData : any;
  formValue !: FormGroup;
  registrationModelObj : RegistrationModel = new RegistrationModel();
  // profileForm: any;
  userdata: any;
  constructor(public router:Router,private _sanitizer: DomSanitizer,private api:ApiService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getData();
  }
  openDialog() {
    const dialogRef = this.dialog.open(RegistrationComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  getData(){
    this.api.getRegisterData()
    .subscribe(res=>{
      this.employeeData = res;
      console.log(this.employeeData);
      if (res && res.length) {
        this.userdata = res[res.length-1]
      }
      
    })
  }

  deleteData(data: any){ 
    this.api.deleteRegisterData(data.id)
    .subscribe(res=>{
      alert("Data Deteted Successfully!");
      this.getData();
    })
  }

  editProfile(val : any){
    // this.registration
    // this.router.navigateByUrl('/registration', val)
    const dialogRef = this.dialog.open(RegistrationComponent, {data: {
      dataKey: val
    }});
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  // onEdit(data: any){
  //   this.formValue.controls['firstName'].setValue(data.firstName);
  //   this.formValue.controls['lastNmae'].setValue(data.lastNmae);
  //   this.formValue.controls['email'].setValue(data.email);
  //   this.formValue.controls['mobile'].setValue(data.mobile);
  //   this.formValue.controls['address'].setValue(data.address);
  //   this.formValue.controls['tag'].setValue(data.tag);
  //  }

  getImg(image:any) {
    return this._sanitizer.bypassSecurityTrustUrl(image);
  } 
  
 
}
