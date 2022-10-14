import {createStore, combineReducers,applyMiddleware} from 'redux';
import {CounterReducer} from "./reducers/counterReducer";
import {getDataReducer} from "./reducers/getDataReducer";
import {homePageReducer} from "./reducers/homePageReducer";
import {UserDataReducer} from "./reducers/userDataReducer";
import {CartDataReducer} from "./reducers/cartDataReducer";
import {ProductDetailReducer} from "./reducers/productDetailReducer";
import {AddressDataReducer} from "./reducers/addressDataReducer";
import {OrderDataReducer} from "./reducers/orderDataReducer";
import thunk from "redux-thunk";
import {persistStore,persistReducer} from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
	key:"persist-key",
	storage
}


export const rootReducer = combineReducers({
	CounterReducer,
	getDataReducer,
	homePageReducer,
	UserDataReducer,
	CartDataReducer,
	ProductDetailReducer,
	AddressDataReducer,
	OrderDataReducer
});

//const PersistReducer = persistReducer(persistConfig,rootReducer)
const persistedReducer = persistReducer(persistConfig, rootReducer)
const Store = createStore(
	// persistedReducer,
	rootReducer,
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
	// applyMiddleware(thunk)
);

const persistore = persistStore(Store);

export {persistore,Store};