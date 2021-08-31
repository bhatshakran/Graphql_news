import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { autoSign } from "../../redux/features/auth/signIn";
import { useHistory } from "react-router";

const AutoSignIn = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(autoSign());
    setLoading(false);
    history.push("/");
  }, [dispatch]);

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
