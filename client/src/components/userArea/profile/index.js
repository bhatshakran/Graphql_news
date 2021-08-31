import React from "react";
import UserAreaHOC from "../../HOC/UserAreaHOC";
import EmailPass from "./emailPass";

const Profile = (props) => {
  return (
    <UserAreaHOC>
      <EmailPass {...props} />
      <hr />
    </UserAreaHOC>
  );
};

export default Profile;
