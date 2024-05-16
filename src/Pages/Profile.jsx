import React, { useEffect, useState } from "react";
import Sidebar from "../Components/Sidebar";
import Header from "../Components/Header";
import axios from "axios";
import { Link } from "react-router-dom";

function Profile() {
  const [profile, setProfile] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0, { behavior: "smooth" });
    axios
      .post(
        `${process.env.REACT_APP_MONGO_BASE_URL}/artist/getProfile`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((response) => {
        setProfile(response.data.user);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoaded(true);
      });
  }, []);

  return (
    <>
      <div className="container-scroller">
        <Sidebar />
        <div className="container-fluid page-body-wrapper">
          <Header />
          <div className="main-panel">
            <div className="content-wrapper">
              <div className="row">
                <div className="col-lg-12">
                  {isLoaded ? (
                    <div className="row justify-content-center">
                      <div className="col-lg-8 mb-4 mb-lg-0">
                        <div
                          className="card mb-3"
                          style={{ borderRadius: "10px" }}
                        >
                          <div className="row g-0">
                            <div
                              className="col-md-4 gradient-custom text-center text-white"
                              style={{
                                borderTopLeftRadius: ".5rem",
                                borderBottomLeftRadius: ".5rem",
                              }}
                            >
                              <img
                                src={`${process.env.REACT_APP_MONGO_BASE_URL}/images/profilePics/${profile?.profilePic}`}
                                alt="Avatar"
                                className="my-5"
                                style={{ width: "80px" }}
                              />
                              <h5 className="text-muted">{profile?.name}</h5>
                              <p className="text-muted">{profile?.category}</p>
                              <i className="far fa-edit mb-5"></i>
                            </div>
                            <div className="col-md-8">
                              <div className="card-body p-4">
                                <h6 className="mt-4">Information</h6>
                                <hr className="mt-0 mb-4" />
                                <div className="row pt-1">
                                  <div className="col-6 mb-3">
                                    <h6>Email</h6>
                                    <p className="text-muted">
                                      {profile?.email ?? "N/A"}
                                    </p>
                                  </div>
                                  <div className="col-6 mb-3">
                                    <h6>Phone</h6>
                                    <p className="text-muted">
                                      {profile?.phoneNo ?? "N/A"}
                                    </p>
                                  </div>
                                  <div className="col-6 mb-3">
                                    <h6>Experience</h6>
                                    <p className="text-muted">
                                      {profile?.experience
                                        ? `${profile.experience} Years`
                                        : "N/A"}
                                    </p>
                                  </div>
                                  <div className="col-6 mb-3">
                                    <h6>Address</h6>
                                    <p className="text-muted">
                                      {profile?.address ?? "N/A"}
                                    </p>
                                  </div>
                                  <div className="col-12 offset-3">
                                    <Link
                                      to="/editProfile"
                                      state={{ profile: profile }}
                                    >
                                      <button
                                        type="button"
                                        className="btn btn-primary"
                                      >
                                        Edit Profile
                                      </button>
                                    </Link>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div>Loading...</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
