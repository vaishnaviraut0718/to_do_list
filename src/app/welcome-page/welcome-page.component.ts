import { Component } from '@angular/core';
import { Todo } from 'Todo';
import { ToastrService } from 'ngx-toastr';
import { TodoServiceService } from '../todo-service.service';
import { Router } from '@angular/router';
import { AuthServiceService } from '../auth-service.service';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.css']
})
export class WelcomePageComponent {
  taskObj: Todo =new Todo();
  taskArr: Todo[]=[];
  
  addTaskValue:string='';
  editTaskValue:string='';
  
  user: any;
  constructor(private todoService:TodoServiceService,private toastr: ToastrService,private route:Router,private authService:AuthServiceService) {}
  
 
  ngOnInit():void{
    this.addTaskValue='';
    this.editTaskValue='';
    this.taskObj=new Todo();
    this.taskArr=[];
    this.getAllTask();

    const currentUserName = localStorage.getItem('currentUser');
    if (currentUserName) {
      this.user = currentUserName;
    } else {
      // If no user data found in local storage, redirect to login
      this.route.navigate(['/login']);
    }

   
    
  }
    getAllTask() {
      this.todoService.getAllTask().subscribe(res=>{
        this.taskArr=res;
      },err=>{
        alert("unable to get list ")
      })
    }
  
  addTask(){
    this.taskObj.task_name=this.addTaskValue
    this.todoService.addTask(this.taskObj).subscribe(res=>{
      this.ngOnInit();
      this.addTaskValue='';
      this.toastr.success('Todo Added Successfully', 'Success!!');
  
    },err=>{
      alert("Something went wrong");
    })
  }
  
  editTask(){
    this.taskObj.task_name=this.editTaskValue
    this.todoService.editTask(this.taskObj).subscribe(res=>{
    // alert("updated")
      this.ngOnInit();
      this.toastr.success('Todo Updated Successfully', 'Success!!');
  
    },err=>{
      //console.log(err)
      alert("Failed to update");
    })
  }
  
  deleteTask(task:Todo){
    this.todoService.deleteTask(task).subscribe(res=>{
      this.ngOnInit();
      this.toastr.success('Todo Deleted Successfully', 'Success!!');
  
    },err=>{
      alert("failed to delete");
    })
  }
  
  call(task:Todo){
    this.taskObj=task;
    this.editTaskValue = task.task_name;
    }
  
    Logout(){
      localStorage.removeItem('currentUser');
      this.route.navigate(['/login']);
    }

    // Logout() {
    //   this.authService.logout();
    //   this.route.navigate(['/login']);
    // }
  }

   
  
  
  

