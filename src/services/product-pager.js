
export default function productPager(searchParams){

    let currentPage = Number(searchParams.get("page")) 
    if(!currentPage ) currentPage = 1;
    const productsPerPage = 9
    const endIdx = currentPage * productsPerPage;
    const startIdx = endIdx - productsPerPage;
    const pagerData = [startIdx, endIdx, productsPerPage]

    return(
        pagerData
    )
}