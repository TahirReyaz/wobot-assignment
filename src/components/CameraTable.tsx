import React, { useMemo, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { BanIcon, CheckCircle2Icon, CheckCircleIcon } from "lucide-react";

import { fetchCameras, updateCameraStatus } from "../api/camera";
import { Camera } from "../types/Camera";
import Pagination from "./Pagination";
import Filter from "./Filter";
import { statusOptions } from "../utils/constants";
import Health from "./Health";

const CameraTable: React.FC = () => {
  const queryClient = useQueryClient();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [filters, setFilters] = useState({ location: "", status: "" });
  const [selectedCameras, setSelectedCameras] = useState<number[]>([]);

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
      queryClient.invalidateQueries({ queryKey: ["cameras"] }); // Refresh data after updating status
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

  const filteredCameras = useMemo(() => {
    return cameras.filter((camera) => {
      const matchesLocation = filters.location
        ? camera.location === filters.location
        : true;
      const matchesStatus = filters.status
        ? camera.status === filters.status
        : true;

      return matchesLocation && matchesStatus;
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
      <h1 className="text-2xl font-semibold mb">Cameras</h1>
      <h3 className="text-gray-600 mb-4">Manage your cameras here</h3>
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

      <button
        className="px-4 py-2 bg-red-500 text-white rounded mb-4"
        onClick={handleDeleteSelected}
        disabled={selectedCameras.length === 0}
      >
        Delete Selected
      </button>

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
              <td className="px-4 py-2">{camera.name}</td>
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
                    className="cursor-pointer"
                    onClick={() => handleStatusToggle(camera.id, camera.status)}
                  />
                ) : (
                  <BanIcon
                    className="cursor-pointer"
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
