var obj = JSON.parse($response.body);
let url = $request.url;
var cons = "users/info";
if(url.indexOf(cons) != -1)
{
obj.data.VIPExpire= "09/09/9999 00:00:00";
obj.data.isVIP= true;
}
$done({body: JSON.stringify(obj)});
