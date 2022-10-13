
const init = {
	loading:false,
	data:[],
	error:false
}

export const getDataReducer = (store=init, {type,payload})=>{
	switch (type){
		case "GET_DATA_LOADING":
			return {...store, loading:false}
		case "GET_DATA":
			return {...store,loading:true,data:[...payload]}
		default:
			return store;
	}
}

