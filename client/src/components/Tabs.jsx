import React, { useState, useEffect } from "react";
import { getServiceData } from "../api/service";

const Tabs = () => {
  const [services, setServices] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeTab, setActiveTab] = useState("");

  useEffect(() => {
    const fetchServiceData = async () => {
      try {
        const data = await getServiceData();
        setServices(data.services);
        const uniqueCategories = [
          ...new Set(data.services.map((service) => service.category.trim())),
        ];
        setCategories(uniqueCategories);
        setActiveTab(uniqueCategories[0] || "");
      } catch (error) {
        console.error("Error fetching services data:", error);
      }
    };

    fetchServiceData();
  }, []);

  const handleTabClick = (category) => {
    setActiveTab(category);
  };

  return (
    <section className="pt-24">
      <div className="container mx-auto px-4">
        <div className="flex justify-center text-center gap-2">
          <div>
            <h2 className="lg:text-3xl text-xl font-bold">Why choose BAD?</h2>
            <p className="text-gray-600 mt-4">
              Most viewed and all-time top-selling services
            </p>
          </div>
        </div>
        {/* Tab Content */}
        <ul
          className="flex justify-center flex-wrap gap-2 md:gap-6 lg:gap-8 mt-4 lg:mt-6 xl:mt-8"
          role="tablist"
        >
          {categories.map((category) => (
            <li
              key={category}
              className={`rounded-3xl px-4 py-2 cursor-pointer ${
                activeTab === category
                  ? "bg-[#212A32] text-white border-black border"
                  : "text-black border-black border hover:bg-gray-200"
              }`}
              onClick={() => handleTabClick(category)}
            >
              {category}
            </li>
          ))}
        </ul>

        <div className="tab-content lg:mt-16 md:mt-4 mx-auto w-full md:w-4/5">
          {categories.map(
            (category) =>
              activeTab === category && (
                <div
                  key={category}
                  className="tab-pane fade show active"
                  id={`tab-${category}`}
                  role="tabpanel"
                >
                  <div className="flex flex-col flex-wrap md:flex-row gap-8 justify-center lg:my-12 mt-6">
                    {services
                      .filter((service) => service.category.trim() === category)
                      .map((service) => (
                        <div
                          key={service._id}
                          className="hover:shadow-lg hover-box-shadow rounded-lg overflow-hidden border w-full sm:w-80 lg:w-96"
                        >
                          <div className="p-4 flex justify-center">
                            <h5 className="font-semibold mb-2">
                              <h2>{service.title}</h2>
                            </h5>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              )
          )}
        </div>
      </div>
    </section>
  );
};

export default Tabs;
