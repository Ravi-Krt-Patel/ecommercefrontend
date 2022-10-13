
export const CounterReducer = ( store={count:10} , action)=>{

	switch (action.type) {
		case "INC_COUNT":
			return {...store,count:store.count+action.payload}
		case "DEC_COUNT":
			return {...store, count:store.count - action.payload}
		default:
			return store;
	}
}