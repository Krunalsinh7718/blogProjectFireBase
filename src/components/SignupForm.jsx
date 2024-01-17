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
                <input placeholder="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"/>
            </div>
            <div>
                <input placeholder="passowrd" type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"/>
            </div>
            <button type="submit" className="rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-600/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600">Submit</button>
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