import React, { useEffect, useContext } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Signup from "./Pages/Signup";
import { AuthContext, FirebaseContext } from "./store/Context";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Post from "./store/PostContext";
/**
 * ?  =====Import Components=====
 */
import Create from "./Pages/Create";
import Login from "./Pages/Login";
import View from "./Pages/ViewPost";
import Home from "./Pages/Home";

function App() {
  const { setUser } = useContext(AuthContext);
  const { firebase } = useContext(FirebaseContext);
  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  });
  return (
    <Post>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/create" element={<Create />}></Route>
          <Route path="/view" element={<View />}></Route>
        </Routes>
      </Router>
    </Post>
  );
}

export default App;
