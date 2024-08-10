export enum ErrorCode {
  E999999 = 999999, // Other exception
  E999422 = 999422, // Validator invalid
  E999401 = 999401, // Unauthorized
  E999403 = 999403, // Forbidden
  E999404 = 999404, // URL API invalid
  E999405 = 999405, // You don't have permission
  E999001 = 999001,
  E100001 = 100001, // invalid signature
  E100002 = 100002,
  E100999 = 100999,

  E200001 = 200001, // User has not found

  /* ASSETS */
  E300001 = 300001, // Asset has not found

  /* OFFER */
  E400001 = 400001, // Offer has not found
  E400002 = 400002, // Offer has already exists
  E400003 = 400003, // Offer can not be edited
  E400004 = 400004, // Seller has not submitted code

  /* ORDER */
  E500001 = 500001, // Order has not found
  E500002 = 500002, // Order has linked this offer

  /* REPORT */
  E600001 = 600001, // Report has not found
  E600002 = 600002, // Report has already exists
}
