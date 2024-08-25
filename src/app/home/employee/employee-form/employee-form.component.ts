import { Component, inject, OnInit } from '@angular/core';
import { Employee } from '../ds/employee';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink, RouterModule } from '@angular/router';
import { EmployeeService } from '../service/employee.service';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [FormsModule ,CommonModule ,RouterLink ,RouterModule],
  templateUrl: './employee-form.component.html',
  styleUrl: './employee-form.component.css'
})
export class EmployeeFormComponent implements OnInit {
  employeeService : EmployeeService = inject(EmployeeService);
  router:Router = inject(Router);
  route :ActivatedRoute = inject(ActivatedRoute);
  employee : Employee ={
  id:0 ,
  firstName : "",
  lastName : "",
  email : "",
  phone: "EMPTY",
  hiredDate : new Date(),
  salary : 0
}
 id=0
ngOnInit(): void {
 
   this.route.params.subscribe(param  =>{
    this.id = param['id']
   }); 
   if(this.id){
    this.employeeService.getEmployeeById(this.id).subscribe({
      next : data => this.employee = data,
      error :err => console.log(err),
      complete : () => console.log("success")
      
    })
   }
 }

createEmployee (employee : Employee)  {
if(!this.id){
  this.employeeService.createEmployee(employee).subscribe({
    next : data => console.log(data),
    error : err => console.log(err),
    complete :() => {
      this.router.navigate(['/employees'])
    },
  })
}else{
  this.employeeService.updateEmployee(employee , this.id).subscribe({
    next : data => console.log(data),
    error : err => console.log(err),
    complete : () =>{
      this.router.navigate(['/employees'])
    }
    
  })
}
}

}
