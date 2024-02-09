import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, signInWithPopup, GoogleAuthProvider, updateProfile  } from "firebase/auth";
import conf from '../conf/conf';

class AuthService {
    constructor() {
        console.log("conf ", conf);
        this.app = initializeApp(conf);
        this.auth = getAuth();
        this.gAuthProvider = new GoogleAuthProvider();
    }
    async registerUser({ email, password }) {
        try {
            const user = await createUserWithEmailAndPassword(this.auth, email, password)
            if (user) {
                const signinUser = await this.signInUser({ email, password });

                console.log("current user ", this.auth);
                return signinUser;
            } else {
                return user;
            }
        } catch (error) {
            console.log("Auth >> registerUser >> ", error);
            return false;
        }

    }

    async signInUser({ email, password }) {
        try {
            return await signInWithEmailAndPassword(this.auth, email, password)
        } catch (error) {
            console.log("Auth >> signInUser >> ", error);
            return false;
        }

    }

    async logout() {
        try {
            return await signOut(this.auth);

        } catch (error) {
            console.log("Auth >> logout user >> ", error);
            return false;
        }

    }

    async signInWithGoogle() {
        signInWithPopup(this.auth, this.gAuthProvider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;
                // IdP data available using getAdditionalUserInfo(result)
                console.log("login with google >> cred :", credential, ">>, token :", token, ", user : ", user);
            }).catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
                console.log("login with google >> error code : ", errorCode, ", errorMessage : ", errorMessage, ", email : ", email, ", cred :", credential);
            });

    }

    async updateUserProfile(dataToUpdate){
        try {
            const updateResponse = await updateProfile(this.auth.currentUser, dataToUpdate);
            if(updateResponse){
                console.log("update true response ", updateResponse);
            }else{
                console.log("update false response ", updateResponse);
            }
            return true;
        } catch (error) {
            console.log("Auth >> update profile  >> ", error);
            return true;
        }
    }


}
const auth = new AuthService();

onAuthStateChanged(auth.auth, (user) => {
    if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        console.log("onAuthStateChanged user ", user);

    } else {
        // User is signed out
        console.log("onAuthStateChanged user signed out ");
    }
});




export default auth;
export { AuthService }