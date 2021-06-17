import { Component, OnInit } from '@angular/core';
import { Router} from "@angular/router";
import {MatSliderModule} from '@angular/material/slider';
// import { MatDialogRef, MatDialog } from "@angular/material/dialog";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  // myform:any;
  
  constructor(private router:Router, private slider:MatSliderModule, ) { }

  ngOnInit(): void {
  }

  // onSubmit() {
  //   if (this.myform.valid) {
  //     console.log("Form Submitted!");
  //   }
  // }
  // Cancel() {
  //   this.dialogRef.close(this.myform);
  // }
}
