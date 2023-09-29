import React from "react";
import "./Pagination.css";

function Pagination({ pages, nextPage, currentPage }) {
  const pageLinks = [];

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Add smooth scrolling behavior
    });
  };

  // Function to handle clicking on an ellipsis
  const handleEllipsisClick = () => {
    nextPage(currentPage + 1); // Show one more number after clicking the ellipsis
    scrollToTop(); // Scroll to the top when clicking ellipsis
  };

  for (let i = 1; i <= pages; i++) {
    const isCurrentPage = i === currentPage;
    const isWithinRange = i <= currentPage + 2 && i >= currentPage - 2;

    // Show page numbers, ellipsis, and one more number after every 5 results
    if (isCurrentPage || (isWithinRange && i !== 1 && i !== pages)) {
      pageLinks.push(
        <li
          key={i}
          onClick={() => {
            nextPage(i);
            scrollToTop(); // Scroll to the top when clicking a page number
          }}
          className={isCurrentPage ? "active" : ""}
        >
          <a href="#">{i}</a>
        </li>
      );
    } else if (i === currentPage - 3 || i === currentPage + 3) {
      pageLinks.push(
        <li
          key={i}
          onClick={() => {
            handleEllipsisClick();
          }}
          className="ellipsis"
        >
          <a href="#">...</a>
        </li>
      );
    }
  }

  return (
    <div className="container">
      <ul className="pagination">
        {currentPage > 1 && (
          <li
            onClick={() => {
              nextPage(currentPage - 1);
              scrollToTop(); // Scroll to the top when clicking "Prev"
            }}
          >
            <a href="#">Prev</a>
          </li>
        )}
        {pageLinks}
        {currentPage < pages && (
          <li
            onClick={() => {
              nextPage(currentPage + 1);
              scrollToTop(); // Scroll to the top when clicking "Next"
            }}
          >
            <a href="#">Next</a>
          </li>
        )}
      </ul>
    </div>
  );
}

export default Pagination;
