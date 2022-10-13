

const init = {
	AddressData:[],
	loading:false,
  addingStatus:false
};

export const AddressDataReducer = (store = init, { type, payload }) => {
  switch (type) {
    case "ADD_USER_ADDRESS":
      return {...store,AddressData:[...payload.shippingAddress],loading:true};
    case "NEW_ADDRESS_ADDED":
      return {...store, addingStatus:true}
    default:
      return store;
  }
};