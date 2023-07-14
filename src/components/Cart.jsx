import React, { useEffect, useState } from "react";
import SlotBookingTable from "./SlotBookingTable";

const Cart = (props) => {
  const { toggleComponent, setCartCount } = props;
  const [bookedClasses, setBookedClasses] = useState([]);

  useEffect(() => {
    const storedData = localStorage.getItem("classData");
    let classes = storedData ? JSON.parse(storedData) : [];
    setBookedClasses(classes);
  }, []);

  const cancelClassDataById = (classData) => {
    const id = classData?.id;
    const storedData = localStorage.getItem("classData");
    let classes = storedData ? JSON.parse(storedData) : [];
    const updatedClasses = classes.filter((classItem) => classItem.id !== id);
    localStorage.setItem("classData", JSON.stringify(updatedClasses));
    setBookedClasses(updatedClasses);
    setCartCount(updatedClasses?.length);
  };

  return (
    <>
      <button className="full-button" onClick={toggleComponent}>
        Back To List
      </button>
      {bookedClasses && (
        <SlotBookingTable
          handleAction={cancelClassDataById}
          classes={bookedClasses}
          isCart={true}
        />
      )}
    </>
  );
};

export default Cart;
