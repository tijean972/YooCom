import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyEventPage } from './my-event';

@NgModule({
  declarations: [
    MyEventPage,
  ],
  imports: [
    IonicPageModule.forChild(MyEventPage),
  ],
})
export class MyEventPageModule {}
