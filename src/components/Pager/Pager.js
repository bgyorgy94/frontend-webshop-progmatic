import { useSearchParams } from "react-router-dom";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa"; 

export default function Pager({ allProducts, productsPerPage }) {

  const [searchParam, setSearchParam] = useSearchParams();
  let currentPage = Number(searchParam.get("page"));
  if (!currentPage) currentPage = 1;

  const totalPages = Math.ceil(allProducts / productsPerPage);

  function toPrevPage() {
    if (currentPage > 1) searchParam.set("page", currentPage - 1); //
    setSearchParam(searchParam);
  }
  function toNextPage() {
    if (totalPages > currentPage) searchParam.set("page", currentPage + 1);
    setSearchParam(searchParam);
  }

  return (
    <div>
      {currentPage > 1 && <button onClick={toPrevPage}> <FaAngleLeft /> </button>}
      <span> {currentPage} </span>
      {currentPage < totalPages && <button onClick={toNextPage}> <FaAngleRight /> </button> }
    </div>
  );
}
