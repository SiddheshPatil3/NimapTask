import { Component, OnInit } from '@angular/core';
import { Router} from "@angular/router";
import { ApiService } from "../shared/api.service";
import {MatDialog} from '@angular/material/dialog';
import { RegistrationComponent } from '../registration/registration.component';
import { FormBuilder, FormGroup} from "@angular/forms"
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  employeeData !: any;
  formValue !: FormGroup;

  constructor(private router:Router,private _sanitizer: DomSanitizer,private api:ApiService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this. getData();
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
      JSON. stringify(this.employeeData);
    })
    console.log(this.employeeData);
  }

  deleteData(data: any){ 
    this.api.deleteRegisterData(data.id)
    .subscribe(res=>{
      alert("Data Deteted Successfully!");
      this.getData();
    })
  }

  onEdit(row: any){
    this.formValue.controls['firstName'].setValue(row.firstName);
    this.formValue.controls['lastNmae'].setValue(row.lastNmae);
    this.formValue.controls['email'].setValue(row.email);
    this.formValue.controls['mobile'].setValue(row.mobile);
    this.formValue.controls['address'].setValue(row.address);
    this.formValue.controls['tag'].setValue(row.tag);
  }

  getImg(image:any) {
    return this._sanitizer.bypassSecurityTrustUrl(image);
}
 
}
