import React, { useEffect, useState } from "react";
import Header from "../Components/Header";
import Sidebar from "../Components/Sidebar";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function EditEvent() {
  const location = useLocation();
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    eventId: location.state.eventData._id,
    eventName: location.state.eventData.eventName,
    eventPic: location.state.eventData.eventPic,
    category: location.state.eventData.category,
    pricePerSeat: location.state.eventData.pricePerSeat,
    totalSeats: location.state.eventData.totalSeats,
    address: location.state.eventData.address,
    datetime: location.state.eventData.datetime,
  });

  useEffect(() => {
    window.scrollTo(0, 0, { behavior: "smooth" });
    fetchCategories();
  }, []);

  const fetchCategories = () => {
    axios
      .get(`${process.env.REACT_APP_MONGO_BASE_URL}/getCategories`)
      .then((response) => {
        setCategories(response.data.categories);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevData) => ({
      ...prevData,
      eventPic: file,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }

    try {
      await axios
        .post(
          `${process.env.REACT_APP_MONGO_BASE_URL}/artist/editEvent`,
          data,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((response) => {
          toast.success("Event updated successfully", {
            onClose: () => navigate("/upcomingevent"),
          });
        })
        .catch((error) => {
          toast.error(error.response.data.message);
          console.error("Error adding event:", error);
        });
    } catch (error) {
      console.error("Error adding event:", error);
    }
  };

  return (
    <>
      <div className="container-scroller">
        <Sidebar />
        <div className="container-fluid page-body-wrapper">
          <Header />
          <div className="main-panel">
            <div className="content-wrapper">
              <div className="row">
                <div className="grid-margin stretch-card">
                  <div className="card">
                    <div className="card-body">
                      <h4 className="card-title">Edit Event</h4>
                      <form
                        onSubmit={handleSubmit}
                        className="col-lg-12 form-group"
                      >
                        <div className="row col-lg-12 col-xl-12 col-md-12 g-2 mt-3">
                          <div className="col-lg-6 col-xl-6 col-md-6">
                            <input
                              type="text"
                              className="form-control"
                              name="eventName"
                              value={formData.eventName}
                              onChange={handleChange}
                            />
                          </div>
                          <div className="col-lg-6 col-xl-6 col-md-6">
                            <input
                              type="file"
                              placeholder="Event Picture"
                              className="form-control"
                              accept="image/*"
                              name="eventPic"
                              onChange={handleFileChange}
                            />
                          </div>
                        </div>
                        <div className="row col-lg-12 col-xl-12 col-md-12 g-2 mt-3">
                          <div className="col-lg-6 col-xl-3 col-md-6">
                            <label className="form-label">Category</label>
                            <select
                              className="form-control"
                              name="category"
                              value={formData.category}
                              onChange={handleChange}
                            >
                              <option value="">Select Category</option>
                              {categories.map((cat) => (
                                <option key={cat._id} value={cat.category}>
                                  {cat.category}
                                </option>
                              ))}
                            </select>
                          </div>
                          <div className="col-lg-6 col-xl-3 col-md-6">
                            <label className="form-label">Price Per Seat</label>
                            <input
                              type="number"
                              className="form-control"
                              name="pricePerSeat"
                              min={0}
                              value={formData.pricePerSeat}
                              onChange={handleChange}
                            />
                          </div>
                          <div className="col-lg-6 col-xl-3 col-md-6">
                            <label className="form-label">Total Seats</label>
                            <input
                              type="text"
                              className="form-control"
                              name="totalSeats"
                              min={0}
                              value={formData.totalSeats}
                              onChange={handleChange}
                            />
                          </div>
                          <div className="col-lg-6 col-xl-3 col-md-6">
                            <label className="form-label">Date and Time</label>
                            <input
                              type="datetime-local"
                              className="form-control"
                              name="datetime"
                              value={formData.datetime}
                              min={new Date().toISOString().slice(0, 16)}
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                        <div className="row col-lg-12 col-xl-12 col-md-12 g-2 mt-1">
                          <label htmlFor="address" className="form-label">
                            Address
                          </label>
                          <textarea
                            id="address"
                            className="form-control"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                          />

                          <button type="submit" className="btn btn-primary">
                            Edit Event
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

export default EditEvent;
