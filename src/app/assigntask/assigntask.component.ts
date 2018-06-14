import { Component, OnInit } from '@angular/core';
import {Http, Response} from '@angular/http';

@Component({
  selector: 'app-assigntask',
  templateUrl: './assigntask.component.html',
  styleUrls: ['./assigntask.component.css']
})
export class AssigntaskComponent implements OnInit {

  constructor(private http : Http) { }

  ngOnInit() {
    this.taskget();

    this.getdatafromphp();
  }

  private taskdata : any = {};
  private poststatus : string;
  private deletestatus :string;

  private taskdatadetails : any[] = [];


  private task_id : string;

  private btn_status : boolean = true;

  private updatestatus : string;

  private phprecord : any[] = [];


  private productphpdata : any = [];
  
  tasksave(){

    this.poststatus = "Record is Submitting...";
    var posturl = "https://myappangular-ee9f9.firebaseio.com/newtaskrecord.json";

    this.http.post(posturl,this.taskdata).subscribe(
      (res:Response)=>{


        console.log("Record Successfully Saved");
        this.taskdata = [];
        this.taskget();
      },
      (error)=>{
        console.log("The Error Exists",error);
      },
      ()=>{
        this.poststatus = "Task is Saved Succesfully";
        console.log("Task Data Saved Successfully");
      }
    )
    
    
  }


  taskget(){
    var geturl = "https://myappangular-ee9f9.firebaseio.com/newtaskrecord.json";

    var phpUrl = "http://localhost:81/API/codeapi/product/read.php";

    this.http.get(geturl).subscribe(

      (res:Response)=>{
          console.log(geturl);
          var resJson = res.json();
          var keys = Object.keys(resJson);

          this.taskdatadetails = keys.map(function(x){
            return {
              id:x,
              record : resJson[x]
            }
          })
      }
    )


  }


  deletetask(id){

    this.deletestatus = "Task Deleting...";
    var deleteurl = "https://myappangular-ee9f9.firebaseio.com/newtaskrecord/"+id+".json";

    this.http.delete(deleteurl).subscribe(

      (res:Response)=>{
        this.deletestatus = "Task Deleted Successfully";
        console.log("Record Deleted Successfully");
        this.taskget();
      },
      (error)=>{
        console.log("The Error Exists "+error);
      }


    )

  }


  update(tt){

    this.task_id = tt.id;
    this.taskdata = tt.record;

    this.btn_status = false;

    console.log(this.taskdata);
    
    console.log(this.task_id);
  
  }


  taskupdate(){

    this.updatestatus = this.task_id+" Record Updating... ";
    var updateurl = "https://myappangular-ee9f9.firebaseio.com/newtaskrecord/"+this.task_id+".json";
    console.log(updateurl);

    this.http.put(updateurl,this.taskdata).subscribe(
        (res:Response)=>{
          console.log("Record Updated Successfully");
          this.taskget();
        },
        (error)=>{
          console.log("Error Exists "+error);
        },
        ()=>{
          console.log("Record Updated Successfully");
          this.updatestatus = this.task_id+" Record Updated ";
        }


    )


  }



  getdatafromphp(){

    var geturl = "http://localhost:81/API/codeapi/product/read.php";

    this.http.get(geturl).subscribe(

      (res:Response)=>{
        console.log("Display the Data...");
        console.log(geturl);

        var resJson = res.json();

        this.phprecord = resJson.records;
        
        console.log(resJson.records);

         
      },
      (error)=>{
        console.log("Error occured "+error);
      }
    )

  }


  savedatatophp(){
    console.log(true);

    var posturl = "http://192.168.1.172:81/API/codeapi/product/create.php";

    this.http.post(posturl,this.productphpdata).subscribe(

      (res:Response)=>{
        console.log("Record Added Successfully");
      },
      (error)=>{
        console.log("The Error Occured "+error);
      },
      ()=>{
        console.log("Record Added Successfully");
      }


    )

  }



}
