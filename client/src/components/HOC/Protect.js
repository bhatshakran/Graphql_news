import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

export default function (ComposedComponent) {
  const AuthenticationCheck = (props) => {
    const history = useHistory();
    const [isAuth, setIsAuth] = useState(false);
    const user = useSelector((state) => state.login);

useEffect(() => {
  if (!user.user._id) {
    history.push("/");
  } else {
    setIsAuth(true);
  }
}, [props, user]);

    if (!isAuth) {
      return (
        <div className="main_loader">
          <div>Loading...</div>
        </div>
      );
    } else {
      return <ComposedComponent {...props} />;
    }
  };

  return AuthenticationCheck;
}
