var tape=require("tape"),evalScript=require("../../lib/eval-script");tape("test evalScript method",function(e){document.body.className="";var t=document.createElement("script");t.innerHTML="document.body.className = 'executed'",e.equal(document.body.className,"","script hasn't been executed yet"),evalScript(t),e.equal(document.body.className,"executed","script has been properly executed"),t.innerHTML="document.write('failure')";var c="document.write hasn't been executed";document.body.text=c,evalScript(t),e.equal(document.body.text,c,"document.write hasn't been executed"),e.end()}),tape("evalScript should not throw an error if the script removed itself",function(t){var e=document.createElement("script");e.id="myScript",e.innerHTML="const script = document.querySelector('#myScript');script.parentNode.removeChild(script);";try{evalScript(e),t.pass("Missing script tested successfully")}catch(e){console.error(e),t.fail("Attempted to remove missing script")}t.end()});