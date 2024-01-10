import { useState } from "react";
import auth from "../firebase/AuthService";

function SignupForm() {
    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');

    const handleSubmit = (e) =>{
        e.preventDefault();
        auth.registerUser({email : email, password : password})
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            console.log("auth", auth.auth);
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log("errorCode "+errorCode, " errorMessage"+errorMessage);
          });
    }

    const handleLogout = () => {
        auth.logout().then(() => {
            console.log("logout check auth", auth.auth)
        })
    }

    const handleCheckAuth = () => {
        console.log("just check auth ", auth.auth);
    }

    return (<>
        <form onSubmit={handleSubmit}>
            <div>
                <input placeholder="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
            </div>
            <div>
                <input placeholder="passowrd" type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
            </div>
            <button type="submit">Submit</button>
            <div>
                {
                    email
                }|
                {
                    password
                }
            </div>
        </form>

        <button onClick={handleLogout}>logout</button>
        <button onClick={handleCheckAuth}>check auth</button>
    </>);
}

export default SignupForm;