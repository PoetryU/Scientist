
var obj= {
  "productId": "com.readdle.ReaddleDocsIPad.subscription.year50_upd_user",
  "subscriptionExpirationIntent": "userCancelled",
  "receiptStatus": "ok",
  "subscriptionExpirationDate": "17:48 25/11/2099",
  "inAppStates": [
    {
      "productId": "com.readdle.ReaddleDocsIPad.subscription.year50_upd_user",
      "subscriptionExpirationIntent": "userCancelled",
      "receiptStatus": "ok",
      "subscriptionExpirationDate": "17:48 25/11/2019",
      "isEligibleForIntroPeriod": false,
      "originalTransactionId": "20000625420102",
      "productName": "subscription",
      "isInBillingRetryPeriod": false,
      "type": "subscription",
      "subscriptionState": "active",
      "subscriptionAutoRenewStatus": "autoRenewOff",
      "isInGracePeriod": false
    },
    {
      "originalTransactionId": "0000",
      "entitlements": [
      ],
      "type": "custom purchase",
      "productId": "documents6-user"
    }
  ],
  "isDocuments6User": true,
  "isEligibleForIntroPeriod": false,
  "originalTransactionId": "20000625420102",
  "isEligibleFor": [
    "winback"
  ],
  "isInBillingRetryPeriod": false,
  "type": "subscription",
  "inAppPurchased": [
    "com.readdle.ReaddleDocsIPad.subscription.year50_upd_user"
  ],
  "bundleId": "com.readdle.ReaddleDocsIPad",
  "receiptId": 1530908572000,
  "chargingPlatform": "iOS AppStore",
  "subscriptionState": "active",
  "subscriptionAutoRenewStatus": "autoRenewOff",
  "isInGracePeriod": false
};
$done({body: JSON.stringify(obj)});

