import React from "react";

export const SlotBookingTable = (props) => {
  const { handleAction, classes, isCart } = props;
  return (
    <div className="centerDiv">
      <table id="slotTable">
        <thead>
          <tr>
            <th>Class ID</th>
            <th>Date</th>
            <th>Seats Available</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {classes.map((classItem) => (
            <tr key={classItem.id}>
              <td>{classItem.id}</td>
              <td>{classItem.date}</td>
              <td>
                {classItem.seatsAvailable === 0
                  ? "Full"
                  : classItem.seatsAvailable}
              </td>
              <td>
                {classItem.seatsAvailable === 0 ? (
                  <button className="full-button">Full</button>
                ) : (
                  <button
                    className="common-button"
                    onClick={() => handleAction(classItem)}
                  >
                    {isCart ? "Cancel" : "Book Now"}
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SlotBookingTable;
