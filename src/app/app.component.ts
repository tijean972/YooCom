import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

// Pages
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { MesAnnoncesPage } from '../pages/mes-annonces/mes-annonces';
import { AddAnnoncesPage } from '../pages/add-annonces/add-annonces';
import { IntroPage } from '../pages/intro/intro';
import { ForgotPasswordPage } from '../pages/forgot-password/forgot-password';

// Service
import { AngularFireAuth } from 'angularfire2/auth';

// Base de données
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = null; //null; //MesAnnoncesPage;
  pages: Array<{title: string, component: any}>;

  public userScope2:any;
  public addUserScope2:any;

  //public user: any;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, private afAuth: AngularFireAuth, public afs: AngularFireDatabase) {
    this.initializeApp();

    
      this.afAuth.authState.subscribe(user => {
        if(user){
          this.rootPage = MesAnnoncesPage;
          // Récupération du scoop2 user
          /*this.afs.list('/userScope', ref => ref.orderByChild('idEmmetteur').equalTo(user.uid))
          .snapshotChanges(['child_added'])
          .subscribe(actions => {
            console.log("On y est !!");
            actions.forEach(action => {
              let an = {
                uid: action.key,
                Introduction: action.payload.val(),
              };

              if(an !== null){
                this.rootPage = MesAnnoncesPage;
              }else{
                this.nav.setRoot(IntroPage);
                //this.nav.setRoot(MesAnnoncesPage, {user:user});
              }
            });
            //this.hideLoader();
          });*/

        } else{
          this.nav.setRoot(IntroPage);
        }
     });







    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'Login page', component: LoginPage },
      { title: 'Mot de passe oublié', component: ForgotPasswordPage },
      { title: 'Sign Up', component: SignupPage },
      { title: 'Add Annonce', component: AddAnnoncesPage },
      //{ title: 'List', component: ListPage },
      { title: 'Mes annonces', component: MesAnnoncesPage },
      { title: 'Introduction', component: IntroPage}
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
     if (this.platform.is('android') || this.platform.is('ios')) {
          this.statusBar.backgroundColorByHexString('#3498db');
        //this.statusBar.styleDefault();
         this.splashScreen.hide();
     }

     

      
      
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
