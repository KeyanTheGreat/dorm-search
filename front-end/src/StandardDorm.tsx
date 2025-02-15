import React from 'react';
import './styles/StandardDorm.css'; // Import corresponding CSS for styling


export interface StandardDormProps {
  roomNumber: string;
  floorPlanLink: string;
  roomType: string;
  bathroomType: string;
  kitchenType: boolean;
  roomSize: number;
  building: string
}


export default function StandardDorm({ roomNumber, floorPlanLink, roomType, bathroomType, kitchenType, roomSize, building }: StandardDormProps) {
  const handleClick = () => {
    console.log(building);
  };

  function kitchen() {
    if (kitchenType) {
      return ("Yes")
    } else {
      return ("No")
    }
  }
  function type() {
    if (roomType == "One") {
      return ("Single")
    } else if (roomType == "Two") {
      return ("Double")
    } else if (roomType == "Three") {
      return ("Triple")
    } else if (roomType == "Four") {
      return ("Quad")
    } else {
      return (roomType)
    }
  }
  return (
    <div className="standard-room-info" onClick={handleClick}>
      {/* Room Number and Floor Plan Link */}
      <div className="standard-room-header">
        <span className="room-number">{roomNumber}</span>
        <a href={floorPlanLink} target="_blank" rel="noopener noreferrer" className="floor-plan-link">
          Floor Plan
        </a>
      </div>

      {/* Room Details */}
      <div className="room-details">
        <div className="detail">
          <label>Type</label>
          <span>{type()}</span>
        </div>
        <div className="detail">
          <label>Bathroom</label>
          <span>{bathroomType}</span>
        </div>
        <div className="detail">
          <label>Has Kitchen</label>
          <span>{kitchen()}</span>
        </div>
        <div className="detail">
          <label>Square Feet</label>
          <span>{roomSize}</span>
        </div>
      </div>
    </div>
  );
};

