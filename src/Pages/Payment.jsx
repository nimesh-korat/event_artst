import React, { useEffect } from "react";
import Sidebar from "../Components/Sidebar";
import Header from "../Components/Header";
import { CDBDataTable } from "cdbreact";
import axios from "axios";

function Payment() {
  const [data, setData] = React.useState([]);
  const [isLoaded, setIsLoaded] = React.useState(false);

  useEffect(() => {
    window.scrollTo(0, 0, { behavior: "smooth" });
    const fetchData = async () => {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_MONGO_BASE_URL}/artist/getPayments`,
          {},
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setData(response.data.payments.reverse());
      } catch (error) {
        console.log(error);
        setData([]);
      } finally {
        setIsLoaded(true);
      }
    };

    fetchData();
  }, []);

  const formattedData =
    data?.length > 0
      ? data.map((data) => ({
          paymentId: data?._id,
          userId: data?.userId,
          payments: data?.payments,
          status: data?.status,
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
                      <h4 className="card-title">Payment Table</h4>
                      <div className="table-responsive">
                        {!isLoaded ? (
                          <div>Loading...</div>
                        ) : data?.length === 0 ? (
                          <div>No data found</div>
                        ) : (
                          <CDBDataTable
                            striped
                            hover
                            responsive
                            entriesOptions={[5, 20, 25]}
                            entries={5}
                            pagesAmount={4}
                            data={{
                              columns: [
                                { label: "Payment ID", field: "paymentId" },
                                { label: "User", field: "userId" },
                                { label: "Payment Amount", field: "payments" },
                                { label: "Status", field: "status" },
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

export default Payment;
