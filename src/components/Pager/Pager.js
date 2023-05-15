import { useSearchParams } from "react-router-dom";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa"; 

export default function Pager({ allProducts, itemsPerPage }) {

  const [searchParam, setSearchParam] = useSearchParams();
  let currentPage = Number(searchParam.get("page"));
  if (!currentPage) currentPage = 1;
  const totalPages = Math.ceil(allProducts / itemsPerPage);
  const pageStep = {
    prev4: currentPage - 4,
    prev3: currentPage - 3,
    prev2: currentPage - 2,
    prev1: currentPage - 1,
    next1: currentPage + 1,
    next2: currentPage + 2,
    next3: currentPage + 3,
    next4: currentPage + 4
  }

  function toPrevPage() {
    if(currentPage > 1) searchParam.set("page", pageStep.prev1); //
    setSearchParam(searchParam);
  }
  function toNextPage() {
    if(totalPages > currentPage) searchParam.set("page", pageStep.next1);
    setSearchParam(searchParam);
  }

  function toPageNum(e)  {
      if(currentPage >= 1 && currentPage <= totalPages) searchParam.set("page", e.target.value)
      setSearchParam(searchParam)
    }
  
  return (
    <div>
      {currentPage > 1 && <button  onClick={toPrevPage}> <FaAngleLeft /> </button>}
      {currentPage == 1 || <button value= {1} onClick={toPageNum}> 1 </button>}
      {pageStep.prev4 > 1  && <span> [...] </span> }
      {pageStep.prev3 > 1 && <button value= {pageStep.prev3} onClick={toPageNum}> {pageStep.prev3} </button>}
      {pageStep.prev2 > 1 && <button value= {pageStep.prev2} onClick={toPageNum}> {pageStep.prev2} </button>}
      {pageStep.prev1 > 1 && <button value= {pageStep.prev1} onClick={toPageNum}> {pageStep.prev1} </button>} 
      <span> {currentPage} </span>
      {pageStep.next1 < totalPages && <button value= {pageStep.next1} onClick={toPageNum}> {pageStep.next1} </button>}
      {pageStep.next2 < totalPages && <button value= {pageStep.next2} onClick={toPageNum}> {pageStep.next2} </button>}
      {pageStep.next3 < totalPages && <button value= {pageStep.next3} onClick={toPageNum}> {pageStep.next3} </button>}
      {pageStep.next4 < totalPages && <span> [...] </span> }
      {currentPage == totalPages || <button value= {totalPages} onClick={toPageNum}> {totalPages} </button>}
      {currentPage < totalPages && <button onClick={toNextPage}> <FaAngleRight /> </button> }
    </div>
  );


}
