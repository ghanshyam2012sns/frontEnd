import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders }    from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ServiceService {

constructor(private http: HttpClient) { }
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }  
  getData(){
     
    return this.http.get('/api/Country');  //https://localhost:44352/ webapi host url
  }

  postData(formData){
    return this.http.post('/api/Country',formData);
  }

  putData(id,formData){
    return this.http.put('/api/Country/'+id,formData);
  }
  deleteData(id){
    return this.http.delete('/api/Country/'+id);
  }

  getDataState(){
     
    return this.http.get('/api/StateMaster');  //https://localhost:44352/ webapi host url
  }

  postDataState(formData){
    return this.http.post('/api/StateMaster',formData);
  }

  putDataState(id,formData){
    return this.http.put('/api/StateMaster/'+id,formData);
  }
  deleteDataState(id){
    return this.http.delete('/api/StateMaster/'+id);
  }

}
