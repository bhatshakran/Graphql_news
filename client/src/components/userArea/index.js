import React from "react";
import UserAreaHOC from "../HOC/UserAreaHOC";

const UserArea = () => {
  return (
    <UserAreaHOC>
      <div className="mt-3">User area here!</div>
    </UserAreaHOC>
  );
};

export default UserArea;
