// 2023-02-11 22:30

if (!$response.body) $done({});
let obj = JSON.parse($response.body);

if (obj.result) {
  obj.result.svip_given = 365;
  obj.result.is_phone_verified = true;
  obj.result.is_xy_vip = true;
  obj.result.vip_expired_at = 4030000000.16;
  obj.result.is_vip = true;
  obj.result.xy_svip_expire = 4030000000.16;
  if (obj.result.wt) {
    if (obj.result.wt.vip) {
      obj.result.wt.vip.enabled = true;
      obj.result.wt.vip.expired_at = 4030000000.16;
      obj.result.wt.vip.svip_expired_at = 4030000000.16;
    }
    obj.result.wt.svip_given = 365;
  }
  obj.result.is_primary = true;
  obj.result.xy_vip_expire = 4030000000.16;
  obj.result.svip_expired_at = 4030000000.16;
  obj.result.vip_type = "s";
}

$done({ body: JSON.stringify(obj) });