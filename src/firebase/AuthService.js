import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged  } from "firebase/auth";
import conf from '../conf/conf';

class AuthService{
    constructor(){
        this.app = initializeApp(conf);
        this.auth = getAuth();
    }
    async  registerUser({email, password}){
        console.log("before register ", this.auth);
        try {
            const user = await createUserWithEmailAndPassword(this.auth, email, password)
            if(user){
                console.log(email, password);
                const signinUser = await this.signInUser({email, password});
                // console.log("signinUser  ",signinUser.user);

                console.log("current user ", this.auth);
                return signinUser;
            }else{
                return user;
            }
        } catch (error) {
            console.log("Auth >> registerUser >> ",error);
            return false;
        }
      
    }

    async  signInUser({email, password}){
        try {
            return await signInWithEmailAndPassword(this.auth, email, password)
        } catch (error) {
            console.log("Auth >> signInUser >> ",error);
            return false;
        }
      
    }

    async logout(){
        try {
            return await signOut(this.auth);
            
        } catch (error) {
            console.log("Auth >> signInUser >> ",error);
            return false;
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
export {AuthService}