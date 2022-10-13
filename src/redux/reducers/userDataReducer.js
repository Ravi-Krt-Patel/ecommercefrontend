const init = {
	UserEmail:"",
	UserRole:"",
	UserId:"",
	UserName:"",
  status:false
};

export const UserDataReducer = (store = init, { type, payload }) => {
  switch (type) {
    case "ADD_USER_DETAIL":
      return { ...store,UserEmail:payload.user.email,UserRole:payload.user.role, UserId:payload.user._id,UserName:payload.user.name,status:true};
    case "REMOVE_USER_LOGOUT":
      return {...store,UserEmail:"",UserRole:"",UserName:"",UserId:"",status:false};
    default:
      return store;
  }
};
