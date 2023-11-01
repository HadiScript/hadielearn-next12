import React from "react";

import FirstCol from "../../panel/profiling/firstCol";
import ProfileLayout from "../../panel/profiling/ProfileLayout";
import SecondCol from "../../panel/profiling/secondCol";
import { AuthContext } from "../../context/auth";
import useMyProfile from "../../panel/profiling/hooks/useMyProfile";
import { Skeleton } from "antd";

const Studetn = () => {
  const [auth] = React.useContext(AuthContext);

  const { profile, loading } = useMyProfile(auth);

  return (
    <ProfileLayout>
      <div class="container rounded bg-white mb-5" style={{ paddingTop: "50px" }}>
        <div class="row">
          {loading ? (
            <Skeleton active />
          ) : (
            <>
              {profile && <FirstCol user={auth?.user} skills={profile?.skills} social={profile?.social} bio={profile?.bio} />}
              <SecondCol profile={profile} loading={loading} />
            </>
          )}
        </div>
      </div>
    </ProfileLayout>
  );
};

export default Studetn;
