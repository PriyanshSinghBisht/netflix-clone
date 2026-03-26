import { useSearchParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Pagination = ({ totalPages }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get('page') || '1', 10);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      const newParams = new URLSearchParams(searchParams);
      newParams.set('page', newPage.toString());
      setSearchParams(newParams);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = window.innerWidth < 640 ? 3 : 5;
    let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let end = Math.min(totalPages, start + maxVisible - 1);
    
    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex flex-wrap justify-center items-center gap-2 py-8 px-4">
      <motion.button
        whileHover={{ scale: currentPage === 1 ? 1 : 1.05 }}
        whileTap={{ scale: currentPage === 1 ? 1 : 0.95 }}
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-2 min-[640px]:px-4 bg-zinc-800 text-white text-sm min-[640px]:text-base rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-zinc-700 transition"
      >
        <span className="hidden min-[640px]:inline">Previous</span>
        <span className="min-[640px]:hidden">‹</span>
      </motion.button>
      
      <div className="flex gap-1">
        {pageNumbers[0] > 1 && (
          <>
            <Link
              to={`?page=1`}
              onClick={(e) => {
                e.preventDefault();
                handlePageChange(1);
              }}
              className="px-3 py-2 min-[640px]:px-4 rounded-lg bg-zinc-800 text-white text-sm min-[640px]:text-base hover:bg-zinc-700 transition"
            >
              1
            </Link>
            {pageNumbers[0] > 2 && (
              <span className="px-2 py-2 text-gray-400">...</span>
            )}
          </>
        )}
        
        {pageNumbers.map((page) => (
          <motion.div key={page} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              to={`?page=${page}`}
              onClick={(e) => {
                e.preventDefault();
                handlePageChange(page);
              }}
              className={`px-3 py-2 min-[640px]:px-4 rounded-lg text-sm min-[640px]:text-base transition ${
                page === currentPage
                  ? 'bg-red-600 text-white'
                  : 'bg-zinc-800 text-white hover:bg-zinc-700'
              }`}
            >
              {page}
            </Link>
          </motion.div>
        ))}

        {pageNumbers[pageNumbers.length - 1] < totalPages && (
          <>
            {pageNumbers[pageNumbers.length - 1] < totalPages - 1 && (
              <span className="px-2 py-2 text-gray-400">...</span>
            )}
            <Link
              to={`?page=${totalPages}`}
              onClick={(e) => {
                e.preventDefault();
                handlePageChange(totalPages);
              }}
              className="px-3 py-2 min-[640px]:px-4 rounded-lg bg-zinc-800 text-white text-sm min-[640px]:text-base hover:bg-zinc-700 transition"
            >
              {totalPages}
            </Link>
          </>
        )}
      </div>

      <motion.button
        whileHover={{ scale: currentPage === totalPages ? 1 : 1.05 }}
        whileTap={{ scale: currentPage === totalPages ? 1 : 0.95 }}
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-2 min-[640px]:px-4 bg-zinc-800 text-white text-sm min-[640px]:text-base rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-zinc-700 transition"
      >
        <span className="hidden min-[640px]:inline">Next</span>
        <span className="min-[640px]:hidden">›</span>
      </motion.button>
      
      <span className="text-gray-400 text-xs min-[640px]:text-sm ml-2 w-full text-center min-[640px]:w-auto min-[640px]:ml-2">
        Page {currentPage} of {totalPages}
      </span>
    </div>
  );
};

export default Pagination;