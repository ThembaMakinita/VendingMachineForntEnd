import { Component } from '@angular/core';
//import { ConfigService } from './config/config.service'
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'vendingMachine';
  products:any;
  img1:any;
  img2:any;
  img3:any;
  img4:any;
  img5:any;
  img6:any;
  img7:any;
  img_amt=0.00;
  pname:any;
  pid:any;
  productlabel:any;
  checkoutForm:FormGroup;
  
  public REST_API_SERVER = "https://vendingappthemba.herokuapp.com/vend/getAllProducts";
   
   
  constructor(/* public configService:ConfigService, */private httpClient: HttpClient){
    //this.configService.getConfig();
    this.createForm();
    this.sendGetRequest();
    this.img1=10;
    this.img2=1;
    this.img3=20;
    this.img4=2;
    this.img5=.50;
    this.img6=50;
    this.img7=5;
    
  }
  
  ngOnInit(){
    
  }
  getCall(){
    //this.configService.getConfig();
  }
  sendGetRequest(): Observable <any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json','Access-Control-Allow-Origin':'*', "accept": "*/*" });
    let options = new HttpResponse({ headers: headers });
      this.httpClient.get(this.REST_API_SERVER, options).subscribe(result => {
        console.log(result);
        this.products = result;
        //alert(this.products);
      });
      return this.products;
    }
    numberOf10Rands=0;
    numberOf1Rands=0;
    numberOf20Rands= 0;
    numberOf2Rands= 0;
    numberOf50Cents= 0;
    numberOf50Rands= 0;
    numberOf5Rands= 0;
    cashBundleArray={};
	btnClass=0;
    conversion(pType){
		this.btnClass=0;
       // this.img_amt=this.img_amt + (img/100);
       if(this.pname==undefined || this.pname=='undefined' || this.pname=='' || this.pname==null){

       }else{
         
        switch(pType) { 
          case 10: { 
            this.numberOf10Rands = this.numberOf10Rands + 1;
             break; 
          } 
          case 1: { 
             this.numberOf1Rands = this.numberOf1Rands + 1;
             break; 
          }
          case 20: { 
             this.numberOf20Rands = this.numberOf20Rands + 1;
             break; 
         }
         case 2: { 
          this.numberOf2Rands = this.numberOf2Rands + 1;
          break; 
      } 
         case 0.50: { 
          this.numberOf50Cents = this.numberOf50Cents + 1;
          break; 
         } 
         case 50: { 
          this.numberOf50Rands = this.numberOf50Rands + 1;
          break; 
         }
         case 5: { 
          this.numberOf5Rands = this.numberOf5Rands + 1;
          break; 
         } 
          default: { 
             //statements; 
             break; 
          } 
       }

          this.img_amt=this.img_amt + (pType);
		  this.btnClass = 1;
       }
        //alert(this.img_amt);
    }
    
    productNameAssign(pname,pid){
      this.pname=pname;
	  this.productlabel=pname;
      this.pid=pid;
      this.img_amt=0.00;
  }
  createForm(){
    this.checkoutForm = new FormGroup({
      'selection': new FormControl(null),
      'coinage': new FormControl(null)
   });
  }
  dataArray={};
  final_results:any;
  tnumberOf50Cents=0;
  tnumberOf1Rands = 0;
  tnumberOf2Rands = 0;
  tnumberOf5Rands = 0;
  tnumberOf10Rands = 0;
  tnumberOf20Rands = 0;
  tnumberOf50Rands = 0;
  tchangeAmount='';
  msgreturn:any;
  vendingCalc(){
    //alert(JSON.stringify(this.checkoutForm.value));
    this.cashBundleArray = {
      "numberOf10Rands": this.numberOf10Rands,
      "numberOf1Rands": this.numberOf1Rands,
      "numberOf20Rands": this.numberOf20Rands,
      "numberOf2Rands": this.numberOf2Rands,
      "numberOf50Cents": this.numberOf50Cents,
      "numberOf50Rands": this.numberOf50Rands,
      "numberOf5Rands": this.numberOf5Rands
    }
    this.dataArray = {'productId':this.pid,'cashBundle':this.cashBundleArray};
    let headers = new HttpHeaders({ 'Content-Type': 'application/json','Access-Control-Allow-Origin':'*', "accept": "*/*" });
    let options = new HttpResponse({ headers: headers, body:this.cashBundleArray});
    
      this.httpClient.post("https://vendingappthemba.herokuapp.com/vend/placeOrder/"+this.pid, this.cashBundleArray).subscribe(result => {        
		console.log(result);		
        this.final_results = result;
        this.tnumberOf50Cents = this.final_results.numberOf50Cents;
        this.tnumberOf1Rands = this.final_results.numberOf1Rands;
        this.tnumberOf2Rands = this.final_results.numberOf2Rands;
        this.tnumberOf5Rands = this.final_results.numberOf5Rands;
        this.tnumberOf10Rands = this.final_results.numberOf10Rands;
        this.tnumberOf20Rands = this.final_results.numberOf20Rands;
        this.tnumberOf50Rands = this.final_results.numberOf50Rands;
		this.tchangeAmount = this.final_results.totalChangeOutput;
        this.msgreturn = this.final_results.respMSG;
        console.log(this.final_results.respMSG);
		this.img_amt=0;
		this.btnClass = 0;
		this.pname='';
		  this.numberOf10Rands=0;
		  this.numberOf1Rands = 0;
		  this.numberOf20Rands = 0;
		  this.numberOf2Rands = 0;
		  this.numberOf50Cents = 0;
		  this.numberOf50Rands = 0;
		  this.numberOf5Rands = 0;
        //alert(this.products);
      },
        (error) => {
			this.msgreturn = error.error;
			this.img_amt=0;
			this.btnClass = 0;
			this.pname = '';
			  this.numberOf10Rands=0;
			  this.numberOf1Rands = 0;
			  this.numberOf20Rands = 0;
			  this.numberOf2Rands = 0;
			  this.numberOf50Cents = 0;
			  this.numberOf50Rands = 0;
			  this.numberOf5Rands = 0;
			  
				this.tnumberOf50Cents = 0;
				this.tnumberOf1Rands = 0;
				this.tnumberOf2Rands = 0;
				this.tnumberOf5Rands = 0;
				this.tnumberOf10Rands = 0;
				this.tnumberOf20Rands = 0;
				this.tnumberOf50Rands = 0;
				this.tchangeAmount = '';
		
            //console.log(error.error);
        }
		);
  }
  counter(i: number) {
    return new Array(i);
}
}
