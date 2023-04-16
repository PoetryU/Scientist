/*
***************************
QuantumultX:
[rewrite_local]
^https:\/\/buy\.itunes\.apple\.com\/verifyReceipt url script-response-body https://raw.githubusercontent.com/PoetryU/Scientist/master/Scripts/iShot.js
[mitm]
hostname = buy.itunes.apple.com

***************************
Surge4 or Loon:
[Script]
http-response ^https:\/\/buy\.itunes\.apple\.com\/verifyReceipt script-path=https://raw.githubusercontent.com/PoetryU/Scientist/master/Scripts/iShot.js, requires-body=true, tag=iShot
[MITM]
hostname = buy.itunes.apple.com
*/

let obj = JSON.parse($response.body);
var bundle_id = obj.receipt["bundle_id"];
if (bundle_id == "cn.better365.ishot") {
    obj = {
        status: 0,
        environment: "Production",
        receipt: {
            receipt_type: "Production",
            adam_id: 1485844094,
            app_item_id: 1485844094,
            bundle_id: "cn.better365.ishot",
            application_version: "2.3.3",
            download_id: 36078545027353,
            version_external_identifier: 854633626,
            receipt_creation_date: "2023-03-20 10:41:24 Etc/GMT",
            receipt_creation_date_ms: "1679308884000",
            receipt_creation_date_pst: "2023-03-20 03:41:24 America/Los_Angeles",
            request_date: "2023-03-20 10:41:27 Etc/GMT",
            request_date_ms: "1679308887959",
            request_date_pst: "2023-03-20 03:41:27 America/Los_Angeles",
            original_purchase_date: "2020-08-21 02:56:38 Etc/GMT",
            original_purchase_date_ms: "1597978598000",
            original_purchase_date_pst: "2020-08-20 19:56:38 America/Los_Angeles",
            original_application_version: "1.1.8",
            in_app: [
                {
                    quantity: "1",
                    product_id: "ishotfeixuqidingyue20220212",
                    transaction_id: "160001146523849",
                    original_transaction_id: "160001146523849",
                    purchase_date: "2022-02-10 11:48:31 Etc/GMT",
                    purchase_date_ms: "1644493711000",
                    purchase_date_pst: "2022-02-10 03:48:31 America/Los_Angeles",
                    original_purchase_date: "2022-02-10 11:48:34 Etc/GMT",
                    original_purchase_date_ms: "1644493714000",
                    original_purchase_date_pst: "2022-02-10 03:48:34 America/Los_Angeles",
                    expires_date: "2099-09-10 23:17:57 Etc/GMT",
                    expires_date_ms: "4092736677000",
                    expires_date_pst: "2099-09-10 16:17:57 America/Los_Angeles",
                    web_order_line_item_id: "160000491977903",
                    is_trial_period: "true",
                    is_in_intro_offer_period: "false",
                }
            ]
        },
        latest_receipt_info: [
            {
                quantity: "1",
                product_id: "ishotfeixuqidingyue20220212",
                transaction_id: "160001146523849",
                original_transaction_id: "160001146523849",
                purchase_date: "2022-02-10 11:48:31 Etc/GMT",
                purchase_date_ms: "1644493711000",
                purchase_date_pst: "2022-02-10 03:48:31 America/Los_Angeles",
                original_purchase_date: "2022-02-10 11:48:34 Etc/GMT",
                original_purchase_date_ms: "1644493714000",
                original_purchase_date_pst: "2022-02-10 03:48:34 America/Los_Angeles",
                expires_date: "2099-09-10 23:17:57 Etc/GMT",
                expires_date_ms: "4092736677000",
                expires_date_pst: "2099-09-10 16:17:57 America/Los_Angeles",
                web_order_line_item_id: "160000491977903",
                is_trial_period: "true",
                is_in_intro_offer_period: "false",
            }
        ],
        latest_receipt: "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",
        pending_renewal_info: [
            {
                auto_renew_product_id: "ishotfeixuqidingyue20220212",
                product_id: "ishotfeixuqidingyue20220212",
                original_transaction_id: "160001146523849",
                auto_renew_status: "1"
            }
        ]
    };
}
$done({body: JSON.stringify(obj)});