import React, { useEffect } from "react";

import FirstCol from "../../panel/profiling/firstCol";
import ProfileLayout from "../../panel/profiling/ProfileLayout";
import SecondCol from "../../panel/profiling/secondCol";
import toast from "react-hot-toast";
import axios from "axios";
import { API } from "../../config/API";
import { AuthContext } from "../../context/auth";
import { useState } from "react";
import useMyProfile from "../../panel/profiling/hooks/useMyProfile";

const Studetn = () => {
  const [auth] = React.useContext(AuthContext);

  const { profile, loading } = useMyProfile(auth);

  return (
    <ProfileLayout>
      <div class="container rounded bg-white mb-5" style={{ paddingTop: "50px" }}>
        <div class="row">
          {profile && <FirstCol user={auth?.user} skills={profile?.skills} social={profile?.social} bio={profile?.bio} />}
          <SecondCol profile={profile} />
        </div>
      </div>
    </ProfileLayout>
  );
};

export default Studetn;
