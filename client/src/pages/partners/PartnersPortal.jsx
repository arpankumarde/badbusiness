import { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { MdOutlineMenu } from "react-icons/md";
import Button from "../../components/Button";
import { Link } from "react-router-dom";
import SidebarPortal from "../../components/SidebarPortal";
import { deletePartnerData, getPartnerData } from "../../api/partner";
const PortalPortal = () => {
  const [showLinks, setShowLinks] = useState(null);
  const [menu, setMenu] = useState(false);
  const [partnerData, setPartnerData] = useState({ partners: [] });
  const [functionality, setFunctionality] = useState(null);
  const toggleLinks = (teamId) => {
    if (showLinks === teamId) {
      setShowLinks(null);
    } else {
      setShowLinks(teamId);
    }
  };

  const deletePartner = async (id) => {
    const confirmation = window.confirm(
      "Are you sure you want to delete this team member?"
    );

    if (confirmation) {
      try {
        const res = await deletePartnerData(id);
        window.alert(res.data.message);
        window.location.reload();
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("Deletion canceled by user.");
    }
  };

  useEffect(() => {
    async function fetchData() {
      const res = await getPartnerData();
      setPartnerData(res);
    }
    fetchData();
  }, []);
  return (
    <div className="flex w-full h-full ">
      <MdOutlineMenu
        className="md:hidden block absolute top-9 right-9"
        size={25}
        onClick={() => setMenu(!menu)}
      />
      <SidebarPortal
        menu={menu}
        setMenu={setMenu}
        setFunctionality={setFunctionality}
      />
      {functionality == null && (
        <section className="w-[95vw] h-screen overflow-y-auto">
          <div className="w-full p-12">
            <div className="w-[96%] flex justify-end mx-12 mb-3">
              <Link to={`/portal/partner/add`}>
                <Button
                  type=""
                  className="bg-[#5BBB7B] w-36 my-4 hover:bg-green-800 py-3 text-white font-semibold mx-2 "
                >
                  Add New Partner
                </Button>
              </Link>
            </div>
            <table className="table-auto min-w-full">
              <thead>
                <tr className="bg-gray-200">
                  <th className="px-4 py-2">Image</th>
                  <th className="px-4 py-2">Name</th>
                  <th className="px-4 py-2">Headline</th>
                  <th className="px-4 py-2">Is MVP</th>
                  <th className="px-4 py-2">Links</th>
                  <th className="px-4 py-2">Edit</th>
                  <th className="px-4 py-2">Delete</th>
                </tr>
              </thead>
              <tbody>
                {partnerData &&
                  partnerData.partners &&
                  partnerData.partners.map((partner, index) => (
                    <tr key={index}>
                      <td className="border px-4 py-2 rounded-full">
                        {partner.photo === "" ? (
                          <div className="w-16 h-16 rounded-full flex items-center justify-center bg-[#c7b0ff] mx-auto"></div>
                        ) : (
                          <img
                            src={partner.photo}
                            alt={partner.name}
                            className="w-16 h-16 rounded-full mx-auto"
                          />
                        )}
                      </td>
                      <td className="border px-4 py-2 mx-auto text-center">
                        {partner.name}
                      </td>
                      <td className="border px-4 py-2 mx-auto text-center">
                        {partner.headline}
                      </td>
                      <td className="border px-4 py-2 text-center">
                        {partner.isMVP ? "Yes" : "No"}
                      </td>
                      <td className="border px-4 py-2 relative">
                        <button
                          onClick={() => toggleLinks(partner._id)}
                          className="inline-flex justify-center w-full rounded-md border border-gray-300 bg-white px-4 py-2 shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100"
                        >
                          Links
                        </button>
                        {showLinks === partner._id && (
                          <div className="origin-top-right z-10 absolute left-10 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                            <div
                              className="py-1"
                              role="menu"
                              aria-orientation="vertical"
                              aria-labelledby="options-menu"
                            >
                              {partner.links.map((link) => (
                                <Link
                                  key={link._id}
                                  to={link.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                  role="menuitem"
                                >
                                  {link.name} : {link.url}
                                </Link>
                              ))}
                            </div>
                          </div>
                        )}
                      </td>
                      <td className="border px-4 py-2 ">
                        <Link to={`/portal/partner/edit/${partner._id}`}>
                          <MdEdit size={25} className="mx-auto" />
                        </Link>
                      </td>
                      <td className="border px-4 py-2">
                        <MdDelete
                          size={25}
                          className="mx-auto"
                          onClick={() => deletePartner(partner._id)}
                        />
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </section>
      )}
    </div>
  );
};

export default PortalPortal;
