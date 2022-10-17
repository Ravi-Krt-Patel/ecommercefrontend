import "./home.css";
import { useSelector, useDispatch } from "react-redux";
import {
  addBrand,
  removeBrand,
  addPriceRang,
  addDiscount,
  addRating,
  removeRating,
} from "../redux/action/getDataAction";
import { useState } from "react";
export const Sidebar = () => {
  const alldata = useSelector((store) => store.homePageReducer);
  const [brand, setBrand] = useState(false);
  const [lprice, setLprice] = useState(alldata.minPrice);
  const [hprice, setHprice] = useState(alldata.maxPrice);
  const dispatch = useDispatch();
  return (
    <>
      <div className="leftcontaine">
        <div>
          {/* discount section start from here------------------------ */}
          <h3 className="mt-2">Discount</h3>
          <div className="form-check">
            <div
              className={alldata.shdiscount === 20 ? "sideBarBrand" : "normal"}
            >
              <label
                className="form-check-label"
                onClick={() => {
                  dispatch(
                    addDiscount({
                      LD: 1,
                      HD: 20,
                    })
                  );
                }}
              >
                &#x2713; 0% - 20%
              </label>
            </div>
          </div>
          <div className="form-check">
            <div
              className={alldata.shdiscount === 40 ? "sideBarBrand" : "normal"}
            >
              <label
                className="form-check-label"
                onClick={() => {
                  dispatch(
                    addDiscount({
                      LD: 20,
                      HD: 40,
                    })
                  );
                }}
              >
                &#x2713; 20% - 40%
              </label>
            </div>
          </div>
          <div className="form-check">
            <div
              className={alldata.shdiscount === 60 ? "sideBarBrand" : "normal"}
            >
              <label
                className="form-check-label"
                onClick={() => {
                  dispatch(
                    addDiscount({
                      LD: 40,
                      HD: 60,
                    })
                  );
                }}
              >
                &#x2713; 40% - 60%
              </label>
            </div>
          </div>
          <div className="form-check">
            <div
              className={alldata.shdiscount === 100 ? "sideBarBrand" : "normal"}
            >
              <label
                className="form-check-label"
                onClick={() => {
                  dispatch(
                    addDiscount({
                      LD: 60,
                      HD: 100,
                    })
                  );
                }}
              >
                &#x2713; &#62; 60%
              </label>
            </div>
          </div>

          {/* discount end here---------------------------------------- */}

          <div className="btn-group">
            <button
              type="button"
              className="btn btn-danger dropdown-toggle mt-2"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              BRANDS
            </button>
            <ul className="dropdown-menu mt-2">
              {alldata.brand.map((el) => (
                <li
                  className={
                    alldata.sbrand.includes(el) ? "sideBarBrand" : "normal"
                  }
                >
                  <div className="form-check">
                    <label
                      className={"form-check-label brand-hover"}
                      onClick={() => {
                        if (!alldata.sbrand.includes(el)) {
                          dispatch(addBrand(el));
                          // console.log(e.target.value,"something");
                        } else {
                          dispatch(removeBrand(el));
                        }
                      }}
                    >
                      {el}{" "}
                      {alldata.sbrand.includes(el) ? (
                        <span>&#10003;</span>
                      ) : (
                        <span></span>
                      )}
                    </label>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          {/*- rating start from here----------------------------------- */}
          <h3 className="mt-2">Rating</h3>
          <hr class="dropdown-divider"></hr>
          <div className="form-check">
            <div
              className={
                alldata.srating.includes(1) ? "sideBarBrand" : "normal"
              }
            >
              <label
                className="form-check-label"
                onClick={() => {
                  if (!alldata.srating.includes(1)) {
                    dispatch(addRating(1));
                    // console.log(e.target.value,"something");
                  } else {
                    dispatch(removeRating(1));
                  }
                }}
              >
              1 {alldata.srating.includes(1)?(<span>&#9734; &#9734; &#9734; &#9734; &#9733;</span>):(<span> &#9734; &#9734; &#9734; &#9734; &#9734;</span>)}
              </label>
            </div>
          </div>
          <div className="form-check">
            <div className={
                alldata.srating.includes(2) ? "sideBarBrand" : "normal"
              } >
              <label
                className="form-check-label"
                onClick={() => {
                  if (!alldata.srating.includes(2)) {
                    dispatch(addRating(2));
                    // console.log(e.target.value,"something");
                  } else {
                    dispatch(removeRating(2));
                  }
                }}
              >
                2 {alldata.srating.includes(2)?(<span>&#9734; &#9734; &#9734; &#9733; &#9733;</span>):(<span> &#9734; &#9734; &#9734; &#9734; &#9734;  </span>)}
              </label>
            </div>
          </div>
          <div className="form-check">
            <div className={
                alldata.srating.includes(3) ? "sideBarBrand" : "normal"
              } >
              <label
                className="form-check-label"
                onClick={() => {
                  if (!alldata.srating.includes(3)) {
                    dispatch(addRating(3));
                    // console.log(e.target.value,"something");
                  } else {
                    dispatch(removeRating(3));
                  }
                }}
              >
            3 {alldata.srating.includes(3)?(<span>&#9734; &#9734; &#9733; &#9733; &#9733;</span>):(<span> &#9734; &#9734; &#9734; &#9734; &#9734;  </span>)}
              </label>
            </div>
          </div>
          <div className="form-check">
            <div className={
                alldata.srating.includes(4) ? "sideBarBrand" : "normal"
              } >
              <label
                className="form-check-label"
                onClick={() => {
                  if (!alldata.srating.includes(4)) {
                    dispatch(addRating(4));
                    // console.log(e.target.value,"something");
                  } else {
                    dispatch(removeRating(4));
                  }
                }}
              >
               4 {alldata.srating.includes(4)?(<span>&#9734; &#9733; &#9733; &#9733; &#9733;</span>):(<span> &#9734; &#9734; &#9734; &#9734; &#9734;  </span>)}
              </label>
            </div>
          </div>
          <div className="form-check">
            <div className={
                alldata.srating.includes(5) ? "sideBarBrand" : "normal"
              } >
              <label
                className="form-check-label"
                onClick={() => {
                  if (!alldata.srating.includes(5)) {
                    dispatch(addRating(5));
                    // console.log(e.target.value,"something");
                  } else {
                    dispatch(removeRating(5));
                  }
                }}
              >
               5 {alldata.srating.includes(5)?(<span>&#9733; &#9733; &#9733; &#9733; &#9733;</span>):(<span> &#9734; &#9734; &#9734; &#9734; &#9734;  </span>)}
              </label>
            </div>
          </div>

          {/* rating end here ---------------------------------------*/}

          {/* price rang start from here ---------------------------*/}
          <h3 className="mt-2">Price range</h3>
          <hr class="dropdown-divider"></hr>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              dispatch(addPriceRang({ lowPrice: lprice, highPrice: hprice }));
            }}
          >
            <div class="mb-3">
              <label class="form-label">Min</label>
              <input
                type="number"
                class="form-control"
                id="exampleInputEmail1"
                value={lprice}
                onChange={(e) => {
                  setLprice(e.target.value);
                }}
              />
            </div>
            <div class="mb-3">
              <label class="form-label">Max</label>
              <input
                type="number"
                class="form-control"
                id="exampleInputPassword1"
                value={hprice}
                onChange={(e) => {
                  setHprice(e.target.value);
                }}
              />
            </div>
            <button type="submit" class="btn btn-primary">
              Apply
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
