

const init = {
	AddressData:[],
	loading:false,
  addingStatus:false,
  selectedAddress:{}
};

export const AddressDataReducer = (store = init, { type, payload }) => {
  switch (type) {
    case "ADD_USER_ADDRESS":
      return {...store,AddressData:[...payload.shippingAddress],loading:true};
    case "NEW_ADDRESS_ADDED":
      return {...store, addingStatus:true}
    case "SELECTED_ADDRESS":
      return {...store,selectedAddress:payload}
    default:
      return store;
  }
};