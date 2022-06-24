import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { toast } from "react-toastify";
import baseAPI from "../../../axios/axiosConfig";
import { toastOptions } from "../../../helper/toast";
import Spinner from "../../../ui/spinner/Spinner";
import LocationListItem from "./LocationListItem";

const LocationList = () => {
  const [locations, setLocations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getLocationList = async () => {
      try {
        setIsLoading(true);
        const response = await baseAPI.get(`/v1/locations`);
        setLocations(response.data.data.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    getLocationList();
  }, []);

  const handleDeleteLocation = async (locationId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this location from the DB?"
    );
    if (confirmDelete) {
      try {
        await baseAPI.delete(`v1/locations/${locationId}`);
        toast.success("Location Deleted", toastOptions);
        setLocations(
          locations.filter((location) => location._id !== locationId)
        );
      } catch (error) {
        console.log(error);
      }
    } else {
      toast.warn("Location Not Deleted", toastOptions);
      setTimeout(() => window.location.reload(), 1500)();
    }
  };

  const locationList = locations
    .slice(0, 15)
    .map((location) => (
      <LocationListItem
        key={location._id}
        location={location}
        handleDeleteLocation={handleDeleteLocation}
      />
    ));

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-end items-start sm:space-x-6 mb-4 mr-8 ml-8">
        <div className="flex flex-col w-full">
          <h1 className="text-2xl">List of Available Locations</h1>
          <div className="flex flex-row">
            <p className="flex flex-row items-center">
              <Icon icon="ic:baseline-swipe-left" color="#ea5933" width="40" />
              <span className="ml-2">
                Swipe list elements right to update / left to remove element
              </span>
            </p>
          </div>
        </div>
      </div>

      <hr />

      <div className="flex-1 m-4 flex-col">
        {isLoading ? <Spinner /> : locationList}
      </div>
    </>
  );
};

export default LocationList;