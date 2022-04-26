/*
微信公众号：ios黑科技
官方网站：s7aa.cn

圈X:

[rewrite_local]

通用订阅解锁
^https:\/\/buy\.itunes\.apple\.com\/verifyReceipt$ url script-response-body sub.js

[mitm]
hostname = buy.itunes.apple.com



*/


let body= $response.body;
var obj = JSON.parse(body);
if (body.indexOf("expires") !=-1) {
  obj["receipt"]["in_app"][0]["expires_date"] = "2099-09-09 20:12:02 Etc/GMT";
  obj["receipt"]["in_app"][0]["expires_date_pst"] = "2099-09-09 12:12:02 America/Los_Angeles";
  obj["receipt"]["in_app"][0]["expires_date_ms"] = "4092647115000";
  obj["receipt"]["in_app"][0]["is_trial_period"] = "false";
  obj["receipt"]["in_app"][0]["is_in_intro_offer_period"] = "false";
  obj["receipt"]["in_app"][0]["in_app_ownership_type"] = "PURCHASED";
  obj["latest_receipt_info"][0]["expires_date"] = "2099-09-09 20:12:02 Etc/GMT";
  obj["latest_receipt_info"][0]["expires_date_pst"] = "2099-09-09 12:12:02 America/Los_Angeles";
  obj["latest_receipt_info"][0]["expires_date_ms"] = "4092647115000";
  obj["latest_receipt_info"][0]["is_trial_period"] = "false";
  obj["latest_receipt_info"][0]["is_in_intro_offer_period"] = "false";
  obj["latest_receipt_info"][0]["in_app_ownership_type"] = "PURCHASED";
  }
$done({body: JSON.stringify(obj)});
