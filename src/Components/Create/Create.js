import React, { Fragment, useEffect,useContext, useState } from "react";
import "./Create.css";
import Header from "../Header/Header";
import { FirebaseContext, AuthContext } from "../../store/Context";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from 'firebase/auth';
const Create = () => {
  const navigate = useNavigate();
  const { firebase } = useContext(FirebaseContext);
  const { user } = useContext(AuthContext);
  const { setUser } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);
  const date = new Date();
  const db = getFirestore(firebase);
  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (userDetails) => {
      if (userDetails) {
        setUser(userDetails)
      } else {
        console.log(" No User ...")
      }
    });
  }, [])
  const handleSubmit = (event) => {
    event.preventDefault();
    if (name && category && price && image) {
      const storage = getStorage();
      const storageRef = ref(storage, `images/${image.name}`);
      console.log(storageRef);
      uploadBytes(storageRef, image).then((snapshot) => {
        getDownloadURL(storageRef)
          .then((url) => {
            console.log(url);
            addDoc(collection(db, "products"), {
              name,
              category,
              price,
              imageUrl: url,
              userId: user?.uid,
              createdOn: date.toDateString(),
            });
            navigate("/");
          })
          .catch((error) => {
            console.log("Error getting download URL:", error);
            setError(error);
          });
      });
    } else {
      setError("Fill all the field required");
    }
  };
  return (
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv">
          <form>
            <label htmlFor="fname">Name</label>
            <br />
            <input
              className="input"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              id="fname"
              name="Name"
              defaultValue="John"
            />
            <br />
            <label htmlFor="fname">Category</label>
            <br />
            <input
              className="input"
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              id="fname"
              name="category"
              defaultValue="John"
            />
            <br />
            <label htmlFor="fname">Price</label>
            <br />
            <input
              className="input"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              type="number"
              id="fname"
              name="Price"
            />
            <br />
          </form>
          <br />
          <img
            alt="Posts"
            width="200px"
            height="200px"
            src={image ? URL.createObjectURL(image) : ""}
          ></img>
          <form>
            <br />
            <input
              onChange={(e) => {
                setImage(e.target.files[0]);
              }}
              type="file"
            />
            <br />
            <button onClick={(e) => handleSubmit(e)} className="uploadBtn">
              upload and Submit
            </button>
          </form>
        </div>
      </card>
    </Fragment>
  );
};

export default Create;
