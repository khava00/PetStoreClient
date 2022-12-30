import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Accordion from "../components/Accordion/Accordion";
import { ProductList } from "../components/ProductListPage/ProductList";
import { useParams } from "react-router-dom";
import {
  listProductPage,
  listProductSuggest,
} from "./../components/redux/Actions/ProductActions";
import { Pagination } from "@nextui-org/react";
import { FaThLarge } from "react-icons/fa";
import { GoThreeBars } from "react-icons/go";
import { Loading } from "@nextui-org/react";

export const ProductPage = () => {
  const { categories } = useSelector((state) => state.categoryList);
  const productList = useSelector((state) => state.productListPage);
  const searchList = useSelector((state) => state.productListSuggest);
  const { name } = useSelector((state) => state.currentNameList);
  const dispatch = useDispatch();
  const { loading } = productList;
  const { loadingListSuggest } = searchList;
  const { categoryId, breedId, keyword } = useParams();
  const [pageNumber, setPageNumber] = useState(1);
  const [currentList, setCurrentList] = useState({});
  const [currentLoading, setCurrentLoading] = useState(true);
  const pageSize = 9;
  useEffect(() => {
    // if (keyword) dispatch(listProductSuggest(keyword, pageNumber, pageSize))
    // else
    if (
      keyword === undefined &&
      categoryId === undefined &&
      breedId === undefined
    ) {
      dispatch(listProductPage(0, 0, pageNumber, pageSize));
    } else if (
      isNaN(keyword) &&
      keyword !== undefined &&
      categoryId === undefined &&
      breedId === undefined
    ) {
      dispatch(listProductSuggest(keyword, pageNumber, pageSize));
      setCurrentLoading(true);
    } else if (!isNaN(keyword) && keyword !== undefined)
      dispatch(listProductPage(0, keyword, pageNumber, pageSize));
    else if (breedId !== undefined)
      dispatch(listProductPage(breedId, categoryId, pageNumber, pageSize));
  }, [dispatch, breedId, categoryId, pageNumber, keyword]);

  useEffect(() => {
    if (!loadingListSuggest && currentLoading) {
      setCurrentList(searchList);
      setCurrentLoading(false);
    }
  }, [loadingListSuggest, currentLoading]);

  useEffect(() => {
    setPageNumber(1)
  }, [keyword, categoryId])
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
          <h1 className="title-name">
            {isNaN(keyword) && categoryId === undefined && keyword !== undefined
              ? "Kết quả tìm kiếm: " + keyword
              : !name
              ? "Tất cả"
              : name}
          </h1>
          <div className="view-type">
            {/* <span>Chế độ hiển thị: </span>
            <div className="view-control">
              <a onClick={() => toggleTab(1)}><FaThLarge /></a>
              <a onClick={() => toggleTab(2)}><GoThreeBars /></a>
            </div> */}
          </div>
          <div class={toggleState === 2 ? "product-list-list" : "product-list"}>
            {(loading === false && currentLoading === false) || (loading === undefined && currentLoading === false) ? (
              <>
                {isNaN(keyword) &&
                keyword !== undefined &&
                currentList.products?.content.length === 0 ? (
                  <span className="search-result">Không có kết quả</span>
                ) : (
                  <ProductList
                    productList={
                      isNaN(keyword) && keyword !== undefined
                        ? currentList.products?.content
                        : productList.products?.content
                    }
                  />
                )}
              </>
            ) : (
              <div className="loading-product-list container">
                <Loading />
              </div>
            )}
          </div>
        </div>
      </div>
      <br />
      <div className="pagination">
        {isNaN(keyword) &&
        keyword !== undefined &&
        currentList.products?.content.length === 0 ? (
          <></>
        ) : isNaN(keyword) && keyword !== undefined ? (
          <Pagination
            shadow
            animated={false}
            total={currentList.products?.pageInfo?.totalPage}
            onChange={(e) => setPageNumber(e)}
            page={pageNumber}
            initialPage={pageNumber}
          />
        ) : (
          <Pagination
            shadow
            animated={false}
            total={productList.products?.pageInfo?.totalPage}
            onChange={(e) => setPageNumber(e)}
            page={pageNumber}
            initialPage={pageNumber}
          />
        )}
      </div>
    </>
  );
};
