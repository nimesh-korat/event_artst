import React, { useEffect, useState } from "react";
import axios from "axios";

function CategoriesComp() {
  const [data, setData] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_MONGO_BASE_URL}/getCategories`
        );
        setData(response.data.categories);
      } catch (error) {
        console.log(error);
        setData([]);
      } finally {
        setIsLoaded(true);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="col-lg-12 grid-margin stretch-card">
        <div className="card">
          <div className="card-body">
            <h4 className="card-title">Event Category Table</h4>
            <div className="table-responsive">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Category ID</th>
                    <th>Categories</th>
                  </tr>
                </thead>
                <tbody>
                  {isLoaded ? (
                    data.map((item) => (
                      <tr key={item._id}>
                        <td>{item._id}</td>
                        <td>{item.category}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="2">Loading...</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CategoriesComp;
