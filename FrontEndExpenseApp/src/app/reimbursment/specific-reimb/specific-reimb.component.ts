import { Component, OnInit } from '@angular/core';
import {Router } from '@angular/router';
import { ReimbursService } from '../reimburs.service';
import { Reimbursement } from '../reimbursement.model';
import {FormBuilder, FormGroup} from '@angular/forms';
import { AuthCredService } from '../../user-credentials/auth-cred.service';
<<<<<<< HEAD
=======
import {HttpClient, HttpResponse,  HttpEventType} from '@angular/common/http';
import { Observable} from 'rxjs';

>>>>>>> tulika-frontend

@Component({
  selector: 'app-specific-reimb',
  templateUrl: './specific-reimb.component.html',
  styleUrls: ['./specific-reimb.component.css']
})
export class SpecificReimbComponent implements OnInit {

  allReimbursements : ReimbImage[] = [];
  reimbusementObj : Reimbursement = new Reimbursement();

  //for modal form
  formValue !: FormGroup;
  errorReimbMsg : string = '';

  newReimbursement : Reimbursement= {
    reimbId      : 0,
    reimbDate    : " ",
    reimbReason  : " ",
    reimbAmount  : 0,
    reimbStatus  : "Pending",
    reimbRemoved : false,
    userId       : this.authCredService.retrieveUserId(),
    rbReceipt    : ""
   }
<<<<<<< HEAD
=======

   //Variables for file uploads
   selectedFiles !: FileList;
    currentFile !: File;
    progress = 0;
    message = '';
    fileInfos !: Observable<any>;
>>>>>>> tulika-frontend
  
   constructor(private reimbusementService : ReimbursService, 
    private router: Router, 
    private authCredService: AuthCredService,
    private formbuilder: FormBuilder,
    private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
<<<<<<< HEAD
=======
     //for file upload
     this.fileInfos = this.reimbursService.getFiles();
>>>>>>> tulika-frontend
    
     //for the modal input type form value
     this.formValue = this.formbuilder.group({
      reimb_reason  :  [''],
      reimb_amount  :  [''],
<<<<<<< HEAD
      reimb_receipt :  ['']
=======

     
      
>>>>>>> tulika-frontend
    })
    
    // for the file upload progress
    //this.fileInfos = this.uploadService.getFiles(); 

    //For getting the userId & send it to the reimb_info table user_id column
    this.loadThisUSerReimbersements(this.authCredService.retrieveUserId());

  }


  //access a function  retrieve Reimmb
  loadThisUSerReimbersements(userId : number){
    //connect to the function in service layer
   
    this.reimbusementService.getASpecificUserReimbursementService(this.authCredService.retrieveUserId())
   .subscribe((response: any)=> {
    this.allReimbursements = response;
     // iterating through the response which is an array
     // in each iteration we take the rid and fecth the image for that rid
     response.forEach((reim: ReimbImage) => {
      this.uploadService.getFile(reim.reimbId).subscribe((resp: any) => {
        console.log(resp);
        let objectURL = URL.createObjectURL(resp);       
          reim.fileUrl = this.sanitizer.bypassSecurityTrustUrl(objectURL);
          //reim.fileUrl = resp.url;
      })
     })
     
   }, (error: any)=>{
    this. errorReimbMsg = 'There was some internal error! Please try again later!';
  
   })
   
  }
  

    //Method to set the new values on to the modal table rows
  onEditRow(row : any){
   this.newReimbursement.reimbId = row.reimbId;
   //SLQ set up to only allow status to be updated by mng
   this.formValue.controls["reimb_status"].setValue(row.reimbstatus);
      //add more when needed
  }

  // to Add a reimbursement
  addReimbursement(){
    //add more fields later if needed
    this.newReimbursement.reimbReason = this.formValue.value.reimb_reason;
    this.newReimbursement.reimbAmount = this.formValue.value.reimb_amount;
   // this.newReimbursement.reimbAmount = this.formValue.value.reimb_receipt;
     // Let's post the data through the post request in service
    this.reimbusementService.addReimbursementService(this.newReimbursement).subscribe(
      (response: any) => {
        // To reload the page with new user Reimbursement just added
        this.loadThisUSerReimbersements(this.reimbusementObj.userId);
      },
      (error: any) => {
        console.log(error);
      })

    //Close the Form Automatically
    let ref = document.getElementById("cancel");
    ref?.click();
    this.formValue.reset();
  }
  /*
  // Don't delete - We might need to use it
  updateReimbursementDetails(){
    this.reimbusementObj.reimbStatus = this.formValue.value.reimb_status;
    //add more later if needed
    //call our update api method , pass it the object &  reimb id
    this.reimbusementService.updateReimbursementService(this.newReimbursement)
    .subscribe((res: any) => {
      alert("updated Successfully");
      //close the form automatically when done updating
    let ref = document.getElementById("cancel");
    ref?.click();
    this.formValue.reset();
  })
  }
  */
}//class
