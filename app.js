let min;
        let sec;
        let timerId = null;
        function defaultval(){
            document.getElementById("im").innerHTML="00";
            document.getElementById("is").innerHTML="00";
        }
        function timmer(){
            if(min===0 && sec===0){
                return ;
            }
            if(sec===0){
                if(min>0){
                    min--;
                    sec=59;
                }
            }
            else{
                sec--;
            }
            document.getElementById("im").innerHTML=min<10?'0'+min:min;
            document.getElementById("is").innerHTML=sec<10?'0'+sec:sec;
            document.getElementById("pause").style.display="inline";
            document.getElementById("rst").style.display="inline";
            timerId=setTimeout(timmer,1000);
        }

        function pause(){
            clearTimeout(timerId);
            timerId = null;
            document.getElementById("im").innerHTML=min;
            document.getElementById("is").innerHTML=sec<10?'0'+sec:sec;
        }
        function reset(){
            clearTimeout(timerId);
            timerId = null;
            document.getElementById("im").innerHTML="00";
            document.getElementById("is").innerHTML="00";
            document.getElementById("min").value="mins";
            document.getElementById("sec").value="secs";
            document.getElementById("start").style.display="inline";
            document.getElementById("pause").style.display="none";
            document.getElementById("rst").style.display="none";
        }
        function changecolor(){
            let selectcolor=document.getElementById("clr").value;
            document.body.style.backgroundColor=selectcolor;
        }
        function minchange(){
            let mins=document.getElementById("min").value;
            document.getElementById("im").innerHTML=mins;
            min=mins;
        }
        function secchange(){
            let secs=document.getElementById("sec").value;
            document.getElementById("is").innerHTML=secs;
            sec=secs;
        }
        function add(){
            document.getElementById("set").style.display="inline";
            document.getElementById("adm").style.display="inline";
            document.getElementById("ads").style.display="inline";
        }
        function set(){
            min=parseInt(document.getElementById("adm").value);
            sec=parseInt(document.getElementById("ads").value);
            if(sec>60){
                min=min+parseInt(sec/60);
                sec=sec%60;
            }
            document.getElementById("im").innerHTML=min<10?'0'+min:min;
            document.getElementById("is").innerHTML=sec<10?'0'+sec:sec;
            document.getElementById("adm").style.display="none";
            document.getElementById("ads").style.display="none";
            document.getElementById("set").style.display="none";
        }