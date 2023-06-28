import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { getLists, search } from "../../.././apis/product";

export default function ListView(props: any) {
  const [products, setProducts] = useState([]);
  const [currentEntity, setCurrentEntity] = useState("");
  const [scrollOffset, setScrollOffSet] = useState(0);
  const [searchItem, setSearchItem] = useState({
    sItem: "",
  });
  const limitProducts="20";

  function getProducts(action?: any) {
    if (action) {
      search(searchItem, limitProducts, scrollOffset.toString()).then((data) => {
        if (data.products.length > 0) {
          let newProducts: any = [...products, ...data.products];
          setProducts(newProducts);
        }
      });
    } else {
      getLists(limitProducts, scrollOffset.toString()).then((data) => {
        if (data.products.length > 0) {
          let newProducts: any = [...products, ...data.products];
          setProducts(newProducts);
        }
      });
    }
  }

  function fetchMoreData(action?: any) {
    if (action) {
      getProducts("search");
    } else {
      setScrollOffSet(scrollOffset + 20);
    }
  }

  const handleInputChange = (event: any) => {
    const { value } = event.target;
    setSearchItem((prevProps) => ({
      ...prevProps,
      sItem: value,
    }));
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    fetchMoreData("search");
  };

  useEffect(() => {
    //When search item changes reset scroll offset
    const resetScrollOffset = () => {
      setScrollOffSet(0);
    };
    resetScrollOffset();
  }, [searchItem]);

  useEffect(() => {
    const handleMore = () => {
      setTimeout(() => {
        if (searchItem.sItem.length > 0) {
          getProducts("search");
        } else {
          getProducts();
        }
      }, 1500);
    };
    handleMore();
  }, [scrollOffset]);

  useEffect(() => {
    const handleEntityChange = () => {
      switch (props.entity) {
        case "Products":
          getProducts();
          break;
        default:
          break;
      }
    };
    setCurrentEntity(props.entity);
    handleEntityChange();
  }, [props.entity]);

  return (
    <>
      <div>
        {currentEntity == "Products" ? (
          <>
            <form onSubmit={handleSubmit} className="w-25 mx-auto">
              <div className="d-flex mb-5">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Type product name"
                  id="exampleInputEmail1"
                  name="sItem"
                  onChange={handleInputChange}
                />
                <button type="submit" className="btn btn-primary">
                  Search
                </button>
              </div>
            </form>
            <div className="pb-5">
              <InfiniteScroll
                dataLength={products.length}
                next={fetchMoreData}
                hasMore={true}
                loader={
                  <h4 className="w-25 mx-auto text-center ">Loading...</h4>
                }
              >
                <div className="d-flex justify-content-center flex-wrap mb-3">
                  {products.map((product, index) => (
                    <div
                      className="card"
                      key={index}
                      style={{ width: "18rem" }}
                    >
                      <img
                        src={product["images"][0]}
                        className="card-img-top"
                        alt="..."
                      />
                      <div className="card-body">
                        <h5 className="card-title"> {product["title"]}</h5>
                        <p className="card-text">{product["description"]}</p>
                        <p className="card-text">
                          Price: {product["price"] + "$"}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </InfiniteScroll>
            </div>
          </>
        ) : (
          "Error with Products"
        )}
      </div>
    </>
  );
}
