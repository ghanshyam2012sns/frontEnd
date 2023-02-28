import { Component } from '@angular/core';
import {ServiceService} from './service.service';
import { FormGroup, FormControl,Validators } from '@angular/forms'; 
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'FrontEnd';
   
  constructor(private ServiceService: ServiceService) { }
  data: any;
  StateForm: FormGroup;
  submitted = false; 
  EventValue: any = "Save";

  ngOnInit(): void {
    this.getdata();

    this.StateForm = new FormGroup({
      Id: new FormControl(null),
      Name: new FormControl("",[Validators.required]),      
    })  
  }
  getdata() {
    this.ServiceService.getData().subscribe((data: any[]) => {
      this.data = data;
    })
  }
  deleteData(id) {
    this.ServiceService.deleteData(id).subscribe((data: any[]) => {
      this.data = data;
      this.getdata();
    })
  }
  Save() { 
    this.submitted = true;
  
     if (this.StateForm.invalid) {
            return;
     }
    this.ServiceService.postData(this.StateForm.value).subscribe((data: any[]) => {
      this.data = data;
      this.resetFrom();

    })
  }
  Update() { 
    this.submitted = true;
  
    if (this.StateForm.invalid) {
     return;
    }      
    this.ServiceService.putData(this.StateForm.value.Id,this.StateForm.value).subscribe((data: any[]) => {
      this.data = data;
      this.resetFrom();
    })
  }

  EditData(Data) {
    this.StateForm.controls["empId"].setValue(Data.Id);
    this.StateForm.controls["empName"].setValue(Data.Name);    
    this.EventValue = "Update";
  }

  resetFrom()
  {   
    this.getdata();
    this.StateForm.reset();
    this.EventValue = "Save";
    this.submitted = false; 
  }
}
