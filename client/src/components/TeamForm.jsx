import Button from "./Button";
import ImageUploader from "./ImageUpload";
import { createData, editTeamData } from "../api/teams";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const TeamForm = ({ functionality, fetchMemberData }) => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: fetchMemberData?.team.name,
    url: fetchMemberData?.team.photo,
    headline: fetchMemberData?.team.headline,
    domain: fetchMemberData?.team.domain,
    isMVP: fetchMemberData?.team.isMVP || false,
    github: fetchMemberData?.team.links[0]?.url,
    linkedin: fetchMemberData?.team.links[1]?.url,
    twitter: fetchMemberData?.team.links[2]?.url,
    behance: fetchMemberData?.team.links[3]?.url,
    dribble: fetchMemberData?.team.links[4]?.url,
    others: fetchMemberData?.team.links[5]?.url,
  });
  const handleSubmit = (e) => {
    e.preventDefault();

    const links = [];

    const addLink = (name, url, icon) => {
      if (url) {
        links.push({ name, url, icon });
      }
    };

    addLink("GitHub", data.github, "github");
    addLink("LinkedIn", data.linkedin, "linkedin");
    addLink("Twitter", data.twitter, "twitter");
    addLink("Behance", data.behance, "behance");
    addLink("Dribbble", data.dribble, "dribbble");

    const memberData = {
      name: data.name,
      headline: data.headline,
      domain: data.domain,
      isMVP: data.isMVP,
      photo: data.url,
      links: links,
    };
    if (functionality === "Add a new Team Member") {
      createData(memberData)
      // eslint-disable-next-line no-unused-vars
        .then((res) => {
          window.alert("Data added successfully");
          navigate("/portal/team");
        })
        .catch((error) => {
          console.log(error);
        });
    }
    if (functionality === "Edit a team member details") {
      editTeamData(fetchMemberData.team._id, memberData)
      // eslint-disable-next-line no-unused-vars
        .then((res) => {
          window.alert("Data edited successfully");
          navigate("/portal/team");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  return (
    <div className="w-full h-full  flex justify-center items-center ">
      <div className="w-[60vw] p-8 flex flex-col shadow-xl  justify-center gap-8 items-center md:items-start ">
        <p className="text-xl font-semibold mb-3 "> {functionality}</p>
        <form
          method="POST"
          className="w-full"
          onSubmit={(e) => handleSubmit(e)}
        >
          <div className="w-full flex flex-col gap-4">
            <ImageUploader />
            <input
              id="name"
              type="text"
              value={data.name}
              required
              placeholder="Name"
              className="border rounded-xl py-3 w-full px-4"
              onChange={(e) => setData({ ...data, name: e.target.value })}
            />
            <input
              id="imageURL"
              type="text"
              value={data.url}
              required
              placeholder="Image URL"
              className="border rounded-xl py-3 w-full px-4"
              onChange={(e) => setData({ ...data, url: e.target.value })}
            />

            <div className="border rounded-xl py-3 w-full px-4 flex items-center justify-between">
              <input
                id="headline"
                type="text"
                value={data.headline}
                required
                placeholder="Headline"
                className="outline-none w-full"
                onChange={(e) => setData({ ...data, headline: e.target.value })}
              />
            </div>
            {functionality !== "Create a new Team" && (
              <div className="border rounded-xl py-3 w-full px-4 flex items-center justify-between">
                <input
                  id="domain"
                  type="text"
                  value={data.domain}
                  required
                  placeholder="Domain"
                  className="outline-none w-full"
                  onChange={(e) => setData({ ...data, domain: e.target.value })}
                />
              </div>
            )}
            <p className="text-base font-semibold mb-3 ">Socials :</p>
            <div className="border rounded-xl py-3 w-full px-4 flex items-center justify-between">
              <input
                id="github"
                type="text"
                value={data.github}
                placeholder="GitHub"
                className="outline-none w-full"
                onChange={(e) => setData({ ...data, github: e.target.value })}
              />
            </div>
            <div className="border rounded-xl py-3 w-full px-4 flex items-center justify-between">
              <input
                id="linkedin"
                type="text"
                value={data.linkedin}
                className="outline-none w-full"
                placeholder="LinkedIn"
                onChange={(e) => setData({ ...data, linkedin: e.target.value })}
              />
            </div>
            <div className="border rounded-xl py-3 w-full px-4 flex items-center justify-between">
              <input
                id="twitter"
                type="text"
                value={data.twitter}
                placeholder="Twitter"
                className="outline-none w-full"
                onChange={(e) => setData({ ...data, twitter: e.target.value })}
              />
            </div>
            <div className="border rounded-xl py-3 w-full px-4 flex items-center justify-between">
              <input
                id="behance"
                type="text"
                value={data.behance}
                placeholder="Behance"
                className="outline-none w-full"
                onChange={(e) => setData({ ...data, behance: e.target.value })}
              />
            </div>

            <div className="border rounded-xl py-3 w-full px-4 flex items-center justify-between">
              <input
                id="dribble"
                type="text"
                value={data.dribble}
                placeholder="Dribble"
                className="outline-none w-full"
                onChange={(e) => setData({ ...data, dribble: e.target.value })}
              />
            </div>
            <div className="border rounded-xl py-3 w-full px-4 flex items-center justify-between">
              <input
                id="others"
                type="others"
                placeholder="Others"
                value={data.others}
                className="outline-none w-full"
                onChange={(e) => setData({ ...data, behance: e.target.value })}
              />
            </div>
            <p className="font-semibold text-sm">Is MVP?</p>
            <div className="border rounded-xl py-3 w-full px-4 flex flex-col items-center justify-between">
              <select className="outline-none border-none w-full">
                <option value="false">Select</option>
                <option
                  value="true"
                  onClick={() => setData({ ...data, isMVP: true })}
                >
                  Yes
                </option>
                <option
                  value="false"
                  onClick={() => setData({ ...data, isMVP: false })}
                >
                  No
                </option>
              </select>
            </div>
            <Button
              type="submit"
              className="bg-[#5BBB7B]  hover:bg-green-800 py-3 text-white font-semibold "
            >
              {functionality}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TeamForm;
