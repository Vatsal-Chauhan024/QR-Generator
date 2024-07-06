import React, {useLocation} from "react";


const NextPage = () => {
    // Retrieve the scanned data from the location state
    const location = useLocation();
    const { fixedValue, lastName, mobileNumber, address, latitude, longitude } = location.state;
  
    return (
      <div>
        <h1>Scanned Data</h1>
        <p>Fixed Value: {fixedValue}</p>
        <p>Last Name: {lastName}</p>
        <p>Mobile Number: {mobileNumber}</p>
        <p>Address: {address}</p>
        <p>Latitude: {latitude}</p>
        <p>Longitude: {longitude}</p>
      </div>
    );
  };
  
  export default NextPage;
  