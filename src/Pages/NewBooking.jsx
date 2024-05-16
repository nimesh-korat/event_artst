import React, { useEffect, useState } from "react";
import Sidebar from "../Components/Sidebar";
import Header from "../Components/Header";
import { CDBDataTable } from "cdbreact";
import axios from "axios";

function NewBooking() {
  const [data, setData] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const fetchData = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_MONGO_BASE_URL}/artist/getBookings`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setData(response.data.bookings.reverse());
    } catch (error) {
      console.log(error);
      setData([]);
    } finally {
      setIsLoaded(true);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0, { behavior: "smooth" });
    fetchData();
  }, []);

  const formattedData =
    data?.length > 0
      ? data.map((data) => ({
          eventId: data?.eventId,
          userId: data?.userId,
          totalPrice: data?.totalPrice,
          seats: data?.seats,
          date: new Date(data?.date)?.toLocaleDateString() ?? "N/A",
          time: new Date(data?.date)?.toLocaleTimeString() ?? "N/A",
        }))
      : [];

  return (
    <>
      <div className="container-scroller">
        <Sidebar />
        <div className="container-fluid page-body-wrapper">
          <Header />
          <div className="main-panel">
            <div className="content-wrapper">
              <div className="row">
                <div className="col-lg-12 grid-margin stretch-card">
                  <div className="card">
                    <div className="card-body">
                      <h4 className="card-title">Bookings</h4>
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
                            responsive
                            entriesOptions={[5, 20, 25]}
                            noRecordsFoundLabel="No bookings found"
                            entries={5}
                            pagesAmount={4}
                            data={{
                              columns: [
                                { label: "Event ID", field: "eventId" },
                                { label: "User ID", field: "userId" },
                                { label: "Amount Paid", field: "totalPrice" },
                                { label: "Seats", field: "seats" },
                                { label: "Date", field: "date" },
                                { label: "Time", field: "time" },
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

export default NewBooking;
