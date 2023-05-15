
export default function pagerService(searchParams){

    let currentPage = Number(searchParams.get("page")) 
    if(!currentPage ) currentPage = 1;
    const itemsPerPage = 9;
    const endIdx = currentPage * itemsPerPage;
    const startIdx = endIdx - itemsPerPage;
    const pagerData = [startIdx, endIdx, itemsPerPage]

    return(
        pagerData
    );
}