import { Component } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-tour-loader',
  templateUrl: './tour-loader.component.html',
  styleUrl: './tour-loader.component.css',
})
export class TourLoaderComponent {

  // Ссылка на форму
  form = new FormGroup({
    name: new FormControl(),
    last_name: new FormControl(),
    city: new FormControl(),
    birthday: new FormControl(),
    age: new FormControl(),
    card: new FormControl()
  })

  OnSave(){
    
  }
}
