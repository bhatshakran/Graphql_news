import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserStats } from "../../../redux/features/auth/signIn";

const Stats = () => {
  const user = useSelector((state) => state.login.user);
  const dispatch = useDispatch();
  //   console.log(user);
  useEffect(() => {
    dispatch(getUserStats(user._id));
  }, [dispatch, user]);

  return <div>stats here</div>;
};

export default Stats;
