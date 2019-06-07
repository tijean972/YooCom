/**
 * Generated class for the MesAnnoncesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Platform } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';

// Import model
import { Event } from '../../model/annonceModel';
import { userProfil } from '../../model/userProfilModel';

// import pages
import { AddAnnoncesPage } from '../add-annonces/add-annonces';
import { AnnonceDetailPage } from '../annonce-detail/annonce-detail';
import { SignupPage } from '../signup/signup';
import { LoginPage } from '../login/login';

// Base de données
import { AngularFireDatabase, AngularFireList, snapshotChanges } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { firebaseService } from '../../services/auth.service';
import { Subject, asapScheduler, pipe, of, from, interval, merge, fromEvent, SubscriptionLike, PartialObserver } from 'rxjs';
import { EmptyObservable } from 'rxjs/observable/EmptyObservable';
//import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@IonicPage()
@Component({
  selector: 'page-mes-annonces',
  templateUrl: 'mes-annonces.html',
})

export class MesAnnoncesPage {

  //private Annonces: AngularFireList<any>;
  public user: any;
  public userInfo:any;
  public Annonces: Event[] = [];
  public listAnnonce: any;

  public loader = this.loadingCtrl.create({
    spinner:"bubbles",
    content: "Please wait..." //,
    //duration: 3000
  });

  constructor(public navCtrl: NavController, public navParams: NavParams, 
              private afDatabase: AngularFireDatabase, 
              public loadingCtrl: LoadingController,
              public platform: Platform,
              private afAuth: AngularFireAuth,
              public firebaseService:firebaseService,
              private nativeStorage: NativeStorage) {
                
              //this.user = /*this.navParams.get('user') ||*/ this.afAuth.auth.currentUser;
              //this.isConnected(); 

  }

  removeAnnonce($key: string) {
    this.listAnnonce.remove($key);
  }

  ngOnInit(){
    this.showLoader();
    // Mise à jour de la langue firebase en cas de changement de mot de passe, l'email envoyé sera dans la langue du tel
    this.afAuth.auth.useDeviceLanguage();
    
    // Récupération du USER
    this.user = /*this.navParams.get('user') ||*/ this.afAuth.auth.currentUser;
    this.afAuth.auth.currentUser.updateProfile({
      photoURL: "https://example.com/jane-q-user/profile.jpg"
    }).then(function(){
      console.log("La photo as changée!")
    });
        

    // Récupération de la liste des annonces
    this.listAnnonce = this.afDatabase.list('/Annonce', ref => ref.orderByChild('idEmmetteur').equalTo(this.user.uid));
    this.listAnnonce.snapshotChanges(['child_added'])
    .subscribe(actions => {
      actions.forEach(action => {
        let an: Event = {
          idAnnonce: action.key,
          title: action.payload.val().title,
          Message: action.payload.val().Message,
          createAnnonce: action.payload.val().createAnnonce,
          idEmmetteur: action.payload.val().idEmmetteur,
          categorie: action.payload.val().categorie,
          competenceRequise: action.payload.val().competenceRequise,
          nbLike: action.payload.val().nbLike
        };
        this.Annonces.push(an);
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

  addAnonce(){
    this.navCtrl.push(AddAnnoncesPage, {user:this.user});
  }

  showAnnonce(annonce) {
    this.navCtrl.push(AnnonceDetailPage, { user: this.user, annonce: annonce })
  }


}
  

  


