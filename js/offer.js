/**
 * Created by jet on 2017/12/11.
 */
$(function(){
    function getUrlParam(name){
        var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if(r!=null)return  decodeURI(r[2]); return null;
    }
    $.ajax({
        url : "https://www.hunterai.cn/api/jobDetailOrder/OfferForH52/"+getUrlParam("offer"),
        type : "get",
        contentType : "application/json",
        success :function(data){
            // console.log(data);
            // $(".candidateName em").html(data.candidateName);
            // $(".department em").html(data.department);
            // $(".position em").html(data.position);
            // $(".workplace em").html(data.workplace);
            // $(".leader em").html(data.leader);
            // $(".salary em").html(data.salary+"元/月");
            // $(".probationSalary em").html(data.probationSalary+"元/月");
            // var date =new Date(data.reportDutyTime);
            // $(".reportDutyTime em").html($.format.date(date, "yyyy-MM-dd HH:mm"));
            // $(".contractPeriod em").html(data.contractPeriod+"年");
            // $(".probationPeriod em").html(data.probationPeriod+"个月");
            $('#offer').html(data.content)
            var liLength=$('.cailiao li input')
            var liArr=[]
            for(let i=0;i<liLength.length;i++){
                liArr.push(liLength[i].attributes[2].value)
            }
            $('.cailiao li').remove()
            for(let j=0;j<liArr.length;j++){
                let appendHtml='<p>'+(j+1)+'. '+ liArr[j]+'</p>'
                $('.cailiao').append(appendHtml)
                $('.cailiao p').css({textIndent:'0.2rem',fontSize:'14px',color:'#000'})
            }
            var areaLength=$('.shenming-input li textarea')
            let arr=[]
            for(let i=0;i<areaLength.length;i++){
                arr.push(areaLength[i].attributes[4].value)
            }
            $('.shenming-input li').remove()
            for(let j=0;j<arr.length;j++){
                let appendHtml='<p>'+(j+1)+'. '+ arr[j]+'</p>'
                $('.shenming-input').append(appendHtml)
            }
            $('.curent-input').attr('readonly','readonly')
            jQuery("#QR").qrcode({
                render:"canvas",
                text : data.id,
                width : 100,
                height :100,
                background: "#ffffff",
                foreground: "#f09"
            })
            getInputLength()
        },
        error :function(err){
            console.log("sb")
            console.log(err);
            $(".nullData").css("display","block")
        }
    })
    function getInputLength() {
        let brr=$('input')
        var testLength
        brr.each(function(){
            testLength=$(this).attr('value').length
            $(this).css('width', testLength*14 + 'px')
        });
    }
})