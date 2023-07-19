import React, { useState, useContext } from "react";
import { getAuth, createUserWithEmailAndPassword,updateProfile } from "firebase/auth";
import { collection, addDoc, getFirestore } from "firebase/firestore";
import Logo from "../../olx-logo.png";
import { FirebaseContext } from "../../store/Context";

import "./Signup.css";
import {Link, useNavigate} from 'react-router-dom'

export default function Signup() {
  const navigate = useNavigate()
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const {firebase} = useContext(FirebaseContext);
  const db = getFirestore(firebase)
  const handleSubmit = (e) => {
    e.preventDefault();
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password).then(
      async(userCredential) => {
        // Signed in
        // Signed in 
        const user = userCredential.user;
        updateProfile(auth.currentUser, {
         displayName: username
       })
        user.displayName = username ;

        addDoc(collection(db, "users"), {
         id: user?.uid,
         name: username,
         email: email,
         mobile: phone
       });
       navigate('/login');
      }
    ).catch((err) => {
      console.log("this is user adding error", err)
    })
  };
  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            id="fname"
            name="name"
            defaultValue="John"
          />
          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="fname"
            name="email"
            defaultValue="John"
          />
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            id="lname"
            name="phone"
            defaultValue="Doe"
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="lname"
            name="password"
            defaultValue="Doe"
          />
          <br />
          <br />
          <button>Signup</button>
        </form>
        
        <Link to={"/login"}> Login </Link>

      </div>
    </div>
  );
}
