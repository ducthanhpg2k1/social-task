export const ROUTE_PATH = {
  HOME: "/",
  DASHBOARD: "/",
  TICKETS: "/tickets",
  ABOUT: "/about",
  MY_PURCHASE: "/my-profile",
  PHONE_NUMBER: "/phone-number",
  TELEGRAM_HANDLE: "/telegram-handle",
  MY_ASSETS: "/my-profile",
  MY_PROFILE: "/my-profile",
  PRODUCT: (id?: number | string) => (id ? `/product/${id}` : "/product"),
  USERS: "/users",
  OFFERS: "/offers",
  ORDERS: "/orders",
  SIGN_IN:'/sign-in'
};
