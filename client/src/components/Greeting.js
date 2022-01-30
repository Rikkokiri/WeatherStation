import React from 'react';

const Greeting = ({ user }) => {
  const hour = new Date().getHours();

  if (hour >= 4 && hour <= 10) {
    return (
      <div className="greeting">
        Good Morning <br /> <span>{user}</span>
      </div>
    );
  } else if (hour >= 22 || hour <= 3) {
    return (
      <div className="greeting">
        Good Night <br /> <span>{user}</span>
      </div>
    );
  } else if (hour >= 18 && hour < 22) {
    return (
      <div className="greeting">
        Good Evening <br /> <span>{user}</span>
      </div>
    );
  } else {
    return (
      <div className="greeting">
        Good Day <br /> <span>{user}</span>
      </div>
    );
  }
};

export default Greeting;
