import React from "react";
import { CircleAlertIcon } from "lucide-react";

interface Props {
  name: string;
  hasWarning: boolean;
  createdBy: string;
  isResponding: boolean;
}

const Name = ({ name, hasWarning, createdBy, isResponding }: Props) => {
  return (
    <div className="flex gap-1">
      <div
        className={`w-3 h-3 rounded-full mt-2 ${
          isResponding ? "bg-green-700" : "bg-red-700"
        }`}
      />
      <div>
        <div className="flex gap-2">
          <span>{name}</span>
          {hasWarning && (
            <span>
              <CircleAlertIcon className="text-orange-400" />
            </span>
          )}
        </div>
        <span className="text-sm text-gray-400">{createdBy}</span>
      </div>
    </div>
  );
};

export default Name;
