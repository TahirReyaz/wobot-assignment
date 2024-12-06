import React from "react";

interface Props {
  type: "status" | "location";
  options: string[];
  value: string;
  handleFilterChange: (type: "status" | "location", value: string) => void;
}

const Filter = ({ type, options, value, handleFilterChange }: Props) => {
  return (
    <select
      className="border p-2"
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
  );
};

export default Filter;
