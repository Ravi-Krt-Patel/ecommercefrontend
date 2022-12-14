import env from "react-dotenv";
import axios from "axios";
import {useState, useEffect} from "react";
import {addCategory,addSearchCategory,removeSearchCategory} from "../redux/action/getDataAction";
import {useSelector,useDispatch} from "react-redux";

export const Category = ()=>{
	const dispatch = useDispatch();
	const categoryData = useSelector(store=>store.homePageReducer);
	useEffect(()=>{
		getCategory()
	},[])

	function getCategory(){
		axios.get(`${env.BASE_URL}/brandCategory`).then(({data})=>{
			dispatch(addCategory(data))
		  }).catch((err)=>{console.log(err);})
	}

	return (<>
	<div className="">
		<button type="button" class="btn btn-primary m-1" onClick={()=>{
			dispatch(removeSearchCategory())
		}}>
          Category 	&#62;&#62;&#62;
        </button>
        {categoryData.category.map((el)=>(<>
			<button type="button" class={categoryData.scategory==el.category?"btn btn-danger m-1":"btn btn-warning m-1"} onClick={()=>{

                dispatch(addSearchCategory(el.category))

				// if(categoryData.scategory.length !==0){
				// 	dispatch(removeSearchCategory())
				// }else{
					
				// }
				
			}} >
                  {el.category}
            </button>
		</>))}
        {/* <button type="button" class="btn btn-secondary m-1">
          Secondary
        </button>
        
        <button type="button" class="btn btn-danger m-1">
          Danger
        </button>
        <button type="button" class="btn btn-warning m-1">
          Warning
        </button>
        <button type="button" class="btn btn-info m-1">
          Info
        </button> */}
      </div>
	</>)
}