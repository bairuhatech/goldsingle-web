const API = {
  BASE_URL: "https://server.bairuhatech.com/gold-single/",
  // BASE_URL: "http://localhost:8000/",

  //GOOGLE API
  GOOGLE_API: "https://maps.googleapis.com/maps/api/",
  GET_LOCATION: "https://maps.googleapis.com/maps/api/geocode/json",
  GET_AUTOCOMPLETE:
    "https://maps.googleapis.com/maps/api/place/autocomplete/json",
  SEARCH_PLACE: "",
  GGL_TOKEN: "AIzaSyBS17KiJVZWcPh0dLI9KKqVTcnUYwYp3PQ",

  IMAGE_COMPRESS: "img_compress/compress",
  FILE_UPLOAD: "img_compress/file",

  LOGIN_EMAIL: "auth/login", //POST
  LOGIN_PHONE: "auth/phone-login", //POSTdfsd
  LOGIN_GMAIL: "auth/google-login", //POST
  SIGNUP: "auth/signup", //POST

  SELLER_LOGIN: "seller/login", //POST
  SELLER_SIGNUP: "seller/signup", //POST

  VERIFY_MAIL: "Auth/verify/",
  RESEND_MAIL: "Auth/resend_verify/",
  REQUEST_RESET: "Auth/reset-password",

  // HOME SCREEN , CATEGORIES, SUB-CATEGORIES, BANNERS, OFFER-BANNERS
  GET_HOMESCREEN: "landing/", // GET

  // PRODUCT SEARCH
  PRODUCT_SEARCH: "product_search/",
  PRODUCT_RECOMMENDATIONS: "",
  PRODUCT_TRENDING: "",
  PRODUCT_BEST_SELL: "",
  PRODUCT_BYCATEGORY: "",
  PRODUCT_DETAILS: "",
  PRODUCT_REVIEWS: "",
  PRODUCT_SEARCH_MULTI: "product_search/search?type=multi&", //product search for multi
  PRODUCT_SEARCH_SINGLE: "product_search/search?type=single&", //product search for single

  // STORE SEARCH
  STORE_SEARCH_SEARCH: "store_search/search", //product search inside a single store
  STORE_SEARCH_GETINFO: "store_search/info/", //to get all details and subcategories of a store.
  STORE_SEARCH_GETALL: "store_search/all/", //to get all products in a store grouped by subcategory
  STORE_SEARCH_BYCATEGORY: "store_search/store/subcategory", //to get all products in a store for a single subcategory
  STORE_SEARCH_BYSUBCATEGORY: "store_search/subcategory", //get all products for a subc grouped by store
  // STORE PRODUCT BANNERS API
  BANNER_ALL: "banner/all", //GET  page=page&take=pageSize
  BANNER: "banner/", //POST,PUT,DELETE

  // BUSINESS TYPE API
  BUSINESS_TYPE: "businesstype/", //POST,PUT,DELETE

  //STATES API
  STATES: "states/", //POST,PUT,DELETE

  //DELIVERY_CHARGE
  DELIVERY_CHARGE: "deliverycharge/", //POST,PUT,DELETE
  DISTANCE_CHARGE: "distancecharge/", //POST,PUT,DELETE
  WEIGHT_CHARGE: "weightcharge/", //POST,PUT,DELETE
  LBH_CHARGE: "lbhcharge/", //POST,PUT,DELETE

  // STORE PRODUCT CATEGORY API

  //

  CATEGORY_ALL: "category/all", // GET all
  CATEGORY: "category/", //delete,put,post
  SUB_CATEGORY: "subCategory/all", // GET all
  SUB_CATEGORY_EDIT: "subCategory/",
  OFFERS: "offers/",

  // ROLE CONFIGURATION
  ROLES_LIST: "roles/all/", //GET
  ROLES_ADD: "roles/create", //POST
  ROLES_DELETE: "roles/delete/", //DELETE

  USER_CONFIG_USERS: "user", //
  USER_COINFIG_UPDATE: "user/role/update/",
  USER_DEACTIVATE: "user/deactivate/", //deactivate user's account
  USER_CHANGE_PASSWORD: "user/update-password/", //to change user password
  USER_ADDNEW_PASSWORD: "user/add-password/", //to ADD NEW user password
  USER_PHOTO_UPDATE: "user/update-photo/", //to add new photo
  USER_CONFIG_INVITE_MAIL: "menus/sendInvite",
  ROLES_CONFIG_MENUS: "rolesConfig/",
  ROLES_CONFIG_UPDATE: "rolesConfig/",
  USER_VERIFY_EMAIL: "auth/verify-email", //POST verifies the token

  //Menu Configaration
  MENU_CONFIG: "menus/list", //Get with pagination page=page&take=pageSize
  MENU_CONFIG_All: "menus/all", //Get
  MENU_CONFIG_ADD: "menus/create", //Post
  MENU_CONFIG_DELETE: "menus/", //Delete :id

  //ROLE ASSIGN
  ROLE_ASSIGN_MENU: "rolesConfig/create", //post

  CART: "cart/", //post,put,delete
  CART_GET: "cart/user/", //get byuserID
  ADDRESS: "address/", //post,put,delete
  ADDRESS_GET: "address/all/", //get byuserID
  WISHLIST: "wishlist/", //get,post,put,
  PRODUCT_REVIEW: "productsReviews/",

  //SETTINGS,
  SETTINGS: "settings/",

  CORPORATE_STORE_CREATE: "coorporate_store/create", //post
  CORPORATE_STORE_GETALL: "coorporate_store/pgn", //get
  CORPORATE_STORE_GETBYID: "coorporate_store/by_user/", //getbyid
  CORPORATE_STORE_UPDATE_STATUS: "coorporate_store/status/", //put
  CORPORATE_STORE_REQUEST_DOCUMENT: "coorporate_store/send_mail", //post
  CORPORATE_SELLER_GETALL: "coorporate_store", // PUT

  INDIVIDUAL_STORE_CREATE: "individual_seller/create", //post
  INDIVIDUAL_STORE_GETALL: "individual_seller/pgn", //get
  INDIVIDUAL_STORE_GETBYID: "individual_seller/", //getbyid
  INDIVIDUAL_STORE_UPDATE_STATUS: "individual_seller/status/", //put
  INDIVIDUAL_STORE_REQUEST_DOCUMENT: "individual_seller/send_mail", //post
  STORE_CREATE: "store/create",

  // user--------------------------
  USER_EMAIL_UPDATE: "user/update-email", // update email/
  USER_PHONENUMBER_UPDATE: "user/update-Phone", //  update phone==
  USER_NAME_UPDATE: "user/update-name", // update name===
  // get user----------------
  USER_GET: "user/",
  USER_EMAIL_VERIFY: "auth/email-verify", // verify email/

  //orders
  ORDER: "order/", //post
  ORDER_GET: "order/all/",
  ORDER_GETONE: "order/get_one/", //get one
  ORDER_GET_BYSTORE: "order/store/",
  ORDER_ITEMS_GET: "orderItems/all/",
  ORDER_STATUS_GET: "orderStatus/all/",
  ORDER_STATUS_UPDATE: "order/update_status", //post

  PAYMENT_GET: "payments/all/",

  //PRODUCTS
  PRODUCTS: "products/all", // GET all,
  PRODUCTS_BYSTORE: "products/bystore", // GET all,
  PRODUCTS_CREATE: "products/create", //create
  PRODUCTS_ALL: "products/all/",
  PRODUCTS_ADD: "products/",
  PRODUCTS_GETONE: "products/item/",
  PRODUCTS_DELETE: "products/delete", //delete
  PRODUCTS_UPDATE: "products/update/", //update
  PROUCTS_IMAGE_UPDATE: "products/update_image/", //update images
  PRODUCT_STATUS_UPDATE: "products/update_status/", //update status
  PRODUCT_STATUS: "",
  PRODUCT_UPDATE_DETAILS: "",
  PRODUCT_UPDATE_VARIANTS: "",
  PRODUCT_VARIANT_ADD: "productvariant/add_variants", //add variants[]
  PRODUCT_VARIANT_DELETE: "productvariant/delete/", //delete variant
  // ENQUIRY ------------
  ENQUIRY_CREATE: "Enquiry/post", // Post
  ENQUIRY_GET: "Enquiry/get",
};
export default API;
