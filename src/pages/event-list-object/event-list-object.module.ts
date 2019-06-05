import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EventListObjectPage } from './event-list-object';

@NgModule({
  declarations: [
    EventListObjectPage,
  ],
  imports: [
    IonicPageModule.forChild(EventListObjectPage),
  ],
})
export class EventListObjectPageModule {}
