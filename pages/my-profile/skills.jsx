import React, { useEffect, useState, useContext } from "react";
import EditProfileLayout from "../../panel/profiling/EditProfileLayout";
import { Button, Card } from "antd";
import { AuthContext } from "../../context/auth";
import toast from "react-hot-toast";
import axios from "axios";
import { API } from "../../config/API";
import { toastPositions } from "../../config/toastPosition";
import Btn from "../../components/ui/Btn";
import { BsTrash } from "react-icons/bs";

const Skills = () => {
  const [auth] = useContext(AuthContext);
  const [skill, setSkill] = useState("");
  const [skillsList, setSkillsList] = useState([]);
  const [loading, setLoading] = useState(false);

  const gettingSkills = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${API}/my-skills`);

      if (data.ok) {
        setSkillsList(data.skills);
      }
    } catch (error) {
      toast.error("Failed, try again", toastPositions);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (auth && auth?.token) gettingSkills();
  }, [auth && auth?.token]);

  const submitHandler = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      const { data } = await axios.put(`${API}/add-skills`, { skill });
      if (data.error) {
        toast.error(data.error);
      } else if (data.ok) {
        toast.success("Added", toastPositions);
        gettingSkills();
        setSkill("");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteSkill = async (x) => {
    setLoading(true);
    try {
      const { data } = await axios.put(`${API}/delete-skills`, {
        skillToDelete: x,
      });
      if (data.error) {
        toast.error(data.error, toastPositions);
      } else if (data.ok) {
        toast.success("Removed", toastPositions);
        setSkillsList(skillsList.filter((i) => i !== x));
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <EditProfileLayout>
      <Card title={`Skills ${loading ? "loading..." : ""}`}>
        <form onSubmit={submitHandler}>
          <div className="col-md-12">
            <div className="form-group py-2">
              <input type="text" className="form-control" placeholder="e.g ReactJs" name="skill" value={skill} onChange={(e) => setSkill(e.target.value)} />
              <Btn className="mt-4" onClick={submitHandler}>
                Submit
              </Btn>
            </div>
          </div>
        </form>

        <hr />

        <div className="d-flex justify-content-center align-items-center gap-2 flex-wrap">
          {skillsList?.map((x, index) => (
            <Button key={index} icon={<BsTrash color="red" onClick={() => deleteSkill(x)} />}>
              {x}
            </Button>
          ))}
        </div>
      </Card>
    </EditProfileLayout>
  );
};

export default Skills;
