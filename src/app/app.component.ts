import { Component } from '@angular/core';
import {ServiceService} from './service.service';
import { FormGroup, FormControl,Validators } from '@angular/forms'; 
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'EmployeeFrontEnd';
   
  constructor(private ServiceService: ServiceService) { }
  data: any;
  CountryForm: FormGroup;
  submitted = false; 
  EventValue: any = "Save";

  ngOnInit(): void {
    this.getdata();

    this.CountryForm = new FormGroup({
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
  
     if (this.CountryForm.invalid) {
            return;
     }
    this.ServiceService.postData(this.CountryForm.value).subscribe((data: any[]) => {
      this.data = data;
      this.resetFrom();

    })
  }
  Update() { 
    this.submitted = true;
  
    if (this.CountryForm.invalid) {
     return;
    }      
    this.ServiceService.putData(this.CountryForm.value.Id,this.CountryForm.value).subscribe((data: any[]) => {
      this.data = data;
      this.resetFrom();
    })
  }

  EditData(Data) {
    this.CountryForm.controls["empId"].setValue(Data.Id);
    this.CountryForm.controls["empName"].setValue(Data.Name);    
    this.EventValue = "Update";
  }

  resetFrom()
  {   
    this.getdata();
    this.CountryForm.reset();
    this.EventValue = "Save";
    this.submitted = false; 
  }
}
