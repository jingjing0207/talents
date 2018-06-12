/**
 * Created by jet on 2017/12/11.
 */
$(function(){
    var interviewId=getUrlParam('interview')
    var jsonData = {};
    jsonData.id = interviewId;
    console.log(interviewId)
    var toStr = JSON.stringify(jsonData);
    console.log(toStr)
    var ob=JSON.parse(toStr)
    console.log(ob)
    var pathOne,realpathOne
    function getUrlParam(name){
        var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if(r!=null)return  decodeURI(r[2]); return null;
    }
    function toUtf8(str) {   //地址中可用中文字符
        var out, i, len, c;
        out = "";
        len = str.length;
        for(i = 0; i < len; i++) {
            c = str.charCodeAt(i);
            if ((c >= 0x0001) && (c <= 0x007F)) {
                    out += str.charAt(i);
                } else if (c > 0x07FF) {
                out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));
                out += String.fromCharCode(0x80 | ((c >>  6) & 0x3F));
                out += String.fromCharCode(0x80 | ((c >>  0) & 0x3F));
            } else {
                out += String.fromCharCode(0xC0 | ((c >>  6) & 0x1F));
                out += String.fromCharCode(0x80 | ((c >>  0) & 0x3F));
            }
        }
        return out;
    }
    // http://120.78.184.120:9002
    $.ajax({
        url : "https://www.hunterai.cn/api/jobDetailOrder/getInterviewQRCode?reqId="+interviewId,
        type : "post",
        contentType : "application/json;charset=UTF-8",
        success :function(data){
            console.log(data);
            $(".interviewName").html(data.name);
            $(".companyName").html(data.companyName);
            $(".interviewTime").html(data.interviewTime);
            $(".companyAddress").html(data.companyAddress);
            pathOne=data.interviewUrl
            console.log(pathOne)
            realpathOne=toUtf8(pathOne)
            $("#qrOne").qrcode({
                render:"canvas",
                text : realpathOne,
                width : 100,
                height :100,
                background: "#ffffff",
                foreground: "#000000"
            });
            jQuery("#QR").qrcode({
            })
        },
        error :function(err){
            console.log(err);
            $(".errorText").css("display","block")
            if(err.status === 400){
                $("#errorTextone").html('候选人发送约面操作失败：');
                $("#errorTexttwo").html('候选人订单已关闭');
            }else if(err.status === 0){
                $('#errorTexttwo').html('服务器出错，请检查请求参数！');
                $('#errorTexttwo').css({fontSize:"26px",textIndent:'36PX'})
            }
        }
    })


})