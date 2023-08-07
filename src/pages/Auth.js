import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import React, {useState} from 'react';
// FcGoogle
import { FcGoogle } from 'react-icons/fc';
import { toast } from 'react-toastify';
import { auth } from '../firebase';
import { useNavigate } from "react-router-dom";

const initializeState = {
    firstName:"",
    lastName : "",
    email: "",
    password : "",
    confirmPassword:""
};

const Auth = ({setActive}) => {
    const [state, setState] = useState(initializeState);
    const [signUp, setSignUp] = useState(false);

    const {email, password, firstName, lastName, confirmPassword} =state;
    const navigate = useNavigate();

    const handleChange = (e) => {
        setState({...state, [e.target.name]: e.target.value})
    };

    const handleAuth = async (e) => {
        e.preventDefault();
        if(!signUp) {
            if(email && password){
                const {user} = await signInWithEmailAndPassword(auth, email, password);
                
                setActive("home");
               
            }
            else{
                return toast.error("All fields are Mandatory to fill");
            }

        } else {
           if(password !== confirmPassword){
            return toast.error("Password don't match")
           } 
           if(firstName && lastName && email && password ){
            const {user} = await createUserWithEmailAndPassword(auth, email, password)
            await updateProfile(user, {displayName: `${firstName} ${lastName}`});
           setActive("home");
        } else{
            return toast.error("All fields are Mandatory to fill");
        }
        }
        navigate("/");
        toast.success("You are logged successfully");
    };
  return (
    <div className="container-fluid mb-4">
        <div className="container">
            <div className="col-12 text-center">
                <div className="text-center heading mt-2 py-2">
                   <h2>{!signUp ? "Sign-In" : "Sign-Up"}</h2> 
                </div>
            </div>
            <div className="row h-100 justify-content-center align-items-center">
                <div className="col-10 col-md-8 col-lg-6">
                    <form className="row" onSubmit={handleAuth}>
                        {signUp && (
                          <>
                          <div className="col-6 py-3">
                            <input text="text" className="form-control input-text-box"
                            placeholder="First Name"
                            name="firstName" 
                            value={firstName}
                            onChange={handleChange}
                            />

                        </div>
                        <div className="col-6 py-3">
                            <input text="text" className="form-control input-text-box"
                            placeholder="Last Name"
                            name="lastName" 
                            value={lastName}
                            onChange={handleChange}
                            />

                        </div>
                          </>
                        )}
                        <div className="col-12 py-3">
                            <input type="email" className="form-control input-text-box"
                            placeholder="Enter Email"
                            name="email" 
                            value={email}
                            onChange={handleChange}
                            />

                        </div>
                        <div className="col-12 py-3">
                            <input type="password" className="form-control input-text-box"
                            placeholder="Enter password"
                            name="password" 
                            value={password}
                            onChange={handleChange}
                            />

                        </div>
                        {signUp && (
                            <div className="col-12 py-3">
                            <input type="password" className="form-control input-text-box"
                            placeholder="Enter Confirm password"
                            name="confirmPassword" 
                            value={confirmPassword}
                            onChange={handleChange}
                            />

                        </div>
                        )}
                       
                        
                        <div className="col-12 py-3 text-center">
                            <button className={`btn ${!signUp ? "btn-sign-in": "btn-sign-up"}` } type="submit">
                                { !signUp ? "Sign In" : "Sign Up" }
                            </button>
                        </div>
                    </form>
                    
                </div>
                {!signUp ? (
                    <>
                    <div className="text-center justify-content mt-2 pt-1 mb-0">
                     <p className="small fw-bold mt-2 pt-1 mb-0">
                        Don't Have an Account ? &nbsp;
                        <span className="link-danger" 
                        style={{textDecoration:"none", cursor: "pointer"}}
                        onClick={() => setSignUp(true)}
                        >
                        Sign Up
                        </span>
                     </p>
                    </div>
                    </>
                ) : (
                    <>
                    <div className="text-center justify-content  pt-1 mb-0">
                     <p className="small fw-bold mt-2 pt-1 mb-0">
                        Already Have an Account ?&nbsp;
                        <span style={{textDecoration:"none", cursor: "pointer", color: "#298af2"}}
                        onClick={() => setSignUp(false)}
                        >
                            Sign In
                        </span>
                        <p className="mt-3"><strong>Continue With</strong></p>
                        <FcGoogle size={35}/>
                     </p>
                    </div>
                    </>
                )}
                
            </div>
        </div>

    </div>
  )
}

export default Auth