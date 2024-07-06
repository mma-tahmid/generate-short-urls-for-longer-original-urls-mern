import React, { useEffect, useState } from 'react'
import axios from "axios"
import { Link } from "react-router-dom";

const ViewUrlComponent = () => {
  const [urls, setUrls] = useState([]);

  useEffect(() => {
    const fetchUrlAndSetUrl = async () => {
      const result = await axios.get("/api/v5/urlss/all-urls");
      setUrls(result.data.output);
    };
    fetchUrlAndSetUrl();
  }, [urls]);



  return (
    <div>
      <table className="table">
        <thead className="table-success">
          <tr>
            <th>Original Url</th>
            <th>Short Url</th>
            <th>Click Count</th>
          </tr>
        </thead>
        <tbody>
          {urls.map((url, idx) => (
            <tr key={idx}>

              <td>{url.originalUrl}</td>


              <td>
                {/* <a href={url.originalUrl} target="_blank" rel="noopener noreferrer">{url.shortUrl}</a> */}
                <Link to={`${url.originalUrl}`} target="_blank" > {url.shortUrl} </Link>

              </td>

              <td>{url.clicks}</td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ViewUrlComponent;