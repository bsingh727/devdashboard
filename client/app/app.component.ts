import { Component } from '@angular/core';
import { myservicedata } from './myservice';
@Component({
  selector: 'my-app',
  template: `<h1>Hello philips {{name}}</h1>`,
  providers: [myservicedata]
})
export class AppComponent  { name = myservicedata.empname; }
