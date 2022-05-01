import { Component } from '@angular/core';
import { NumCheck } from './NumCheck';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  title = 'angular-question1';

  data: NumCheck = {
    input: null,
    type: '1',
    isValid: false

  };

  options = [{value:'1', text:'isPrime'}, {value:'2', text:'isFibonacci'}];

  onSearchChange(e: Event): void {  
    if(e.target){
      let input : number = 0;

      try{
        input = parseFloat((e.target as HTMLInputElement)?.value)
      }
      catch(e){
        // Cannot parse or NaN
        input = 0
        this.data.isValid = false
      }

      //Negative Check
      if(input < 0){
        this.data.input = 1
      }
      else{
        //Decimal rounding
        let decimalPart = input - Math.floor(input)
        if(decimalPart <= 0.4){
          this.data.input = Math.floor(input)
        }
        else{
          this.data.input = Math.ceil(input)
        }
      }

      if(!Number.isNaN(this.data.input)){
        this.startCalculation();
      }
    }
  }

  onOptionsSelected(e: Event): void {
    if(e.target){
      this.data.type = (e.target as HTMLInputElement)?.value || '1';
      if(!Number.isNaN(this.data.input)){
        this.startCalculation();
      }
    }
  }

  startCalculation(){
    if(this.data.input !== null){
      if(this.data.type == '1'){
        this.data.isValid = this.primeCalculate(this.data.input);
      }
      else if (this.data.type == '2'){
        this.data.isValid = this.isFibonacci(this.data.input);
      }
    }
    else{
      this.data.isValid = false;
    }
  }

  primeCalculate(number: number): boolean{
    if (number <= 1) {
      return false;
    }
    
    // check if number is greater than 1
    else{  
        // looping through 2 to number-1
        for (let i = 2; i < number; i++) {
            if (number % i == 0) {
                return false;
            }
        }
    
        return true;
        
    }
  }

  isFibonacci(num : number, a = 0, b = 1): any {
    if(num === 0 || num === 1) {
      return true;
    }
  
    let nextNumber = a+b;
  
    if(nextNumber === num) {
      return true;
    }
    else if(nextNumber > num) {
      return false;
    }
  
   return this.isFibonacci(num, b, nextNumber);
  }

}
