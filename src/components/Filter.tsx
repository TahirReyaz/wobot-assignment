import { MapPinIcon } from "lucide-react";

interface Props {
  type: "status" | "location";
  options: string[];
  value: string;
  handleFilterChange: (type: "status" | "location", value: string) => void;
}

const Filter = ({ type, options, value, handleFilterChange }: Props) => {
  return (
    <div className="flex items-center ms-4 border border-gray-300 rounded p-2 w-fit">
      <div>
        <MapPinIcon className="text-gray-600 mr-2" size={18} />
      </div>
      <select
        className="text-gray-600 bg-white"
        value={value}
        onChange={(e) => handleFilterChange(type, e.target.value)}
      >
        <option value="">All {type}</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Filter;
