import { Injectable } from '@angular/core';
import { Employee } from '../ds/employee';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  EMPLOYEE_API_BACKEND_URL  = "http://localhost:4500/emp";

  constructor(private http:HttpClient) {
   }

   getAllEmployee() :Observable<Employee[]>{
    return this.http.get<Employee[]>(this.EMPLOYEE_API_BACKEND_URL+"/all");
   }

   createEmployee(emp:Partial<Employee>):Observable<Employee>{
    const header = new HttpHeaders();
    header.set("Content-Type" ,"application/json");
    return this.http.post<Employee>(this.EMPLOYEE_API_BACKEND_URL+"/save" ,emp,{headers :header});
   }

   getEmployeeById (id :number) : Observable<Employee>{
    return this.http.get<Employee>(this.EMPLOYEE_API_BACKEND_URL+'/up'+'/'+id);
   }

   deleteById(id : number) : Observable <any>{
    return this.http.delete(this.EMPLOYEE_API_BACKEND_URL+'/delete' + '/' +id);
   }

   updateEmployee (employee:Partial<Employee> , id : number) : Observable<Employee> {
    const header = new HttpHeaders();
    header.set("Content-Type" , "application/json");
    return this.http.put<Employee>(this.EMPLOYEE_API_BACKEND_URL+'/update'+'/'+id,employee , {headers : header})
   }
  }
