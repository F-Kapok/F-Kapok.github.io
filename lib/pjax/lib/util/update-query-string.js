module.exports=function(e,n,r){var t=new RegExp("([?&])"+n+"=.*?(&|$)","i"),a=-1!==e.indexOf("?")?"&":"?";return e.match(t)?e.replace(t,"$1"+n+"="+r+"$2"):e+a+n+"="+r};