import React, { useState, useEffect } from "react";
import { generateRandomClasses, generateRandomNumber } from "../services/api";
import SlotBookingTable from "./SlotBookingTable";
import Cart from "./Cart";

const OnlineClassBookingUI = () => {
  const [classes, setClasses] = useState([]);
  const [countdown, setCountdown] = useState(0);
  const [freeSeatsLeft, setFreeSeatsLeft] = useState(0);
  const [showCart, setShowCart] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  useEffect(() => {
    startCountdown();
    setFreeSeatsLeft(generateRandomNumber(5, 15));
    setClasses(generateRandomClasses(15));
  }, []);

  const startCountdown = () => {
    const randomSeconds = generateRandomNumber(30, 60);
    setCountdown(randomSeconds);

    const countdownInterval = setInterval(() => {
      setCountdown((prevCountdown) =>
        prevCountdown > 0 ? prevCountdown - 1 : 0
      );
    }, 1000);

    // Clean up the interval on component unmount
    return () => clearInterval(countdownInterval);
  };

  const addClassData = (classData) => {
    const storedData = localStorage.getItem("classData");
    let classesFromStorage = storedData ? JSON.parse(storedData) : [];
    const newClassDate = new Date(classData.date);
    const weekStartDate = new Date(
      newClassDate.getFullYear(),
      newClassDate.getMonth(),
      newClassDate.getDate() - newClassDate.getDay()
    );
    const weekEndDate = new Date(
      newClassDate.getFullYear(),
      newClassDate.getMonth(),
      newClassDate.getDate() - newClassDate.getDay() + 6
    );

    // Check if the user has already booked three classes in the same week
    const weekClasses = classesFromStorage.filter((classItem) => {
      const existingClassDate = new Date(classItem.date);
      return (
        existingClassDate >= weekStartDate && existingClassDate <= weekEndDate
      );
    });

    const existingData = classesFromStorage.filter(
      (classItem) => classItem.id === classData.id
    );
    if (existingData && existingData.length > 0) {
      alert("Class is Already Exists.");
      return;
    }

    if (weekClasses.length >= 3) {
      alert("You can only book a maximum of 3 classes per week.");
      return;
    }
    const updatedClasses = classes.map((classItem) => {
      if (classItem.id === classData.id && classItem.seatsAvailable > 0) {
        return {
          ...classItem,
          seatsAvailable: classItem.seatsAvailable - 1,
        };
      }
      return classItem;
    });

    setClasses(updatedClasses);

    classesFromStorage.push(classData);
    setCartCount(classesFromStorage.length);
    localStorage.setItem("classData", JSON.stringify(classesFromStorage));
  };

  const handleBookNow = (classData) => {
    addClassData(classData);
  };

  const toggleComponent = () => {
    setShowCart(!showCart);
  };

  useEffect(() => {
    const storedData = localStorage.getItem("classData");
    let classes = storedData ? JSON.parse(storedData) : [];

    setCartCount(classes.length);
  }, []);

  return (
    <div>
      <h1>Online Class Booking UI</h1>
      <div>
        <h2>Countdown: {countdown} seconds</h2>
        <h2>Free Seats Left: {freeSeatsLeft}</h2>
        <div role="presentation" onClick={toggleComponent}>
          <span class="fa-stack fa-lg">
            <i class="fa fa-shopping-cart" style={{ fontSize: 36 }}></i>
            <span class="fa-stack-1x cart-badge">{cartCount}</span>
          </span>
        </div>
      </div>
      {!showCart && classes && classes.length > 0 && (
        <SlotBookingTable
          handleAction={handleBookNow}
          classes={classes}
          isCart={false}
        />
      )}

      {showCart && (
        <Cart toggleComponent={toggleComponent} setCartCount={setCartCount} />
      )}
    </div>
  );
};

export default OnlineClassBookingUI;
