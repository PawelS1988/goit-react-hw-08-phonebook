import React from "react";
import { store } from "../../app/store";
import { setUserId } from "../../features/contacts";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    store.dispatch(setUserId(""));
    navigate(`/`);
  };

  return (
    <div>
      <Link onClick={handleSubmit} to={`/`}>
        Log out
      </Link>
    </div>
  );
};

export default Logout;
