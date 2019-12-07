var storeEventHandler,pjaxErrorEventTriggerTest,tape=require("tape"),handleResponse=require("../../../lib/proto/handle-response"),noop=require("../../../lib/util/noop"),loadContent=require("../../../index").prototype.loadContent,href="https://example.org/";tape("test events triggered when handleResponse(false) is called",function(t){t.plan(3);var n=[];storeEventHandler=function(e){n.push(e.type),t.equal(e.test,1)},document.addEventListener("pjax:complete",storeEventHandler),document.addEventListener("pjax:error",storeEventHandler),handleResponse.bind({options:{test:1}})(!1,null),t.same(n,["pjax:complete","pjax:error"],"calling handleResponse(false) triggers 'pjax:complete' and 'pjax:error'"),document.removeEventListener("pjax:complete",storeEventHandler),document.removeEventListener("pjax:error",storeEventHandler),t.end()}),tape("test when handleResponse() is called normally",function(e){var t={options:{test:1},loadContent:noop,state:{}},n={getResponseHeader:noop};handleResponse.bind(t)("",n,"href"),delete window.history.state.uid,e.same(window.history.state,{url:href,title:"",scrollPos:[0,0]},"window.history.state is set correctly"),e.equals(t.state.href,"href","this.state.href is set correctly"),e.equals(Object.keys(t.state.options).length,2,"this.state.options is set correctly"),e.same(t.state.options.request,n,"this.state.options is set correctly"),e.equals(t.state.options.test,1,"this.state.options is set correctly"),e.end()}),tape("test when handleResponse() is called normally with request.responseURL",function(e){var t={options:{},loadContent:noop,state:{}},n={responseURL:href+"1",getResponseHeader:noop};handleResponse.bind(t)("",n,""),e.equals(t.state.href,n.responseURL,"this.state.href is set correctly"),e.end()}),tape("test when handleResponse() is called normally with X-PJAX-URL",function(e){var t={options:{},loadContent:noop,state:{}},n={getResponseHeader:function(e){if("X-PJAX-URL"===e)return href+"2"}};handleResponse.bind(t)("",n,""),e.equals(t.state.href,href+"2","this.state.href is set correctly"),e.end()}),tape("test when handleResponse() is called normally with X-XHR-Redirected-To",function(e){var t={options:{},loadContent:noop,state:{}},n={getResponseHeader:function(e){if("X-XHR-Redirected-To"===e)return href+"3"}};handleResponse.bind(t)("",n,""),e.equals(t.state.href,href+"3","this.state.href is set correctly"),e.end()}),tape("test when handleResponse() is called normally with a hash",function(e){var t={options:{},loadContent:noop,state:{}},n={responseURL:href+"2",getResponseHeader:noop};handleResponse.bind(t)("",n,href+"1#test"),e.equals(t.state.href,href+"2#test","this.state.href is set correctly"),e.end()}),tape("test try...catch for loadContent() when options.debug is true",function(e){e.plan(2);var t={options:{},loadContent:noop,state:{}},n={getResponseHeader:noop};t.loadContent=function(){throw new Error},t.options.debug=!0,document.removeEventListener("pjax:error",storeEventHandler),pjaxErrorEventTriggerTest=function(){e.pass("pjax:error event triggered")},document.addEventListener("pjax:error",pjaxErrorEventTriggerTest),e.throws(function(){handleResponse.bind(t)("",n,"")},Error,"error is rethrown"),e.end()}),tape("test try...catch for loadContent()",function(e){e.plan(2);var t={options:{},loadContent:noop,state:{}},n={getResponseHeader:noop};t.loadContent=function(){throw new Error},t.latestChance=function(){return!0},t.options.debug=!1,document.removeEventListener("pjax:error",pjaxErrorEventTriggerTest),e.doesNotThrow(function(){e.equals(handleResponse.bind(t)("",n,""),!0,"this.latestChance() is called")},Error,"error is not thrown"),e.end()}),tape("test events triggered when loadContent() is called with a non-string html argument",function(t){t.plan(3);var n=[];storeEventHandler=function(e){n.push(e.type),t.equal(e.test,1)},document.addEventListener("pjax:complete",storeEventHandler),document.addEventListener("pjax:error",storeEventHandler),loadContent(null,{test:1}),t.same(n,["pjax:complete","pjax:error"],"calling loadContent() with a non-string html argument triggers 'pjax:complete' and 'pjax:error'"),document.removeEventListener("pjax:complete",storeEventHandler),document.removeEventListener("pjax:error",storeEventHandler),t.end()});