

var endDate=new Date();
 endDate.setMinutes(endDate.getMinutes()+5);
    endDate.setSeconds(endDate.getSeconds()+00);
    var dateTMR=0;

  function countDown() {
    var now=new Date();
    var t=new Date(endDate-now);
    if(t>0) {
      var mi = t.getMinutes();
      var ss = t.getSeconds();
   if (ss < 10){
  ss = "0" + ss;
   }
   
      var ms = t.getMilliseconds().toString().substr(0,2);;
      if (ms.length<2){
    	  ms = "0" + ms;
    	   }
      document.getElementById('tleft').value=mi+":"+ss+"."+ms;
    } else {
      document.getElementById('tleft').value="0:00.0";
      clearInterval(dateTMR);
      triggerAction();
    }
  }

  function triggerAction() {
	  window.alert("The allotted time has run out. To briefly extend your time and proceed, press OK");
  }
  
  