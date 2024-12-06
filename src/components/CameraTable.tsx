import React, { useMemo, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { BanIcon, CheckCircleIcon, TrashIcon } from "lucide-react";

import { fetchCameras, updateCameraStatus } from "../api/camera";
import { Camera } from "../types/Camera";
import Pagination from "./Pagination";
import Filter from "./Filter";
import { statusOptions } from "../utils/constants";
import Health from "./Health";
import Name from "./Name";
import SearchFilter from "./SearchFilter";

const CameraTable: React.FC = () => {
  const queryClient = useQueryClient();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [filters, setFilters] = useState({
    location: "",
    status: "",
    search: "",
  });
  const [selectedCameras, setSelectedCameras] = useState<number[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const { data: cameras = [], isLoading } = useQuery<Camera[]>({
    queryKey: ["cameras"],
    queryFn: fetchCameras,
  });

  const locationOptions = useMemo(
    () => Array.from(new Set(cameras.map((camera) => camera.location))),
    [cameras]
  );

  const updateStatusMutation = useMutation({
    mutationFn: ({ id, status }: { id: number; status: string }) =>
      updateCameraStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cameras"] });
    },
  });

  const handleStatusToggle = (id: number, currentStatus: string) => {
    const newStatus = currentStatus === "Active" ? "Inactive" : "Active";
    updateStatusMutation.mutate({ id, status: newStatus });
  };

  const handleDeleteSelected = () => {
    queryClient.setQueryData(["cameras"], (oldData: Camera[] | undefined) =>
      oldData?.filter((camera) => !selectedCameras.includes(camera.id))
    );
    setSelectedCameras([]);
  };

  const toggleSelectAll = () => {
    if (selectedCameras.length === paginatedCameras.length) {
      setSelectedCameras([]);
    } else {
      setSelectedCameras(paginatedCameras.map((camera) => camera.id));
    }
  };

  const toggleSelection = (id: number) => {
    setSelectedCameras((prev) =>
      prev.includes(id)
        ? prev.filter((cameraId) => cameraId !== id)
        : [...prev, id]
    );
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setCurrentPage(1);
    setFilters((prev) => ({ ...prev, search: term }));
  };

  const filteredCameras = useMemo(() => {
    return cameras.filter((camera) => {
      const matchesLocation = filters.location
        ? camera.location === filters.location
        : true;
      const matchesStatus = filters.status
        ? camera.status === filters.status
        : true;
      const matchesSearch = filters.search
        ? camera.name.toLowerCase().includes(searchTerm.toLowerCase())
        : true;

      return matchesLocation && matchesStatus && matchesSearch;
    });
  }, [cameras, filters]);

  const paginatedCameras = filteredCameras.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-normal mb">Cameras</h1>
          <h3 className="text-gray-600 mb-4">Manage your cameras here</h3>
        </div>
        <SearchFilter searchTerm={searchTerm} onSearch={handleSearch} />
      </div>
      <div className="flex justify-between my-4">
        <div className="flex">
          <Filter
            {...{
              type: "location",
              handleFilterChange: (key, value) =>
                setFilters((prev) => ({ ...prev, [key]: value })),
              value: filters.location,
              options: locationOptions,
            }}
          />

          <Filter
            {...{
              type: "status",
              handleFilterChange: (key, value) =>
                setFilters((prev) => ({ ...prev, [key]: value })),
              value: filters.status,
              options: statusOptions,
            }}
          />
        </div>
        {selectedCameras.length > 0 && (
          <button
            className="flex gap-2 items-center px-3 py-1 me-8 text-white bg-red-500/80 hover:bg-red-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 transition-all duration-150 ease-in-out"
            onClick={handleDeleteSelected}
          >
            <TrashIcon />
            <span>Delete Selected</span>
          </button>
        )}
      </div>

      <table className="table-auto w-full text-gray-600">
        <thead>
          <tr className="text-left">
            <th className="px-4 py-2">
              <input
                type="checkbox"
                checked={selectedCameras.length === paginatedCameras.length}
                onChange={toggleSelectAll}
              />
            </th>
            <th className="px-4 py-2 font-normal">NAME</th>
            <th className="px-4 py-2 font-normal">HEALTH</th>
            <th className="px-4 py-2 font-normal">LOCATION</th>
            <th className="px-4 py-2 font-normal">RECORDER</th>
            <th className="px-4 py-2 font-normal">TASKS</th>
            <th className="px-4 py-2 font-normal">STATUS</th>
            <th className="px-4 py-2 font-normal">ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {paginatedCameras.map((camera) => (
            <tr key={camera.id}>
              <td className="px-4 py-2">
                <input
                  type="checkbox"
                  checked={selectedCameras.includes(camera.id)}
                  onChange={() => toggleSelection(camera.id)}
                />
              </td>
              <td className="px-4 py-2">
                <Name
                  {...{
                    name: camera.name,
                    hasWarning: camera.hasWarning,
                    createdBy: "sherwinwilliams@wobot.ai",
                    isResponding: !!(
                      camera.health &&
                      (camera.health.cloud || camera.health.device)
                    ),
                  }}
                />
              </td>
              <td className="px-4 py-2">
                <Health {...{ ...camera.health }} />
              </td>
              <td className="px-4 py-2">{camera.location || "N/A"}</td>
              <td className="px-4 py-2">{camera.recorder || "N/A"}</td>
              <td className="px-4 py-2">{camera.tasks || "N/A"}</td>
              <td className="px-4 py-2">
                <span
                  className={`p-2 ${
                    camera.status === "Active"
                      ? "bg-green-300/30 text-green-600"
                      : "bg-gray-200/40 text-gray-600"
                  } rounded text-sm`}
                >
                  {camera.status}
                </span>
              </td>
              <td className="px-4 py-2">
                {camera.status !== "Active" ? (
                  <CheckCircleIcon
                    className="cursor-pointer w-4"
                    onClick={() => handleStatusToggle(camera.id, camera.status)}
                  />
                ) : (
                  <BanIcon
                    className="cursor-pointer w-4"
                    onClick={() => handleStatusToggle(camera.id, camera.status)}
                  />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        totalItems={filteredCameras.length}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        onItemsPerPageChange={handleItemsPerPageChange}
      />
    </div>
  );
};

export default CameraTable;
