import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
//import AuthProvider = firebase.auth.AuthProvider;

@Injectable()
export class firebaseService {

	constructor(public afAuth: AngularFireAuth, public afs: AngularFireDatabase, ) {
	}

	
// Connexion
	signInWithEmail(credentials) {
		console.log('Sign in with email');
		return this.afAuth.auth.signInWithEmailAndPassword(credentials.email,
			 credentials.password);
	}

	signUp(credentials) {
		return this.afAuth.auth.createUserWithEmailAndPassword(credentials.email, credentials.password);
	}

	resetPassword(email: string) {
		return this.afAuth.auth.sendPasswordResetEmail(email);
		  
	}

// USER
	getCurrentUserUid(){
		return this.afAuth.auth.currentUser.uid;
	}

	getCurrentUserInfo(){
		let listUser: any;
		let user:any;

		this.afs.list('/Users/' + this.getCurrentUserUid(), ref => ref.orderByKey().equalTo(this.getCurrentUserUid()))
		.snapshotChanges(['child_added'])
		.subscribe (utilisateur => {

			  let userbase: any =
			  {
				  NomPrenom : null,
				  phoneNumber: null,
				  email: null,
				  photoURL: null
			  }
			  user = userbase;
			});
			
			return user;
	};
		

 
}