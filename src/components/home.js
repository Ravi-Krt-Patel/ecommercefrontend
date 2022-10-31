import "./home.css";
import { Product } from "./Product";
import { Navbar } from "./Navbar";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useState, useEffect,memo } from "react";
import { Sidebar } from "./SideBar";
import BasicRating from "./rating";
import { Loader } from "./loading";
import env from "react-dotenv";
import axios from "axios";
import {Category} from "./category";
import {
  getHomeDataLoading,
  getHomeData,
  pageUpdate,
  addCartDetail,
  cartDataLoading
} from "../redux/action/getDataAction";
import { useSelector, useDispatch } from "react-redux";

const Home = () => {
  const dispatch = useDispatch();
  const alldata = useSelector((store) => store.homePageReducer);
  const [page, setPage] = useState(1);
  // const [Data, setData] = useState([]);
  // const [check, setCheck] = useState("")
  // setData(alldata.alldata);
  // console.log(Data)
  console.log(alldata)
  useEffect(() => {
      getData();
   
  }, [page, alldata.findName, alldata.sbrand,alldata.sminPrice,alldata.smaxPrice,alldata.shdiscount,alldata.shrating,alldata.srating,alldata.scategory,alldata.rating]);
  
   async function getData() {
    dispatch(getHomeDataLoading());
    dispatch(pageUpdate(page));
    dispatch(getHomeDataLoading());
    await axios.get(alldata.Url()).then(({ data }) => {
       console.log(data , "it is from here")
      dispatch(getHomeData(data));

      //this is for updating cart
      axios.get(`${env.BASE_URL}/addToCart`).then(({data})=>{
        dispatch(addCartDetail(data));
        //console.log(data)
        dispatch(cartDataLoading(true));
      })
      .catch((err)=>{console.log(err);})


    });
  }
  console.log(alldata);
  return (
    <>
      {alldata.loading ? (
        <div>
          <Category/>
          <div className="Maincontainer">
          
            <Sidebar />

            <div className="rightcontainer">
              {alldata.alldata.map((e) => (
                <Product
                  product={{
                    name: e.ProductName,
                    image: e.image[0],
                    Newprice:e.newPrice,
                    Oldprice :e.oldPrice,
                    discount :e.discount,
                    rating:e.rating,
                    stock:e.stock,
                    Id:e._id,
                    reveiws:e.numOfReviews
                  }}
                />
              ))}
            </div>
          </div>

          <div className="pagination">
            <Stack spacing={1}>
              <Pagination
                count={alldata.totalPage}
                color="secondary"
                default={page}
                onChange={(event, value) => {
                  setPage(value);
                }}
              />
            </Stack>

          </div>
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default memo(Home);
