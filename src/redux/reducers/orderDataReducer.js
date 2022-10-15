

const init = {
	OrderData:"",
	loading:false,
  selectedAddress:{},
  totalAmt:function(){
    let total = 0;
    this.OrderData.forEach((el)=>{
      total += Number(el.Newprice) * Number(el.quantity);
    })
    if(total<1000){
      total = total + 80;
    }
    return total;
  },
  allOrderedItems:[]
};

export const OrderDataReducer = (store = init, { type, payload }) => {
  switch (type) {
    case "ADD_ORDER_ITEM":
		  return {...store,OrderData:payload};
    case "ADD_ORDERED_ITEMS":
      return {...store,allOrderedItems:[...payload]}
    default:
      return store;
  }
};