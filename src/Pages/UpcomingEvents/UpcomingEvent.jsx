import React, { useEffect, useState } from "react";
import Sidebar from "../../Components/Sidebar";
import Header from "../../Components/Header";
import { CDBDataTable } from "cdbreact";
import axios from "axios";
import { Link } from "react-router-dom";
import CategoriesComp from "./CategoriesComp";
import { toast } from "react-toastify";

function UpcomingEvent() {
  const [data, setData] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const fetchData = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_MONGO_BASE_URL}/artist/getUpcomingEvents`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setData(response.data.upcomingEvents.reverse());
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message ?? "An error occurred");
      setData([]);
    } finally {
      setIsLoaded(true);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  function deleteEvent(id) {
    axios
      .post(
        `${process.env.REACT_APP_MONGO_BASE_URL}/artist/deleteEvent`,
        {
          eventId: id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((response) => {
        alert(response.data.message);
        fetchData();
      })
      .catch((error) => {
        alert(error.response?.data?.message ?? "An error occurred");
        console.log(error);
      });
  }

  var formattedData = [];
  if (data?.length > 0) {
    formattedData = data?.map((data) => ({
      eventName: data.eventName,
      category: data.category,
      pricePerSeat: data.pricePerSeat,
      totalSeats: data.totalSeats,
      availableSeats: data.availableSeats,
      date: new Date(data.datetime)?.toLocaleDateString() ?? "N/A",
      time: new Date(data.datetime)?.toLocaleTimeString() ?? "N/A",
      action: (
        <>
          <Link to={`/editEvent`} state={{ eventData: data }}>
            <button className="btn btn-info btn-sm">Edit</button>
          </Link>{" "}
          &nbsp;
          <button
            className="btn btn-danger btn-sm"
            onClick={() => deleteEvent(data._id)}
          >
            Delete
          </button>
        </>
      ),
    }));
  }

  return (
    <>
      <div className="container-scroller">
        <Sidebar />
        <div className="container-fluid page-body-wrapper">
          <Header />
          <div className="main-panel">
            <div className="content-wrapper">
              <div className="row">
                <CategoriesComp />
                <div className="col-lg-12 grid-margin stretch-card">
                  <div className="card">
                    <div className="card-body">
                      <h4 className="card-title">Upcoming Event Table</h4>
                      <div className="table-responsive">
                        {!isLoaded ? (
                          <div>Loading...</div>
                        ) : data?.length === 0 ? (
                          <div>No data found</div>
                        ) : (
                          <CDBDataTable
                            style={{ textAlign: "center" }}
                            striped
                            hover
                            noRecordsFoundLabel="No events found"
                            responsive
                            entriesOptions={[5, 20, 25]}
                            entries={5}
                            pagesAmount={4}
                            data={{
                              columns: [
                                { label: "Event Name", field: "eventName" },
                                // { label: "Category", field: "category" },
                                {
                                  label: "Price Per Seat",
                                  field: "pricePerSeat",
                                },
                                { label: "Total Seats", field: "totalSeats" },
                                {
                                  label: "Available Seats",
                                  field: "availableSeats",
                                },
                                { label: "Date", field: "date" },
                                // { label: "Time", field: "time" },
                                { label: "Action", field: "action" },
                              ],
                              rows: formattedData,
                            }}
                          />
                        )}
                      </div>
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

export default UpcomingEvent;
