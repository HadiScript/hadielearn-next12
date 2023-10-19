import React, { useEffect } from "react";

import StuHeader from "../../panel/newStudent/components/StuHeader";
import FirstCol from "../../panel/profiling/firstCol";
import ProfileLayout from "../../panel/profiling/ProfileLayout";
import SecondCol from "../../panel/profiling/secondCol";
import toast from "react-hot-toast";
import axios from "axios";
import { API } from "../../config/API";
import { AuthContext } from "../../context/auth";

const Studetn = () => {
  const [auth] = React.useContext(AuthContext);

  const [loading, setLoading] = React.useState(false);
  const [profile, setProfile] = React.useState({});

  const gettingMyProfile = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${API}/my-profile`);
      console.log({ data });
      setProfile(data._profile);
    } catch (error) {
      console.log(error);
      toast.error("Failed, try again");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (auth && auth.token) {
      gettingMyProfile();
    }
  }, [auth && auth.token]);

  return (
    <ProfileLayout>
      <div class="container rounded bg-white mb-5" style={{ paddingTop: "50px" }}>
        <div class="row">
          <FirstCol user={auth?.user} skills={profile?.skills} social={profile?.social} bio={profile?.bio} />
          <SecondCol profile={profile} />
        </div>
      </div>
    </ProfileLayout>
  );
};

export default Studetn;
