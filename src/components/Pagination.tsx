import React from "react";

interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (itemsPerPage: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
  onItemsPerPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  const handleFirstPage = () => onPageChange(1);
  const handlePreviousPage = () => onPageChange(Math.max(1, currentPage - 1));
  const handleNextPage = () =>
    onPageChange(Math.min(totalPages, currentPage + 1));
  const handleLastPage = () => onPageChange(totalPages);

  return (
    <div className="flex items-center justify-end mt-4 text-gray-600">
      {/* Items Per Page Dropdown */}
      <select
        className="border px-2 py-1 rounded bg-white cursor-pointer"
        value={itemsPerPage}
        onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
      >
        {[5, 10, 20, 50, 100].map((value) => (
          <option key={value} value={value}>
            {value}
          </option>
        ))}
      </select>

      {/* Current Range and Total */}
      <span className="mx-4">
        {startItem}-{endItem} of {totalItems}
      </span>

      {/* Navigation Buttons */}
      <div className="flex">
        <button
          className="mx-1 py-1 rounded cursor-pointer"
          onClick={handleFirstPage}
          disabled={currentPage === 1}
        >
          &lt;&lt;
        </button>
        <button
          className="mx-1 py-1 rounded cursor-pointer"
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
        >
          &lt;
        </button>
        <button
          className="mx-1 py-1 rounded cursor-pointer"
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          &gt;
        </button>
        <button
          className="mx-1 py-1 rounded cursor-pointer"
          onClick={handleLastPage}
          disabled={currentPage === totalPages}
        >
          &gt;&gt;
        </button>
      </div>
    </div>
  );
};

export default Pagination;
