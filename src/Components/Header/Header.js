import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css";
import OlxLogo from "../../assets/OlxLogo";
import Search from "../../assets/Search";
import Arrow from "../../assets/Arrow";
import SellButton from "../../assets/SellButton";
import SellButtonPlus from "../../assets/SellButtonPlus";
import { AuthContext, FirebaseContext } from "../../store/Context";
import { getAuth, signOut } from "firebase/auth";
function Header() {
  const { user,setUser } = useContext(AuthContext);
  const navigate = useNavigate()
  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div className="brandName">
          <OlxLogo></OlxLogo>
        </div>
        <div className="placeSearch">
          <Search></Search>
          <input type="text" />
          <Arrow></Arrow>
        </div>
        <div className="productSearch">
          <div className="input">
            <input
              type="text"
              placeholder="Find car,mobile phone and more..."
            />
          </div>
          <div className="searchAction">
            <Search color="#ffffff"></Search>
          </div>
        </div>
        <div className="language">
          <span> ENGLISH </span>
          <Arrow></Arrow>
        </div>
        <div className="loginPage">
          
          <span>{user ? user.displayName : <Link to={"/login"}> <span>Login</span> </Link> }</span>

          <hr />
        </div>
        {user && (
          <span
            onClick={() => {
              const auth = getAuth();
              console.log("logout");
              signOut(auth).then(() => {
                setUser(false);
                navigate('/login')
              });
            }}
          >
            Logout
          </span>
        )}
        
        <div className="sellMenu">
          <SellButton></SellButton>
          <div className="sellMenuContent">
            <SellButtonPlus></SellButtonPlus>
            { user ? <Link to={"/create"}><span>SELL</span> </Link>:<Link to={"/login"}><span>SELL</span> </Link>}
          </div>
        </div>
         
      </div>
    </div>
  );
}

export default Header;
