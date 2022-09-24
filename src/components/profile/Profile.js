import { FormControl, TextField } from "@mui/material";
import React from "react";
import { useLocation } from "react-router-dom";
import useAxios from "../../app/hooks/useAxios";
import { useUserContext } from "../../context/userContext";

const Profile = () => {
  const location = useLocation();

  const { data } = useAxios(`/users/${location.state?.id}`);

  return (
    <div>
      <FormControl fullWidth style={{ marginTop: "20px" }}>
        <TextField value={data?.user?.firstName || ""} disabled={true} />
        <TextField value={data?.user?.lastName || ""} />
        <TextField value={data?.user?.email || ""} disabled={true} />
      </FormControl>
    </div>
  );
};

export default Profile;
