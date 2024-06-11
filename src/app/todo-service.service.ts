import { Injectable } from '@angular/core';
import{HttpClient} from '@angular/common/http';
import { Todo } from 'Todo';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoServiceService {

constructor(private httpClient:HttpClient) { }

  addTask(task :Todo) : Observable<Todo>{
    return this.httpClient.post<Todo>('http://localhost:3000/todo',task);
  }

  getAllTask() : Observable<Todo[]>{
    return this.httpClient.get<Todo[]>('http://localhost:3000/todo');
  }

  deleteTask(task :Todo) : Observable<Todo>{
    return this.httpClient.delete<Todo>(`http://localhost:3000/todo/${task.id}`);
  }

  editTask(task :Todo) : Observable<Todo>{
    return this.httpClient.put<Todo>(`http://localhost:3000/todo/${task.id}`,task);
  }


}










  

  // edit(id:number){
  //   return this.httpClient.get<Todo>(`http://localhost:3000/fruits/${id}`);
 
  // }

  // update(data:Todo){
  //   return this.httpClient.put<Todo>(`http://localhost:3000/fruits/${data.i}`,data);
  // }


  // delete(id:number){
  //   return this.httpClient.delete<Todo>(`http://localhost:3000/todo/${id}`);
 
  // }

