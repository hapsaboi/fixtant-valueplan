const BackEnd = process.env.REACT_APP_BackEndHostLocal;
export const product = {
	//takes in a body with data
	//data :  
	// {
	// 	"product_name":"Tecno Camon CX",
	// 	"product_desc":"This product is a product",
	// 	"status":"true",
	// 	"brand":"Tecno",
	// 	"variations":[{"variation":"Black-64GB","buying_price":10000,"selling_price":20000}],
	// 	"store":"Hanis Store"
	// }
	addProduct: `${BackEnd}/api/product/add_product`,
	//---------------------------------------------------------------------------------------------------

	//data : store
	// {
	// 	"store":"Hanis Store"
	// }
	showStoreProducts: `${BackEnd}/api/product/show_store_products`,
	//---------------------------------------------------------------------------------------------------
	
	//data : product in JSON format
	// {
	// 	 -----
	// }
	updateProduct: `${BackEnd}/api/product/update_product`,
	//---------------------------------------------------------------------------------------------------

	
	//data : product in JSON format
	// {
	// 	 -----
	// }
	updateInventory: `${BackEnd}/api/product/update_inventory`,
	//---------------------------------------------------------------------------------------------------
};

export const order = {
	//take in a body with data
	//data :  
	addOrder: `${BackEnd}/api/order/add_order`,
	//---------------------------------------------------------------------------------------------------

	showOrders: `${BackEnd}/api/order/show_orders`,
	//---------------------------------------------------------------------------------------------------

	showAllOrders: `${BackEnd}/api/order/show_all_orders`,
	//---------------------------------------------------------------------------------------------------
	
};


export const user = {
	editProfile: `${BackEnd}/api/user/edit_profile`,
	showAllUsers: `${BackEnd}/api/user/show_all_users`
};

export const code = {
	checkCode: `${BackEnd}/api/code/checkcode`,
	showAllUsers: `${BackEnd}/api/user/show_all_users`
};

export const authenticate = {
	//takes in token as http cookie
	//data : [verifyToken]
	verifyAcct: `${BackEnd}/api/user/verifyAccount/`,

	//takes in password + token as http cookie
	//data : [verifyToken]
	passwordReset: `${BackEnd}/api/user/passwordReset/`,

	//takes http cookie token and checks if a user is logged in
	//data : requires token to be set - user login
	loggedIn: `${BackEnd}/api/user/loggedIn`,

	//sends a reset link to specified user email
	//data : email
	forgotPassword: `${BackEnd}/api/user/forgotPassword`,

	//destroys cookie
	logout: `${BackEnd}/api/user/logout`,

	//destroys cookie
	addUser: `${BackEnd}/api/user/add_user`,
	
	//give logged in user data
	getUserData: `${BackEnd}/api/auth/user`,

	//---------
	userAuth: `${BackEnd}/api/auth`
};
