import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
// import { EventEmitter } from 'stream';

@Component({
  selector: 'app-delete-confirm',
  templateUrl: './delete-confirm.component.html',
  styleUrls: ['./delete-confirm.component.css']
})
export class DeleteConfirmComponent implements OnInit {

  @Input() item:string|undefined
  @Output() onCancel=new EventEmitter()

  constructor() { }

  ngOnInit(): void {
  }
  cancel(){
    this.onCancel.emit()
  }

}
