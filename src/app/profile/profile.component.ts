import { Component, OnInit } from '@angular/core';
import { Router} from "@angular/router";
import { ApiService } from "../shared/api.service";
import {MatDialog} from '@angular/material/dialog';
import { RegistrationComponent } from '../registration/registration.component';
import { FormBuilder, FormGroup} from "@angular/forms"


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  employeeData !: any;
  formValue !: FormGroup;

  constructor(private router:Router,private api:ApiService, public dialog: MatDialog) { }

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
 
}
