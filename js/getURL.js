/**
 * Created by jet on 2017/12/8.
 */
    function getURL(){
       return $.getJSON("resource/URl.json",function(data){
       return data.url
    });
    }