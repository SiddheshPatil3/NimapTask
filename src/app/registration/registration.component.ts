import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from "@angular/router";
import {MatSliderModule} from '@angular/material/slider';
import { MatDialogRef, MatDialog } from "@angular/material/dialog";
import { RegistrationModel } from './registration.model';
import { ApiService } from "../shared/api.service"
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DomSanitizer, } from '@angular/platform-browser';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Inject } from '@angular/core';
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  myform:any;
  emp !:any;
  urlLink:string="assets/pic.jpg"

  profileForm = new FormGroup({
    firstName: new FormControl('', [Validators.required, Validators.maxLength(20)]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    mobile: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
  });
  registrationModelObj : RegistrationModel = new RegistrationModel();

  constructor( @Inject(MAT_DIALOG_DATA) public data: any,private router:Router,private dataRoute: ActivatedRoute,private _sanitizer: DomSanitizer, private api:ApiService, public MatDialogRef: MatDialogRef<RegistrationComponent>, private slider:MatSliderModule, private matDialog: MatDialog) { }

  ngOnInit(): void { 
    // console.log(this.dataRoute.snapshot.params['val']);
    console.log(this.data);

    if (this.data) {
      this.profileForm.setValue({
        firstName: this.data.dataKey.firstname,
        lastName: this.data.dataKey.lastName,
        email: this.data.dataKey.email,
        mobile: this.data.dataKey.mobile,
        address: this.data.dataKey.address,
     });

     this.urlLink = this.data.dataKey.img;
    }
  }

  Cancel() {
    this.MatDialogRef.close(this.myform);
  }

  postRegistrion(){
    if (this.data) {
      this.registrationModelObj.firstname = this.profileForm.value.firstName;
    this.registrationModelObj.lastName = this.profileForm.value.lastName;
    this.registrationModelObj.email = this.profileForm.value.email;
    this.registrationModelObj.mobile = this.profileForm.value.mobile;
    this.registrationModelObj.address = this.profileForm.value.address;
    // this.registrationModelObj.tag = this.formValue.value.tag;
    this.registrationModelObj.img = this.urlLink;

    this.api.updateRegisterData(this.registrationModelObj, this.data.dataKey.id)
    .subscribe(res=>{
      console.log(res);
      alert("Registration Data Added Successfully");
      let ref = document.getElementById("cancel")
      ref?.click(); 
      this.profileForm.reset();
      location.reload();
      // this.router.navigate(['/profile']).then( (e) => {
      //   if (e) {
      //     console.log("Navigation is successful!");
      //   } else {
      //     console.log("Navigation has failed!");
      //   }
      // });
    },
    err=>{
      alert("Something Went Wrong")
    })
    } else {
      this.registrationModelObj.firstname = this.profileForm.value.firstName;
    this.registrationModelObj.lastName = this.profileForm.value.lastName;
    this.registrationModelObj.email = this.profileForm.value.email;
    this.registrationModelObj.mobile = this.profileForm.value.mobile;
    this.registrationModelObj.address = this.profileForm.value.address;
    // this.registrationModelObj.tag = this.formValue.value.tag;
    this.registrationModelObj.img = this.urlLink;

    this.api.postRegisterData(this.registrationModelObj)
    .subscribe(res=>{
      console.log(res);
      alert("Registration Data Added Successfully");
      let ref = document.getElementById("cancel")
      ref?.click(); 
      this.profileForm.reset();
      this.router.navigate(['/profile']).then( (e) => {
        if (e) {
          console.log("Navigation is successful!");
        } else {
          console.log("Navigation has failed!");
        }
      });
    },
    err=>{
      alert("Something Went Wrong")
    })
    }
  }

  selectFile(event:any){
    if(event.target.files){
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0])
      reader.onload = (ev:any)=>{
        this.urlLink = ev.srcElement.result;
        console.log("result",event,ev);
        
      }
    }
  }
  
  get firstName() { return this.profileForm.get('firstName'); }
  get lastName() { return this.profileForm.get('lastName'); }
  get email() { return this.profileForm.get('email'); }
  get mobile() { return this.profileForm.get('mobile'); }
  get address() { return this.profileForm.get('address'); }

  getImg(image:any) {
    return this._sanitizer.bypassSecurityTrustUrl(image);
}
// updateData(){
//   this.registrationModelObj.firstname = this.profileForm.value.firstName;
//   this.registrationModelObj.lastName = this.profileForm.value.lastName;
//   this.registrationModelObj.email = this.profileForm.value.email;
//   this.registrationModelObj.mobile = this.profileForm.value.mobile;
//   this.registrationModelObj.address = this.profileForm.value.address;
//   // this.registrationModelObj.tag = this.formValue.value.tag;
//   this.registrationModelObj.img = this.urlLink;
//   this.api.updateRegisterData(this.registrationModelObj,this.registrationModelObj.id)
//   .subscribe(res=>{
//     alert("Updated Successfully");
//     let ref = document.getElementById("cancel")
//     ref?.click(); 
//     this.profileForm.reset();
//   })
// }
}


