import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  
  pswd=""
  amount=""

  acno1=""
  pswd1=""
  amount1=""


  //formgroup
  depositForm= this.fb.group({
    acno:['',[Validators.required,Validators.pattern('[0-9]*')]],
    pswd:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]],
    amount:['',[Validators.required,Validators.pattern('[0-9]*')]]
  })


  withdrawalForm= this.fb.group({
    acno1:['',[Validators.required,Validators.pattern('[0-9]*')]],
    pswd1:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]],
    amount1:['',[Validators.required,Validators.pattern('[0-9]*')]]
  })
user: any
lDate:any
acno=""

  constructor(private ds:DataService, private fb:FormBuilder, private router:Router) {
    this.user=this.ds.currentUser
    this.lDate= new Date()
   }

  ngOnInit(): void {
    if(!localStorage.getItem("currentUser")){
      alert("please login")
      this.router.navigateByUrl("")
    }
  }
  Deposit(){
    var acno = this.depositForm.value.acno
    var pswd = this.depositForm.value.pswd
    var amount= this.depositForm.value.amount

    const result= this.ds.deposit(acno,pswd,amount)
    if(result){
      alert(amount+" deposited successfully and new balance is: "+result)
    }
  }
  Withdraw(){
    var acno1 = this.withdrawalForm.value.acno1
    var pswd1 = this.withdrawalForm.value.pswd1
    var amount1= this.withdrawalForm.value.amount1

    if(this.withdrawalForm.valid){
      const result= this.ds.withdraw(acno1,pswd1,amount1)
      if(result){
        alert(amount1+"debited successfully and new balance is:  "+result)
      }

    }

    else{
      alert("invalid form")
    }
  }
  logout(){
    localStorage.removeItem("currentUser")
    localStorage.removeItem("currentAcno")
    this.router.navigateByUrl("")
    
  }
  deleteAccount(){

    this.acno= JSON.parse(localStorage.getItem("currentAcno")||'')
  }
  cancel(){
    this.acno=""
  }

}
