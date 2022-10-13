
import env from "react-dotenv";

const init = {
	loading:false,
	alldata:[],
	pageNo:1,
	error:false,
	totalPage:0,
	brand:[],
	sbrand:[],
	srating:[],
	sldiscount:0,
	shdiscount:0,
	minPrice:0,
	sminPrice:0,
	maxPrice:0,
	smaxPrice:0,
	findName:"",
	Url:function(){
		let fUrl = `${env.BASE_URL}/product/search?`;
		fUrl = fUrl+"page=" + this.pageNo + "&";
		if(this.sbrand.length !==0){
			for(let i=0; i<this.sbrand.length; i++){
				// fUrl = `${fUrl}b${i}=${this.brand[i]}&`
				fUrl = fUrl + "b" + i +"=" + this.sbrand[i] + "&"; 
			}
		}
		if(this.srating.length !==0){
			for(let i=0; i<this.srating.length; i++){
				fUrl = fUrl + "r"+i+"="+this.srating[i] + "&";
			}
		}
		if(this.findName.length !==0){
			fUrl = fUrl + "name=" + this.findName+"&";
		}
		if(this.sminPrice !==0 && this.smaxPrice !==0){
			fUrl = fUrl + "lprice="+this.sminPrice +"&"+"hprice="+this.smaxPrice+"&";
		}
		if(this.sldiscount !==0 && this.shdiscount !==0){
			fUrl = fUrl + "d1="+this.sldiscount+"&"+"d2="+this.shdiscount + "&"
		}
		return fUrl;
	}

}




export const homePageReducer = (store=init, {type,payload})=>{
	switch (type){
		case "GET_HOME_LOADING":
			return {...store, loading:false}
		case "GET_HOME_DATA":
			return {...store,loading:true,alldata:[...payload.productData],totalPage:payload.totalPageCount,brand:payload.totalBrand,minPrice:payload.lowPrice,maxPrice:payload.highPrice}
		case "PAGE_UPDATE":
			return{...store,loading:false,pageNo:payload}
		case "ADD_SEARCH_TEXT":
			return {...store,findName:payload,pageNo:0,sbrand:[],srating:[],
				sminPrice:0,smaxPrice:0,sldiscount:0,shdiscount:0}
		case "ADD_BRAND":
			return {...store,sbrand:[...store.sbrand,payload]}
		case "REMOVE_BRAND":
			return {...store ,sbrand:store.sbrand.filter((el)=>el!== payload)}
		case "ADD_PRICE_RANG":
			return {...store,sminPrice:Number(payload.lowPrice),smaxPrice:Number(payload.highPrice)}
		case "ADD_DISCOUNT_RANG":
			return {...store,sldiscount:payload.LD,shdiscount:payload.HD}
		case "ADD_RATING":
			return {...store,srating:[...store.srating,payload]}
		case "REMOVE_RATING":
			return {...store,srating:store.srating.filter((el)=>el !== payload)}
		default:
			return store;
	}
}
