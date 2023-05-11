import { useSearchParams } from "react-router-dom";

export default function TurnThePage({ allProducts, productsPerPage }) {

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
      <button onClick={toPrevPage}> ◄ </button>
      <span> {currentPage} </span>
      <button onClick={toNextPage}> ► </button>
    </div>
  );
}
