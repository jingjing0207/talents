/**
 * Created by jet on 2017/12/11.
 */
$(function(){
    var actionID = getUrlParam("resume");
    function getUrlParam(name){
        var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if(r!=null)return  decodeURI(r[2]); return null;
    }
    $.ajax({
        url :"https://www.hunterai.cn/api/human/resumeForH5/"+actionID,
        type : "get",
        timeout : 9999999999999,
        contentType : "application/json",
        success : function(data){
            console.log("data")
            console.log(data);
            $("#name").html(data.name);
            $(".title .sex").html(data.gender+" | "+data.maritalStatus+" | "+data.city);
            $(".title .address").html(data.education+" | "+data.targetWorkPlace+" | "+data.workYears+"年工作经验");
            $(".headPortrait img.head").attr("src",data.avatar);
            $('.jobIntension .jobNature label').html(data.jobNature);
            $('.jobIntension .industry label').html(data.industry);
            $('.jobIntension .expectedSalary label').html(data.expectedSalary);
            $('.jobIntension .jobStatus label').html(data.jobStatus);
            $('.title .jobStartTime label').html(new Date(data.workStartTime).getFullYear()+' 年'+new Date(data.workStartTime).getMonth()+' 月');
            // let curentReg=/\n/g
            if(data.workExperience){
                // console.log(data.workExperience)
                let workExperience = data.workExperience.replace(/\n/g,'<br/>');
                $('.workExperience p').html(workExperience);
            }
            if(data.selfEvaluation){
                let selfEstimate = data.selfEvaluation.replace(/\n/g,"<br/>");
                $('.selfEstimate p').html(selfEstimate);
            }
            $('.education p.graduateSchool').html(data.educationExperience);
            if(data.projectExperience){
                let projectExperience = data.projectExperience.replace(/\n/g,"<br/>");
                $('.projectExperience p').html(projectExperience);
            }
            $('.language p.languageAbility label').html(data.languageAbility);
             if(data.workSkills){
                 let workSkills = data.workSkills.replace(/\n/g, "<br/>");
                 $('.language p.workSkills label').html("<br/>"+workSkills);
             }
        //    存储后台返回的ID
            localStorage.setItem("needID",data.id);
        },
        complete : function(XMLHttpRequest,status){ //请求完成后最终执行参数
            if(status=='timeout'){//超时,status还有success,error等值的情况
                ajaxTimeOut.abort(); //取消请求
                alert("超时");
                msgAlert("fail","请求超时！");
            }
        },
        error : function(err){
            console.log(err);
        }
    })
    $(".print").on("click",function(){
        var needID = {"id" : actionID};
        needID = JSON.stringify(needID);
        $.ajax({
            url :"https://www.hunterai.cn/api/jobDetailOrder/waitInterview",
            type : "post",
            data : needID,
            contentType : "application/json",
            success : function(data){
                msgAlert("success","打印成功！");
                window.print();
            },
            error :function(err){
                console.log(err);
            }
        })
    })
    $(".sendoffer").on("click",function(){
        let inputVal='';
        $(".input-b").val('')
        $(".modal_container").show();

        $(".input-b").blur(function(){
            var mailStr=$(this).val();
            var reg =/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;
            if(mailStr!=""){
                if(reg.test(mailStr)){
                    $(this).next("#corentMail").html("");
                    $(this).css("border","1px solid #67C23A");
                    $(".modal_btn_bg1").on("click",function(){
                        inputVal=$(".input-b").val();
                        let needID =JSON.stringify({
                            "id" : actionID,
                            "receiver":inputVal
                        })
                        $.ajax({
                            url :"https://www.hunterai.cn/api/jobDetailOrder/sendResumeByMail",
                            type : "post",
                            data : needID,
                            contentType : "application/json",
                            success : function(data){
                                msgAlert("success","发送成功！");
                                $(".modal_container").hide();
                            },
                            error :function(err){
                                console.log(err);
                                $(".modal_container").hide();
                            }
                        })
                    })
                }else{
                    $(this).next("#corentMail").html("邮箱格式不正确，请重新输入！");
                    $(this).css("border","1px solid red");
                }
            }else if(mailStr==""){
                $(this).next("#corentMail").html("请输入邮箱地址！");
                $(this).css("border","1px solid red");
            }
        });

        $("#modal_container").on('touchmove',function(e){
            e.preventDefault();  //阻止默认行为
        })
        $(".modal_btn_bg2").on("click",function(){
            $("#corentMail").html("")
            $(".modal_container").hide();
            $(".input-b").css("border","1px solid #999")
        })

    })
    //滑动滚动条  弹出发送按钮
    $("#resume").scroll(function(){
        $('.buttomfun').show(3000)
    })
    /**
     * 页面顶层弹出提示框
     * @type {string}
     */
    var htmlstyle = "<style>" +
            "body{padding:0;margin:0;}" +
            ".msg{color:#FFF;width:100%;height:1rem;text-align:center;font-size:0.3rem;                       line-height:1rem;position:fixed;top:-3rem;z-index:20;}"
            +".msg_success{background-color:#1fcc6c;}"
            +".msg_warning{background-color:#e94b35;}"
            +".msg_primary{background-color:#337ab7;}"
            +".msg_info{background-color:#5bc0de;}</style>";
        $('head').append(htmlstyle);
        $('body').prepend('<div class="msg msg_success"></div>'
        +'<div class="msg msg_warning"></div>'
        +'<div class="msg msg_primary"></div>'
        +'<div class="msg msg_info"></div>');
    function msgAlert(type,msg) {
        $('.msg_'+type).html(msg);
        $('.msg_'+type).animate({'top': 0},500);
        setTimeout(function(){$('.msg_'+type).animate({'top': '-3rem'},500)},2000);
    }
})

