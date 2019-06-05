/**
 * Generated class for the ChatroomPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

import { Component, ViewChild, AfterViewInit, Input } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

// pages
import { AnnonceDetailPage } from '../annonce-detail/annonce-detail';

// Base de données
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

// Import model
//import { Message } from '../../model/Message';
//import { controlNameBinding } from '@angular/forms/src/directives/reactive_directives/form_control_name';


@IonicPage()
@Component({
  selector: 'page-chatroom',
  templateUrl: 'chatroom.html',
})
export class ChatroomPage  { 
  @Input() invites: AnnonceDetailPage;

  // Formulaire
  MessageForm: FormGroup;
  loginError: string;

  Annonc:any;
  User:any;
  newmessage:any;
  listMessage: any;
  listChat:any[] = [];

  public loader = this.loadingCtrl.create({
    spinner:"bubbles",
    content: "Please wait..." //,
    //duration: 3000
  });

  constructor(public navCtrl: NavController, public loadingCtrl: LoadingController, public navParams: NavParams, public af: AngularFireDatabase, fb: FormBuilder) {
    this.Annonc = this.navParams.data;
    //this.User = this.navParams.get('user');
    //console.log('Chatroom Page child',this.Annonc);

    this.MessageForm = fb.group({
			Message: ['', Validators.compose([Validators.required, Validators.maxLength(500)])]
    });

    //console.log("/Annonce/"+ this.Annonc.annonce.idAnnonce + "/Chat/");
    

    // Création 
    this.listMessage = this.af.list("/Annonce/"+ this.Annonc.annonce.idAnnonce + "/Chat/");
  }

  
  ngOnInit(){
    this.showLoader();

    // Récupération des annonces depuis la base de données.
    this.listMessage.snapshotChanges(['child_added'])
    .subscribe(actions => {
      actions.forEach(action => {
        
        let chat = {
            idMessage: action.key,
            idEmmetteur: action.payload.val().idEmmetteur,
            Message: action.payload.val().Message,
            Like: action.payload.val().nbLike
        }

        //console.log(chat);
        this.listChat.push(chat);
      });
      this.hideLoader();
    });
  }

  //Loader 
  showLoader() {
    this.loader.present();
  }

  hideLoader(){
    this.loader.dismiss();
  }

  ngAfterViewInit() {
    //console.log(this.child.whoAmI()); // 👶 I am a child!
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad ChatroomPage');
  }

  clearFormValue(){
    //this.MessageForm.reset();
    this.listChat = [];
    this.newmessage = null;
  }

  sendNewMessage(){
    if(this.newmessage != null){
      this.af.list("/Annonce/"+this.Annonc.annonce.idAnnonce+"/Chat/").push({
        idEmmetteur: this.navParams.data.user.uid,
        Message: this.newmessage
        //Message: this.MessageForm.value.Message
      });
    }
    
    this.clearFormValue();
    
  }

}
