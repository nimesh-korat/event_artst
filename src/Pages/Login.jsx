import React, { useEffect, useState } from "react";
import axios from "axios";

function Login() {
  axios.defaults.withCredentials = true;

  function switchSignup() {
    const signupswitch = document.getElementById("signup");
    return signupswitch.classList.add("sign-up-mode");
  }
  function switchSignin() {
    const signinswitch = document.getElementById("signup");
    return signinswitch.classList.remove("sign-up-mode");
  }

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
    role: "1",
  });

  const [regData, setRegData] = useState({
    name: "",
    email: "",
    profilePic: "",
    role: "1",
    phoneNo: "",
    address: "",
    experiance: "",
    category: "",
    password: "",
  });

  const [isLoaded, setLoaded] = useState(true);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_MONGO_BASE_URL}/getCategories`
        );
        setCategories(response.data.categories);
      } catch (error) {
        console.log("Fetch Categories Error:", error);
      }
    }

    fetchCategories();
  }, []);

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    setLoaded(false);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_MONGO_BASE_URL}/login`,
        loginData
      );

      const { success } = response.data;

      localStorage.setItem("token", response.data.token);

      if (success) {
        window.location.reload(false);
        setLoaded(true);
      }
    } catch (error) {
      console.log("Login Err: ", error);
      setLoaded(true);
      if (error.response && error.response.status === 401) {
        alert(error.response.data.message);
      } else {
        alert("Error: Failed to connect to server");
      }
    }
  };

  const handleRegistrationChange = (e) => {
    const { name, value } = e.target;

    setRegData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  //getting profilePic
  const handleFileChange = (e) => {
    //storing profilePic
    setRegData((formData) => ({
      ...formData,
      profilePic: e.target.files[0],
    }));
  };

  const handleRegistrationSubmit = async (e) => {
    e.preventDefault();

    // console.log(regData);
    try {
      const data = new FormData();
      for (const key in regData) {
        data.append(key, regData[key]);
      }

      await axios.post(
        `${process.env.REACT_APP_MONGO_BASE_URL}/register`,
        data
      );
      switchSignin();
    } catch (error) {
      console.log("Reg Error:", error);
      if (error.response && error.response.status === 400) {
        alert(error.response.data.message);
      } else {
        alert("Error: Failed to connect to server");
      }
    }
  };

  return (
    <>
      {isLoaded ? (
        <div id="signup" className="container">
          <div className="forms-container">
            <div className="signin-signup">
              <form onSubmit={handleLoginSubmit} className="sign-in-form">
                <h2 className="title">Sign in</h2>
                <div className="input-field">
                  <i className="fas fa-user" />
                  <input
                    type="text"
                    placeholder="Username"
                    name="email"
                    value={loginData.email}
                    onChange={handleLoginChange}
                    required
                  />
                </div>
                <div className="input-field">
                  <i className="fas fa-lock" />
                  <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={loginData.password}
                    onChange={handleLoginChange}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  Login
                </button>
              </form>
              <form
                encType="multipart/form-data"
                onSubmit={handleRegistrationSubmit}
                className="sign-up-form"
              >
                <h2 className="title">Sign up</h2>
                <div className="input-field">
                  <i className="fa fa-user" />
                  <input
                    type="text"
                    name="name"
                    value={regData.name}
                    onChange={handleRegistrationChange}
                    placeholder="Name"
                    required
                  />
                </div>
                <div className="input-field">
                  <i className="fa fa-envelope"></i>
                  <input
                    type="email"
                    name="email"
                    value={regData.email}
                    onChange={handleRegistrationChange}
                    placeholder="Email"
                    required
                  />
                </div>
                <div className="input-field">
                  <i className="fa fa-phone" />
                  <input
                    type="phone"
                    name="phoneNo"
                    value={regData.phoneNo}
                    onChange={handleRegistrationChange}
                    placeholder="Phone No"
                    required
                  />
                </div>
                <div className="input-field">
                  <i class="fa-solid fa-address-card" />
                  <input
                    type="file"
                    name="profilePic"
                    onChange={handleFileChange}
                    accept="image/*"
                    required
                    style={{ marginTop: "15px" }}
                  />
                </div>
                <div className="input-field">
                  <i className="fa-solid fa-location-dot" />
                  <textarea
                    type="address"
                    name="address"
                    value={regData.address}
                    onChange={handleRegistrationChange}
                    rows="2"
                    placeholder="Address"
                    required
                  />
                </div>
                <div className="input-field">
                  <i className="fa fa-star" />
                  <input
                    type="number"
                    name="experiance"
                    value={regData.experiance}
                    onChange={handleRegistrationChange}
                    placeholder="Experience in Year"
                    required
                  />
                </div>
                <div className="input-field">
                  <i className="fa fa-star" />
                  <select
                    name="category"
                    id="category"
                    required
                    value={regData.category}
                    onChange={handleRegistrationChange}
                  >
                    <option value="">Select Category</option>
                    {categories.map((category) => (
                      <option key={category._id} value={category.category}>
                        {category.category}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="input-field">
                  <i className="fa fa-lock" />
                  <input
                    type="password"
                    name="password"
                    value={regData.password}
                    onChange={handleRegistrationChange}
                    placeholder="Password"
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  Sign up
                </button>
              </form>
            </div>
          </div>
          <div className="panels-container">
            <div className="panel left-panel">
              <div className="content">
                <h3>New here ?</h3>
                <button
                  onClick={switchSignup}
                  className="btn transparent"
                  id="sign-up-btn"
                >
                  Sign up
                </button>
              </div>
              <img
                src="/images/auth/login-bg.jpg"
                alt="logo"
                className="image"
                style={{ width: "100%" }}
              />
            </div>
            <div className="panel right-panel">
              <div className="content">
                <h3>One of us ?</h3>
                <button
                  onClick={switchSignin}
                  className="btn transparent"
                  id="sign-in-btn"
                >
                  Sign in
                </button>
              </div>
              <img
                src="/images/auth/login-bg.jpg"
                alt="logo"
                className="image"
                style={{ width: "100%" }}
              />
            </div>
          </div>
        </div>
      ) : (
        <h3 className="text-center">Please Wait...</h3>
      )}
    </>
  );
}

export default Login;
