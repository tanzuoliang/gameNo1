function js_call_oc()
{
	var iFrame;
    iFrame = document.createElement("iframe");
    iFrame.setAttribute("src", "ios://jwzhangjie");
           iFrame.setAttribute("style", "display:none;");
           iFrame.setAttribute("height", "0px");
           iFrame.setAttribute("width", "0px");
           iFrame.setAttribute("frameborder", "0");
           document.body.appendChild(iFrame);
           // 发起请求后这个iFrame就没用了，所以把它从dom上移除掉
           iFrame.parentNode.removeChild(iFrame);
           iFrame = null;    
}


function _onload(){
    if(callIOS){
        callIOS("from js");
    }
    else{
        alert("no method name callIOS");
    }
    
    if(getClientId){
        alert(getClientId());
    }
    else{
        alert("no method named getClientId");
    }
}