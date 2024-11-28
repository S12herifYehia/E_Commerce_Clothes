import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-show-details',
  templateUrl: './show-details.component.html',
  styleUrl: './show-details.component.scss'
})
export class ShowDetailsComponent {


  @Output() showDetails=new EventEmitter();
  @Input() DetailsData:any;
  closeCreate(){
    this.showDetails.emit(false)
  }







}
