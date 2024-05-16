import React, { useEffect, useState } from "react";
import Sidebar from "../Components/Sidebar";
import Header from "../Components/Header";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

function EditProfile() {
  const location = useLocation();
  const navigate = useNavigate();

  const profileData = location.state.profile;

  const [userData, setUserData] = useState({
    name: profileData.name,
    email: profileData.email,
    phoneNo: profileData.phoneNo,
    address: profileData.address,
    experiance: profileData.experiance,
    category: profileData.category,
    profilePic: profileData.profilePic,
  });
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

    window.scrollTo(0, 0, { behavior: "smooth" });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setUserData((formData) => ({
      ...formData,
      profilePic: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();
      for (const key in userData) {
        data.append(key, userData[key]);
      }
      await axios.post(
        `${process.env.REACT_APP_MONGO_BASE_URL}/artist/editProfile`,
        data,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      navigate("/");
    } catch (error) {
      console.log("Edit Error:", error);
      if (error.response && error.response.status === 400) {
        alert(error.response.data.message);
      } else {
        alert("something went wrong");
      }
    }
  };

  return (
    <>
      <div className="container-scroller">
        <Sidebar />
        <Header />
        <div className="main-panel">
          <div className="content-wrapper">
            <div className="row justify-content-center">
              <div className="col-lg-12 mb-4 mb-lg-0">
                <div className="card mb-3" style={{ borderRadius: "10px" }}>
                  <div className="row g-0">
                    <div className="card-body p-4">
                      <h6 className="mt-4">Edit Information</h6>
                      <hr />
                      <form
                        onSubmit={handleSubmit}
                        encType="multipart/form-data"
                        className="row col-lg-12"
                      >
                        <div className="row col-lg-12">
                          <div className="col-lg-6 mb-3">
                            <h6>Name</h6>
                            <input
                              type="text"
                              className="form-control"
                              name="name"
                              value={userData.name}
                              onChange={handleInputChange}
                            />
                          </div>
                          <div className="col-lg-6 mb-3">
                            <h6>Email</h6>
                            <input
                              type="email"
                              className="form-control"
                              name="email"
                              value={userData.email}
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>
                        <div className="row col-lg-12">
                          <div className="col-lg-6 mb-3">
                            <h6>Phone</h6>
                            <input
                              type="tel"
                              className="form-control"
                              name="phoneNo"
                              value={userData.phoneNo}
                              onChange={handleInputChange}
                            />
                          </div>
                          <div className="col-lg-6 mb-3">
                            <h6>Experience (in years)</h6>
                            <input
                              type="number"
                              className="form-control"
                              min="0"
                              max="100"
                              name="experiance"
                              value={userData.experiance}
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>
                        <div className="row col-lg-12">
                          <div className="col-lg-6 mb-3">
                            <h6>Address</h6>
                            <textarea
                              rows={"2"}
                              type="text"
                              className="form-control"
                              name="address"
                              value={userData.address}
                              onChange={handleInputChange}
                            />
                          </div>
                          <div className="col-lg-6 mb-3">
                            <h6>Profile Picture</h6>
                            <input
                              type="file"
                              name="profilePic"
                              onChange={handleFileChange}
                              accept="image/*"
                              required
                              style={{ marginTop: "15px" }}
                            />
                          </div>
                        </div>
                        <div className="row col-lg-12">
                          <div className="col-lg-6 mb-3">
                            <h6>Category</h6>
                            <select
                              className="form-select"
                              name="category"
                              id="category"
                              required
                              value={userData.category}
                              onChange={handleInputChange}
                            >
                              <option value="">Select Category</option>
                              {categories.map((category) => (
                                <option
                                  key={category._id}
                                  value={category.category}
                                >
                                  {category.category}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                        <div className="col-lg-6 offset-5">
                          <button type="submit" className="btn btn-primary">
                            Submit
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditProfile;
