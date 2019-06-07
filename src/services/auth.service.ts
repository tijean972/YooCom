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

	getCurrentUserDisplayName(){
		return this.afAuth.auth.currentUser.displayName;
	}

	getCurrentUserEmail(){
		return this.afAuth.auth.currentUser.email;
	}

	getCurrentUserPhotoURL(){
		return this.afAuth.auth.currentUser.photoURL;
	}
 
}