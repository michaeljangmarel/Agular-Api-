import { Component, inject } from '@angular/core';
import { EmployeeService } from '../service/employee.service';
 import { Observable } from 'rxjs';
 import { CommonModule } from '@angular/common';
import { Employee } from '../ds/employee';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule ,RouterLink],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css'
})
export class EmployeeListComponent {
 employeeService: EmployeeService = inject(EmployeeService);
 employee$ : Observable<Employee[]> = this.employeeService.getAllEmployee();
 router : Router = inject(Router);

 updateEmployee(id :number) {
this.router.navigate([`/emp-form` , id])
 }

 deleteByIdEmp(id : number){
  this.employeeService.deleteById(id).subscribe({
    next : data => console.log(data) ,
    error : err => console.log(err),
    complete : () => {
       this.employee$ = this.employeeService.getAllEmployee();
    }
  })
 }
 
}
