import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Accordion from "../components/Accordion/Accordion";
import { ProductList } from "../components/ProductListPage/ProductList";
import { useParams } from "react-router-dom";
import {
  listProductPage, listProductSuggest,
} from "./../components/redux/Actions/ProductActions";
import { Pagination } from "@nextui-org/react";
import { FaThLarge } from 'react-icons/fa';
import { GoThreeBars } from 'react-icons/go';
import { Loading } from "@nextui-org/react";

export const ProductPage = () => {
  const { categories } = useSelector((state) => state.categoryList);
  const productList = useSelector((state) => state.productListPage);
  const searchList = useSelector((state) => state.productListSuggest);
  const { name } = useSelector((state) => state.currentNameList);
  const dispatch = useDispatch();
  const { loading } = productList
  const{loadingListSuggest}= searchList
  const { categoryId, breedId, keyword } = useParams();
  const [pageNumber, setPageNumber] = useState(1);
  const page_size = 9;
  useEffect(() => {
    if (keyword) dispatch(listProductSuggest(keyword, pageNumber, page_size))
    else if (breedId) dispatch(listProductPage(breedId, categoryId, pageNumber, page_size))
    else if (categoryId) dispatch(listProductPage(0, categoryId, pageNumber, page_size))
    else dispatch(listProductPage(0, 0, pageNumber, page_size))
  }, [dispatch, categoryId, breedId, pageNumber, keyword]);
  const [toggleState, setToggleState] = useState(1);
  const toggleTab = (index) => {
    setToggleState(index);
  };
  return (
    <>
      <div class="product-page container mtop">
        <div class="product-category">
          <h3 class="title">Danh mục sản phẩm</h3>
          <ul>
            {categories?.map((category) => (
              <Accordion category={category} />
            ))}
          </ul>
        </div>
        <div className="title-page">
          <h1 className="title-name">{!name ? "Tất cả" : name}</h1>
          <div className="view-type">
            {/* <span>Chế độ hiển thị: </span>
            <div className="view-control">
              <a onClick={() => toggleTab(1)}><FaThLarge /></a>
              <a onClick={() => toggleTab(2)}><GoThreeBars /></a>
            </div> */}
          </div>
          <div class={toggleState === 2 ? "product-list-list" : "product-list"} >
            {((loading === undefined&&loadingListSuggest===undefined) || (loading === true&&loadingListSuggest==true)) ? (
              <div className="loading-product-list container"><Loading /></div>
            ) : (<>
              {keyword && searchList.products?.content.length === 0 ? <span className="search-result">Không có kết quả</span> :
                <ProductList productList={keyword ? searchList.products?.content : productList?.products?.content} />
              }
            </>)
            }
          </div>
        </div>
      </div>
      <br />
      <div className="pagination">
        {keyword && searchList.products?.content.length === 0 ? <></> : keyword ? <Pagination shadow animated={false} total={searchList.products?.pageInfo?.totalPage} onChange={(e) => setPageNumber(e)} initialPage={1} /> :
          <Pagination shadow animated={false} total={productList.products?.pageInfo?.totalPage} onChange={(e) => setPageNumber(e)} initialPage={1} />}
      </div>
    </>
  );
};
