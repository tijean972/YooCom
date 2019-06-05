import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EventListInvitesPage } from './event-list-invites';

@NgModule({
  declarations: [
    EventListInvitesPage,
  ],
  imports: [
    IonicPageModule.forChild(EventListInvitesPage),
  ],
})
export class EventListInvitesPageModule {}
