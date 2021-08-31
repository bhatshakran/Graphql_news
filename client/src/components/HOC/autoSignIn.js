import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

const AutoSignIn = (props) => {
  const [loading, setLoading] = useState(true);
  if (loading) {
    return (
      <div className="main_loader">
        <div>loading...</div>
      </div>
    );
  } else {
    return <div>{props.children}</div>;
  }
};

export default AutoSignIn;
