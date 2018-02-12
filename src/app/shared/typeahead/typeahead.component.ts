import { Component, OnInit,ElementRef,Input,Output,EventEmitter,forwardRef,Optional,Host,SkipSelf } from '@angular/core';
import { 
  ControlValueAccessor, 
  NG_VALUE_ACCESSOR,ControlContainer ,AbstractControl
} from '@angular/forms';
import * as _ from "lodash";

@Component({
  selector: 'typeahead',
  templateUrl: './typeahead.component.html',
  styleUrls: ['./typeahead.component.css'],
  host: {
    '(document:click)': 'onClick($event)',
  },
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TypeaheadComponent),
      multi: true,
    }]
})

export class TypeaheadComponent implements ControlValueAccessor {
  @Input() items;
  @Input() config;
  @Output() selectedItem:EventEmitter<number> = new EventEmitter<number>();
  @Output() typedText:EventEmitter<number> = new EventEmitter<number>();
  @Input() formControlName: string;
  @Input() typeaheadDisabled:boolean;
  
  private control: AbstractControl;

  filteredItems:Array<any>=[];
  searchTxt:String;
  constructor(private _eref: ElementRef,@Optional() @Host() @SkipSelf()
  private controlContainer: ControlContainer) { }

  ngOnInit() {
    this.control= this.controlContainer.control.get(this.formControlName);
    this.control.valueChanges.subscribe((value)=>{
       this.searchTxt = value;
    });
  }

    private propagateChange = (_: any) => { };
    private propagateTouched = (_: any) => { };
    
    public writeValue(obj: any) {

    }

    public registerOnChange(fn: any) {
        this.propagateChange = fn;
    }

    public registerOnTouched(fn: any) {
      this.propagateTouched= fn;
     }
 

  keyUp(value){
    if(value){
      this.filteredItems = _.filter(this.items,(o)=>
      {
        return o[this.config.shownProperty].indexOf(value)!==-1;
      });
    }else{
      this.filteredItems= [];
    }
    this.propagateChange(value);
    
  }

  itemClick(item){
    this.filteredItems = [];
    this.searchTxt = item[this.config.shownProperty];
    this.selectedItem.emit(item);
    this.propagateChange(item[this.config.selectedProperty]);
  }

  onClick(event) {
    if (!this._eref.nativeElement.contains(event.target)){
      this.filteredItems = [];
    } 
   }

   onBlur(event){
    this.propagateTouched(true);
   }


}
