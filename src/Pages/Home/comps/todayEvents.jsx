import React, { useEffect } from "react";
import { CDBDataTable } from "cdbreact";
import axios from "axios";

function TodaysEvents() {
  const [data, setData] = React.useState([]);
  const [isLoaded, setIsLoaded] = React.useState(false);

  const fetchData = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_MONGO_BASE_URL}/artist/getTodayEvents`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setData(response.data.todayEvents);
    } catch (error) {
      console.log(error);
      setData([]);
    } finally {
      setIsLoaded(true);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  var formattedData = [];
  if (data.length > 0) {
    formattedData = data?.map((data) => ({
      eventId: data._id,
      eventName: data.eventName,
      category: data.category,
      pricePerSeat: data.pricePerSeat,
      totalSeats: data.totalSeats,
      availableSeats: data.availableSeats,
      address: data.address,
      // date: new Date(data.datetime).toLocaleDateString(),
      time: new Date(data.datetime).toLocaleTimeString(),
    }));
  }

  return (
    <>
      <div className="row mt-4">
        <div className="col-xl-12">
          <div className="card">
            <div className="card-body">
              <div className="card-title mb-2">Today's Events</div>
              <div className="table-responsive p-2">
                {!isLoaded ? (
                  <div>Loading...</div>
                ) : (
                  <CDBDataTable
                    striped
                    noRecordsFoundLabel="No Events Found"
                    style={{ textAlign: "center" }}
                    hover
                    responsive
                    entriesOptions={[5, 20, 25]}
                    entries={5}
                    pagesAmount={4}
                    data={{
                      columns: [
                        { label: "Event ID", field: "eventId" },
                        { label: "Event Name", field: "eventName" },
                        { label: "Category", field: "category" },
                        { label: "Price", field: "pricePerSeat" },
                        { label: "Total Seats", field: "totalSeats" },
                        { label: "Available Seats", field: "availableSeats" },
                        { label: "Address", field: "address" },
                        // { label: "Date", field: "date" },
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
    </>
  );
}

export default TodaysEvents;
