import axios from "axios";
import React, { useEffect } from "react";

function Counts() {
  const [counts, setCounts] = React.useState({});

  useEffect(() => {
    axios
      .post(
        `${process.env.REACT_APP_MONGO_BASE_URL}/artist/getCounts`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => setCounts(res.data.counts))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-xl-2 g-3">
        <div className="col">
          <div className="card h-100">
            <div className="card-body d-flex flex-wrap justify-content-between">
              <div>
                <h4 className="font-weight-semibold mb-1 text-black">
                  Total Events
                </h4>
                <h6 className="text-muted">Event Counts</h6>
              </div>
              <h3 className="text-success font-weight-bold">
                {counts.eventCounts}
              </h3>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card h-100">
            <div className="card-body d-flex flex-wrap justify-content-between">
              <div>
                <h4 className="font-weight-semibold mb-1 text-black">
                  Total Bookings
                </h4>
                <h6 className="text-muted">Booking Counts</h6>
              </div>
              <h3 className="text-success font-weight-bold">
                {counts.bookingCount}
              </h3>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Counts;
