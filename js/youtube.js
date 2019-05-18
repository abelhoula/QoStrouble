/*----------------------------------------------------------
	                          JavaScript du test Youtube
	------------------------------------------------------------*/
	
	
/*----------------------------------------------------------
	                          Variables globales du programme
	------------------------------------------------------------*/	
var intervale = null;	
var nb = 0;
var nombre = 0;
var nbrRec = 0;
var tmin = 9999999999;
var tmax = 0;
var t = 0;
var first = 0;
var first2 = 0;
var prog = true;
var isFirst = true;
var isFinished = false;
var boucle = false;
var cpt = 0;
var isOk = false;
var n = 0; 
var timeoutID;
var fais = false;
var tous = 0;
var echec = 0;
var fail = false;
var insert = 0;
var startCap = false;
var stop=false;
var daysleft = 0;
var hoursleft = 0;
var minutesleft = 0;			
var secondsleft = 0;
var millisecondsleft = 0;

var chart;
var chart3;
var dataPoints1 = [];
var dataPoints2 = [];
var dataPoints3 = [];
var dataPoints4 = [];
var dataPoints5 = [];
var dataPoints6 = [];
var dataPoints7 = [];
var dataPoints8 = [];
var dataPoints9 = [];
var chart2;
var chart4;
var chart5;
var chart6;

var daysleft2 = 0;
var hoursleft2 = 0;
var minutesleft2 = 0;			
var secondsleft2 = 0;
var millisecondsleft2 = 0;
var duree = 0;
var pro = false;
var begin = true;
var lab;
var player;
var dvid;
var svid;
var byt = 0;
var succ;
function initialise()
{

}


/*----------------------------------------------------------
	                          Fonction qui arrete l'exécution de tous les scripts en cours d'exécution
	------------------------------------------------------------*/

function StopScript()
{
clearInterval(intervale);
initialise();
 player.pauseVideo();
stopCapture();
} 

/*----------------------------------------------------------
	                          Fonction d'export des tableaux aux fichiers excel
	------------------------------------------------------------*/

function exportFunction()
{
			 var tab_text = '<table border="1px" style="font-size:20px" ">';
    var textRange; 
    var j = 0;
    var tab = document.getElementById('resDetail'); // id of table
    var lines = tab.rows.length;
    var html = tab.outerHTML;
  

    // the first headline of the table
    if (lines > 0) {
        tab_text = tab_text + '<tr bgcolor="#DFDFDF">' + tab.rows[0].innerHTML + '</tr>';
    }

    // table data lines, loop starting from 1
    for (j = 1 ; j < lines; j++) {     
        tab_text = tab_text + "<tr>" + tab.rows[j].innerHTML + "</tr>";
    }

    tab_text = tab_text + "</table>";
    tab_text = tab_text.replace(/<A[^>]*>|<\/A>/g, "");             //remove if u want links in your table
    tab_text = tab_text.replace(/<img[^>]*>/gi,"");                 // remove if u want images in your table
    tab_text = tab_text.replace(/<input[^>]*>|<\/input>/gi, "");    // reomves input params
    // console.log(tab_text); // aktivate so see the result (press F12 in browser)

    var ua = window.navigator.userAgent;
    var msie = ua.indexOf("MSIE "); 

     // if Internet Explorer
    if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) {
        txtArea1.document.open("txt/html","replace");
        txtArea1.document.write(tab_text);
        txtArea1.document.close();
        txtArea1.focus(); 
        sa = txtArea1.document.execCommand("SaveAs", true, "DataTableExport.xls");
    }  
    else // other browser not tested on IE 11
        sa = window.open('data:application/vnd.ms-excel,' + escape(html));  
    return (sa);

} 
/*----------------------------------------------------------
	                          Fonction qui dessine le graphique du taux de succées
	------------------------------------------------------------*/
function tauxsucces(y1, y2) {
	 chart2 = new CanvasJS.Chart("taux",
	{
exportEnabled: true,
		title:{
			text: "Success rate"
		},
                animationEnabled: false,
		legend:{
			
			fontSize: 20,
			fontFamily: "Helvetica"        
		},
		theme: "theme2",
		data: [
		{        
			type: "pie",       
			indexLabelFontFamily: "Garamond",       
			indexLabelFontSize: 20,
			indexLabel: "{label} {y}%",
			startAngle:-20,      
			showInLegend: true,
			toolTipContent:"{legendText} {y}%",
			dataPoints: [
				{  y: y1, legendText:"Successd", label: "Successd" },
				{  y: y2, legendText:"Fail", label: "Fail" },
				
			]
		}
		]
	});
	chart2.render();
}


	
var countBuf2=0;
/*----------------------------------------------------------
	                          Fonction affiche les résultats dans les tableaux et les graphiques à la fin de la vidéo
	------------------------------------------------------------*/

function finish()
{
if (nombre==0) nombre=1;
if (  $(".scrollit").css("height") == "75px") $(".scrollit").css("height", "125px") ;
               else if (  $(".scrollit").css("height") == "125px") $(".scrollit").css("height", "175px") ;
              else if (  $(".scrollit").css("height") == "175px") $(".scrollit").css("height", "225px") ;
              else if (  $(".scrollit").css("height") == "225px") $(".scrollit").css("height", "300px") ;
if (succ==true)
{
nbrRec++;
$("#resDetail").append("<tr><td>"+(cpt+1)+"</td><td>Success</td><td>"+temps3+"</td><td>"+temps6+"</td><td>"+temps2+"</td><td>"+countBuf2+"</td><td>"+date+" "+time+"</td></tr>");
$("#resDetail tr:last").attr('class', 'success');
}
else
{
$("#resDetail").append("<tr><td>"+(cpt+1)+"</td><td>Failed</td><td>"+temps3+"</td><td>"+temps6+"</td><td>"+temps2+"</td><td>"+countBuf2+"</td><td>"+date+" "+time+"</td></tr>");
$("#resDetail tr:last").attr('class', 'danger');
}
tauxsucces((nbrRec*100/(cpt+1)),100-(nbrRec*100/(cpt+1)));
cpt++;

cvid = 0;pfvid = 0; done = false; startBuf=0;endBuf=0; laststat=-1; totalBuf = 0; firstBuf = true; firstPlay = 0; charged = false;
nbcal = 0; access = 0;delay = 0;temps3=0;temps4=0;countBuf=0;lastbuf=-1;countBuf2=0;
if (pro==true)
{
if ($('#nbr').is(':checked'))
{		
            if ( (cpt<nombre) && (stop==false))
		{
			 timeoutID = setTimeout(start, parseInt(duree)*1000); 
		}
 if (cpt==nombre) stopCapture();
}


if ($('#periode').is(':checked'))
{
			if ((isFinished==false)  && (stop==false)) timeoutID = setTimeout(start, parseInt(duree)*1000); 
}

}
if (pro==false)
{

if ((cpt<nombre)  && (stop==false))
{

timeoutID = setTimeout(start, parseInt(duree)*1000); 
}
 if (cpt==nombre) stopCapture();
}



}
var date; var time;
function start0()
{
startCapture();
setTimeout(start, 700);
return false;
}
/*----------------------------------------------------------
	                          Fonction extraire l'identifient de la vidéo
	------------------------------------------------------------*/
function getArtistId() {

var lab2="";
var j=0;

while ((j<lab.length)&&(lab.substring(j,j+8)!="watch?v=")) j++;
j = j+8;
while ((j<lab.length)&&(lab.substring(j,j+1)!="/"))
{
lab2+= lab.substring(j,j+1);
j++;
}
  return lab2;
}

function loadPlayer() { 
  if (typeof(YT) == 'undefined' || typeof(YT.Player) == 'undefined') {
 
    var tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    window.onYouTubePlayerAPIReady = function() {
      onYouTubePlayer();
    };

  } else {
  
   onYouTubePlayer();

  }

}

var timerIDYt = 0;

/*----------------------------------------------------------
	                          Fonction pour initialiser le lecteur youtube
	------------------------------------------------------------*/

function onYouTubePlayer() {
if (cpt==0)
{
  player = new YT.Player('you', {
    height: '245',
    width: '99%',
    videoId: getArtistId(),
    playerVars: { controls:1, showinfo: 0, rel: 0, showsearch: 0, iv_load_policy: 3 },
    events: {
      'onStateChange': onPlayerStateChange,
 'onReady': onPlayerReady,
      'onError': catchError
    }
  });
}
else
{
svid = new Date();
//player.currentTime = 0;
//player.playVideo();
 //player.seekTo(0);
//start2();
 
player.loadVideoById(getArtistId(), 0, "medieum");
       
}
}
var cvid = 0;
var pfvid = 0;
var done = false;
var startBuf=0;
var endBuf=0;
var laststat=-1;
var totalBuf = 0;
var firstBuf = true;
var firstPlay = 0;
var charged = false;
var newPlay = false;
var temps6;var temps2; var temps3; var temps4; var temps5;
/*----------------------------------------------------------
	                          Fonction pour déterminer les évenements sur la vidéo
	------------------------------------------------------------*/
  function onPlayerStateChange(event) {

if ((newPlay ==true)&&(firstBuf==true)) firstPlay = new Date();

if ((player.getPlayerState()==-1)&&(charged==true))  stopVideo();
newPlay ==false;

if (player.getPlayerState()==3) 
{
charged = true;
countBuf2++;
startBuf = new Date();
laststat = 3; 
if (firstBuf==true)
{
access = new Date();
start2();
//clearTimeout(timerIDYt);
var day=Math.floor((access-svid)/(24*60*60*1000));
  	var hr=Math.floor(((access-svid)%(24*60*60*1000))/(60*60*1000));
  	var min=Math.floor(((access-svid)%(24*60*60*1000))/(60*1000))%60;
  	var sec=Math.floor(((access-svid)%(24*60*60*1000))/1000)%60%60;
  	msec = Math.floor(((access-svid)%(24*60*60*1000))/1000*1000)%1000;
 temps3 = sec + (msec/1000) + (min*60) + (hr*3600) + (day*3600*24);

dataPoints3.push({
					x: timme2.getTime(),
					y: parseFloat(temps3)
				});
chart4.render();
}                       
}
else if ((player.getPlayerState()==1)&&(laststat==3))
{
endBuf = new Date();
var day=Math.floor((endBuf-startBuf)/(24*60*60*1000));
  	var hr=Math.floor(((endBuf-startBuf)%(24*60*60*1000))/(60*60*1000));
  	var min=Math.floor(((endBuf-startBuf)%(24*60*60*1000))/(60*1000))%60;
  	var sec=Math.floor(((endBuf-startBuf)%(24*60*60*1000))/1000)%60%60;
  	msec = Math.floor(((endBuf-startBuf)%(24*60*60*1000))/1000*1000)%1000;
 temps6 = sec + (msec/1000) + (min*60) + (hr*3600) + (day*3600*24);
totalBuf+=temps6;
if (firstBuf==true)
{

 temps4 = temps6;
dataPoints6.push({
					x: timme2.getTime(),
					y: parseFloat(temps4)
				});
dataPoints7.push({
					x: timme2.getTime(),
					y: (parseFloat(temps3)+parseFloat(temps4))
				});

chart4.render();

firstBuf=false;
}
}
if (event.data == YT.PlayerState.ENDED) {
          pfvid = new Date();

var day=Math.floor((pfvid-firstPlay)/(24*60*60*1000));
  	var hr=Math.floor(((pfvid-firstPlay)%(24*60*60*1000))/(60*60*1000));
  	var min=Math.floor(((pfvid-firstPlay)%(24*60*60*1000))/(60*1000))%60;
  	var sec=Math.floor(((pfvid-firstPlay)%(24*60*60*1000))/1000)%60%60;
  	msec = Math.floor(((pfvid-firstPlay)%(24*60*60*1000))/1000*1000)%1000;
 temps5 = sec + (msec/1000) + (min*60) + (hr*3600) + (day*3600*24);
dataPoints8.push({
					x: timme2.getTime(),
					y: parseFloat(temps5)
				});
chart6.render();
dataPoints1.push({
					x: timme2.getTime(),
					y: (countBuf2)
				});
dataPoints9.push({
					x: timme2.getTime(),
					y: (totalBuf)
				});

chart.render();
succ = true;
finish();
        }
    if (event.data == YT.PlayerState.PLAYING && !done) {
 
   
      done = true;
    } else if (event.data == YT.PlayerState.ENDED) {
      
    }
  }

var timme2 ;

  function onPlayerReady(event) {
svid = new Date();
  player.playVideo();




  }
  function catchError(event)
  {
    if(event.data == 100) console.log("De video bestaat niet meer");
  }

  function stopVideo() {
    player.stopVideo();
    succ = false;


if (temps3==0)
{
dataPoints3.push({
					x: timme2.getTime(),
y: 1,
indexLabel: "loss", markerType: "cross", markerColor: "tomato" , markerSize: 12  
					
				});
}
if (temps4==0)
{
dataPoints6.push({
					x: timme2.getTime(),
y: 1,
indexLabel: "loss", markerType: "cross", markerColor: "tomato" , markerSize: 12  
					
				});
}
if ((temps3==0)||(temps4==0))
{
dataPoints7.push({
					x: timme2.getTime(),
y: 1,
indexLabel: "loss", markerType: "cross", markerColor: "tomato" , markerSize: 12  
					
				});
}
if (temps2==0)
{
dataPoints5.push({
					x: timme2.getTime(),
y: 1,
indexLabel: "loss", markerType: "cross", markerColor: "tomato" , markerSize: 12  
					
				});
}
dataPoints8.push({
					x: timme2.getTime(),
y: 1,
indexLabel: "loss", markerType: "cross", markerColor: "tomato" , markerSize: 12  
					
				});
dataPoints1.push({
					x: timme2.getTime(),
y: 1,
indexLabel: "loss", markerType: "cross", markerColor: "tomato" , markerSize: 12  
					
				});
dataPoints9.push({
					x: timme2.getTime(),
y: 1,
indexLabel: "loss", markerType: "cross", markerColor: "tomato" , markerSize: 12  
					
				});
chart.render();
chart6.render();
chart4.render();
   finish();
  }

  /*----------------------------------------------------------
	                          Fonction qui lance l'exécution du test
	------------------------------------------------------------*/
  
function start()

{
newPlay = true;
if (pro==true)
{
nombre = $('#lab22').attr('value');
duree = $('#lab32').attr('value');
}
else
{
nombre = $('#lab2').attr('value');
duree = $('#lab3').attr('value');
}
var value = 750;
 lab = $('#lab').attr('value');
//$("#iframe").attr("src",lab);

//$("#iframe")[0].src += "?rel=0&autoplay=1";
dvid = new Date();
d = new Date();
 date = d.getDate() + "/" + (d.getMonth()+1)  + "/" +  d.getFullYear() ;
 time = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
timme2 = d;
loadPlayer();


return false;

}



var nbcal = 0;
var access = 0;
var delay = 0;
var temps3=0;
var temps4=0;
var countBuf=0;
var lastbuf=-1;

function start2()
{


var fvid;
var dow = player.getVideoLoadedFraction();
if (dow!=lastbuf) countBuf++;
lastbuf = dow;
nbcal++;
if ((dow!=1)&&(succ!=false)) setTimeout(start2, 0);
if (dow==1) 
{

byt = player.getVideoBytesTotal();
fvid = new Date();
var day=Math.floor((fvid-access)/(24*60*60*1000));
  	var hr=Math.floor(((fvid-access)%(24*60*60*1000))/(60*60*1000));
  	var min=Math.floor(((fvid-access)%(24*60*60*1000))/(60*1000))%60;
  	var sec=Math.floor(((fvid-access)%(24*60*60*1000))/1000)%60%60;
  	msec = Math.floor(((fvid-access)%(24*60*60*1000))/1000*1000)%1000;
temps2 = sec + (msec/1000) + (min*60) + (hr*3600) + (day*3600*24);
dataPoints5.push({
					x: timme2.getTime(),
					y: parseFloat(temps2)
				});

chart6.render();


//stopVideo();
}

}

 $(document).ready(function(){
 $("form#loginForm").submit(start0)
});

/*----------------------------------------------------------
	                          Fonction de count down pour programmer un test
	------------------------------------------------------------*/

function cd(){
var fin = false;
if (isFirst==true)
{

      if (first==0)
{
end = new Date();

end.setHours(end.getHours()+hoursleft);
end.setMinutes(end.getMinutes()+minutesleft);
end.setSeconds(end.getSeconds()+secondsleft);
end.setMilliseconds(end.getMilliseconds()+millisecondsleft);
first++;
}


	now = new Date();
	//diff = end - now;
	//diff = new Date(diff);
	//var msec = diff.getMilliseconds();
	//var sec = diff.getSeconds();
	//var min = diff.getMinutes();
	//var  hr = diff.getHours()-1; 

  var day=Math.floor((end-now)/(24*60*60*1000));
  var hr=Math.floor(((end-now)%(24*60*60*1000))/(60*60*1000));
  var min=Math.floor(((end-now)%(24*60*60*1000))/(60*1000))%60;
  var sec=Math.floor(((end-now)%(24*60*60*1000))/1000)%60%60;
  msec = Math.floor(((end-now)%(24*60*60*1000))/1000*1000)%1000;
if (day < 10){
		day = "0" + day;
	}

if (hr < 10){
		hr = "0" + hr;
	}	
if (min < 10){
		min = "0" + min;
	}
	if (sec < 10){
		sec = "0" + sec;
	}
	if(msec < 10){
		msec = "00" +msec;
	}
	else if(msec < 100){
		msec = "0" +msec;
	}
	if(now >= end){
                secondsleft = 0;
		millisecondsleft = 0;
		clearTimeout(timerID);
		if (prog == true) 
			{
				boucle = true;
				intervale = null;
				programmer2();
				start();
                        
				prog = false;
			}
	       document.getElementById("cdtime").innerHTML = "00&nbsp;:&nbsp;00&nbsp;:&nbsp;00&nbsp;:&nbsp;00&nbsp;:&nbsp;000";	
 		fin = true;
	}
	else{

	document.getElementById("cdtime").innerHTML = day+"&nbsp;"+ ":&nbsp;" + hr+"&nbsp;" + ":&nbsp;" + min +"&nbsp;"+ ":&nbsp;" + sec+"&nbsp;" + ":&nbsp;" + msec;
	}		// you can leave out the + ":" + msec if you want...
			// If you do so, you should also change setTimeout to setTimeout("cd()",1000)
	if (fin ==false)  timerID = setTimeout("cd()", 10); 
}
}


/*----------------------------------------------------------
	                          Fonction cout down pour arreter le test
	------------------------------------------------------------*/


function cd2(){
isFirst = false;
var fin = false;
      if (first2==0)
{
end = new Date();
end.setHours(end.getHours()+hoursleft2);
end.setMinutes(end.getMinutes()+minutesleft2);
end.setSeconds(end.getSeconds()+secondsleft2);
end.setMilliseconds(end.getMilliseconds()+millisecondsleft2);
first2++;
}

	now = new Date();
	//diff = end - now;
	//diff = new Date(diff);
	 var day=Math.floor((end-now)/(24*60*60*1000));
  	var hr=Math.floor(((end-now)%(24*60*60*1000))/(60*60*1000));
  	var min=Math.floor(((end-now)%(24*60*60*1000))/(60*1000))%60;
  	var sec=Math.floor(((end-now)%(24*60*60*1000))/1000)%60%60;
  	msec = Math.floor(((end-now)%(24*60*60*1000))/1000*1000)%1000;
if (day < 10){
		day = "0" + day;
	}

if (hr < 10){
		hr = "0" + hr;
	}	

if (min < 10){
		min = "0" + min;
	}
	if (sec < 10){
		sec = "0" + sec;
	}
	if(msec < 10){
		msec = "00" +msec;
	}
	else if(msec < 100){
		msec = "0" +msec;
	}
	if(now >= end){
                secondsleft2 = 0;
		millisecondsleft2 = 0;
		clearTimeout(timerID);
                isFinished = true;
		StopScript();
		clearTimeout(timeoutID);
                stopCapture();
 		intervale = null;
	        document.getElementById("cdtime3").innerHTML = "00&nbsp;:&nbsp;00&nbsp;:&nbsp;00&nbsp;:&nbsp;00&nbsp;:&nbsp;000";	
                fin = true;	
	}
	else{

	document.getElementById("cdtime3").innerHTML = day+"&nbsp;"+ ":&nbsp;" + hr+"&nbsp;" + ":&nbsp;" + min +"&nbsp;"+ ":&nbsp;" + sec+"&nbsp;" + ":&nbsp;" + msec;
	}		
	if (fin ==false) timerID = setTimeout("cd2()", 10); 
}

/*----------------------------------------------------------
	                          Fonction pour détecter quand est ce que le test sera démmaré
	------------------------------------------------------------*/
 
function programmer()
{
pro = true;
isFirst = true;
first = 0;
if($('#30s').is(':checked')) 
{
secondsleft = 5;
cd();
}
else if($('#1min').is(':checked')) 
{
minutesleft = 1;	
cd();
}

else if($('#2min').is(':checked')) 
{
minutesleft = 2;	
cd();
}
else if($('#5min').is(':checked')) 
{
minutesleft = 5;	
cd();
}
else if($('#10min').is(':checked')) 
{
minutesleft = 10;	
cd();
}
else if($('#15min').is(':checked')) 
{
minutesleft = 15;	
cd();
}
else if($('#30min').is(':checked')) 
{
minutesleft = 30;	
cd();
}
else if($('#60min').is(':checked')) 
{
minutesleft = 60;	
cd();
}
else if($('#jr').is(':checked')) 
{
var x1="";var x2="";var x3="";var y1="";var y2="";
var x = document.getElementById("datepicker").value;
for (var i=8;i<10;i++) x1 += x.substring(i, i+1);
for (var i=5;i<7;i++) x2 += x.substring(i, i+1);
for (var i=0;i<4;i++) x3 += x.substring(i, i+1);
var y = document.getElementById("rdvT").value;
for (var i=0;i<2;i++) y1 += y.substring(i, i+1);
for (var i=3;i<5;i++) y2 += y.substring(i, i+1);

var glob = parseInt(y2) + (parseInt(y1)*60);
var d1 = new Date(x3+'/'+x2+'/'+x1+' '+y1+':'+y2+':00');

now = new Date();
	//diff = end - now;
	//diff = new Date(diff);
	 var day=Math.floor((d1-now)/(24*60*60*1000));
  	var hr=Math.floor(((d1-now)%(24*60*60*1000))/(60*60*1000));
  	var min=Math.floor(((d1-now)%(24*60*60*1000))/(60*1000))%60;
  	var sec=Math.floor(((d1-now)%(24*60*60*1000))/1000)%60%60;
  	msec = Math.floor(((d1-now)%(24*60*60*1000))/1000*1000)%1000;

minutesleft = (day*24*60)+(hr*60)+(min);
secondsleft = sec;
millisecondsleft = msec;	
cd();
}
else if($('#autre').is(':checked')) 
{
var mm = parseInt($('#dans').attr('value'));

minutesleft = parseInt($('#dans').attr('value'));

cd();
}
}
/*----------------------------------------------------------
	                          Fonction pour détecter quand est ce que le test sera fini
	------------------------------------------------------------*/
function programmer2()
{
isFirst2 = true;
first2 = 0;
if($('#30s2').is(':checked')) 
{
secondsleft2 = 30;
cd2();
}
else if($('#1min2').is(':checked')) 
{
minutesleft2 = 1;	
cd2();
}

else if($('#2min2').is(':checked')) 
{
minutesleft2 = 2;	
cd2();
}
else if($('#5min2').is(':checked')) 
{
minutesleft2 = 5;	
cd2();
}
else if($('#10min2').is(':checked')) 
{
minutesleft2 = 10;	
cd2();
}
else if($('#15min2').is(':checked')) 
{
minutesleft2 = 15;	
cd2();
}
else if($('#30min2').is(':checked')) 
{
minutesleft2 = 30;	
cd2();
}
else if($('#60min2').is(':checked')) 
{
minutesleft2 = 60;	
cd2();
}
else if($('#infini').is(':checked')) 
{
document.getElementById("cdtime3").innerHTML = "Indéfini";
}

else if($('#jr2').is(':checked')) 
{
var x1="";var x2="";var x3="";var y1="";var y2="";
var x = document.getElementById("datepicker2").value;
for (var i=8;i<10;i++) x1 += x.substring(i, i+1);
for (var i=5;i<7;i++) x2 += x.substring(i, i+1);
for (var i=0;i<4;i++) x3 += x.substring(i, i+1);
var y = document.getElementById("rdvT2").value;
for (var i=0;i<2;i++) y1 += y.substring(i, i+1);
for (var i=3;i<5;i++) y2 += y.substring(i, i+1);

var glob = parseInt(y2) + (parseInt(y1)*60);
var d1 = new Date(x3+'/'+x2+'/'+x1+' '+y1+':'+y2+':00');

now = new Date();
	//diff = end - now;
	//diff = new Date(diff);
	 var day=Math.floor((d1-now)/(24*60*60*1000));
  	var hr=Math.floor(((d1-now)%(24*60*60*1000))/(60*60*1000));
  	var min=Math.floor(((d1-now)%(24*60*60*1000))/(60*1000))%60;
  	var sec=Math.floor(((d1-now)%(24*60*60*1000))/1000)%60%60;
  	msec = Math.floor(((d1-now)%(24*60*60*1000))/1000*1000)%1000;

minutesleft2 = (day*24*60)+(hr*60)+(min);
secondsleft2 = sec;
millisecondsleft2 = msec;	
cd2();
}

else if($('#autre2').is(':checked')) 
{
minutesleft2 = parseInt($('#dans2').attr('value'));
cd2();
}
}
/*----------------------------------------------------------
	                          Fonction pour détecter lequel des radio boutons est sélectionné
	------------------------------------------------------------*/
function ifcheck()
{
if($('#30s2').is(':checked') || ($('#1min2').is(':checked')) || ($('#2min2').is(':checked')) || ($('#5min2').is(':checked')) || ($('#10min2').is(':checked')) || ($('#15min2').is(':checked')) || ($('#30min2').is(':checked')) || ($('#60min2').is(':checked'))
|| ($('#infini').is(':checked')) || ($('#jr2').is(':checked')) || ($('#autre2').is(':checked'))) return true;
else return false;
}
/*----------------------------------------------------------
	                          Fonction pour annuler la programmation d'un test
	------------------------------------------------------------*/
function annuler()
{
daysleft = 0;
hoursleft = 0;
minutesleft = 0;			
secondsleft = 0;
millisecondsleft = 0;

daysleft2 = 0;
hoursleft2 = 0;
minutesleft2 = 0;			
secondsleft2 = 0;
millisecondsleft2 = 0;
first2 = 0;

var intervale = null;	
var i = 0;

cd();
document.getElementById("cdtime").innerHTML = "00&nbsp;:&nbsp;00&nbsp;:&nbsp;00&nbsp;:&nbsp;00&nbsp;:&nbsp;000";
StopScript();
cd2();
document.getElementById("cdtime3").innerHTML = "00&nbsp;:&nbsp;00&nbsp;:&nbsp;00&nbsp;:&nbsp;00&nbsp;:&nbsp;000";
isFinished = false;
	
}
/*----------------------------------------------------------
	                          Fonction démmarer une capture tshark à travers une requete ajax
	------------------------------------------------------------*/
function startCapture()
{
var total;
var nombre2 = nombre ;
if (parseInt(nombre2)==0) nombre2 = 1;
if (pro==false) total = ((750*n)/1000)*nombre2 +(duree)*(nombre2-1);
if (pro == true) total = secondsleft2 + (minutesleft2*60) + (millisecondsleft2/1000);
if ((pro==true) &&($('#infini').is(':checked'))) total = 0;
total = Math.round(total);
var tsharkOk = $('#tsharkOk').is(':checked');

var Interface = "eth0";

var tsharkOfset = $('#tsharkOfset').is(':checked');


var tsharkC = $('#tsharkC').is(':checked');
var tsharkCText = $('#tsharkCText').attr('value');

var tsharkPcap = $('#tsharkPcap').is(':checked');

var tsharkPcapng = $('#tsharkPcapng').is(':checked');

var filter = "port 80 or port 443 or port 554"

if (tsharkOk == true)
{
 var request2 = $.ajax({
        type: "POST",
        url: "perl/capture.pl",
	//dataType: "jsonp",
          data :  {"Interface": Interface, "tsharkC": tsharkC, "tsharkCText" : tsharkCText,"tsharkPcap": tsharkPcap, "tsharkPcapng" : tsharkPcapng, "total" : total, "filter" : filter, "tsharkOfset" : tsharkOfset},
		

        // script call was *not* successful
        error: function() { 
            alert("script call was not successful");
        }, 
        success: function(perl_data){
		
  }});
}
return false;

}


/*----------------------------------------------------------
	                          Fonction pour arreter la capture tshark
	------------------------------------------------------------*/
function stopCapture()
{
 var request4 = $.ajax({
        type: "POST",
        url: "perl/kill.pl",
		

        // script call was *not* successful
        error: function() { 
            alert("script call was not successful");
        }, 
        success: function(perl_data){
		
  }});
return false;

}


var yValue1 = 640; 
		var yValue2 = 604;

		var timme = new Date;

function restartChart()
{


 function updateChart(chart, count) {
			count = count || 1;

			// count is number of times loop runs to generate random dataPoints. 

			
				
				// add interval duration to time				
				//timme.setTime(timme.getTime()+ updateInterval);


				
				
				// pushing the new values
				
dataPoints2.push({
					x: timme.getTime(),
					//y: yValue1
				});
				


			

			// updating legend text with  updated with y Value 
			
			

			

		}


updateChart(chart3, 3000);
}
		/*----------------------------------------------------------
	                          Fonction pour afficher les graphique en temps réels
	------------------------------------------------------------*/
 window.onload = function graphique() {
    
     chart = new CanvasJS.Chart("tempsChart",{
			zoomEnabled: true,
			exportEnabled: true,
			title: {
				text: "Buffering count"		
			},
			toolTip: {
				shared: true
				
			},
			legend: {
				verticalAlign: "top",
				horizontalAlign: "center",
                                fontSize: 10,
				fontWeight: "bold",
				fontFamily: "calibri",
				fontColor: "dimGrey"
			},
			axisX: {
				
				title: "Date"
			},
			axisY:{
				title: "Number",
                                sufix: '',
				includeZero: false
			}, 
axisY2: {
				title: "Time (S)",
includeZero: false
			},
			data: [{ 
				// dataSeries1
				type: "line",
				xValueType: "dateTime",
				showInLegend: true,
				name: "Buffering count",
				dataPoints: dataPoints1
			},
{ 
				// dataSeries1
				type: "line",
				xValueType: "dateTime",
				axisYType: "secondary",
				showInLegend: true,
				name: "Buffering total time",
				dataPoints: dataPoints9
			},
			
],
          legend:{
            cursor:"pointer",
            itemclick : function(e) {
              if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
                e.dataSeries.visible = false;
              }
              else {
                e.dataSeries.visible = true;
              }

              chart.render();
            }
          }
		});

 chart6 = new CanvasJS.Chart("tempsChart2",{
			zoomEnabled: true,
			exportEnabled: true,
			title: {
				text: "Download and total time"		
			},
			toolTip: {
				shared: true
				
			},
			legend: {
				verticalAlign: "top",
				horizontalAlign: "center",
                                fontSize: 10,
				fontWeight: "bold",
				fontFamily: "calibri",
				fontColor: "dimGrey"
			},
			axisX: {
				
				title: "Date"
			},
			axisY:{
				title: "S",
                                sufix: 'ms',
				includeZero: false
			}, 
			data: [{ 
				// dataSeries1
				type: "line",
				xValueType: "dateTime",
				showInLegend: true,
				name: "Download time",
				dataPoints: dataPoints5
			},
{				
				// dataSeries2
				type: "line",
				xValueType: "dateTime",
				showInLegend: true,
				name: "Total time" ,
				dataPoints: dataPoints8
			}

			
],
          legend:{
            cursor:"pointer",
            itemclick : function(e) {
              if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
                e.dataSeries.visible = false;
              }
              else {
                e.dataSeries.visible = true;
              }

           
            }
          }
		});
updateChart(chart6, 3000);




var updateInterval = 3000;
//updateChart(1);	
	

		  function updateChart(chart, count) {
			count = count || 1;

			// count is number of times loop runs to generate random dataPoints. 

			
				
				// add interval duration to time				
				//timme.setTime(timme.getTime()+ updateInterval);

				
				
				// pushing the new values
				dataPoints1.push({
					x: timme.getTime(),
					//y: yValue1
				});
dataPoints2.push({
					x: timme.getTime(),
					//y: yValue1
				});
dataPoints3.push({
					x: timme.getTime(),
					//y: yValue1
				});
dataPoints4.push({
					x: timme.getTime(),
					//y: yValue1
				});
				
dataPoints5.push({
					x: timme.getTime(),
					//y: yValue1
				});
				


			

			// updating legend text with  updated with y Value 
			
			

			chart.render();

		}

		// generates first set of dataPoints 
		updateChart(chart, 3000);

	
		 
		

if (begin) 
{
tauxsucces(60,40);
begin = false;
restartChart();
}


chart4 = new CanvasJS.Chart("debit2",{
			zoomEnabled: true,
			exportEnabled: true,
			title: {
				text: "Initial buffering time"		
			},
			toolTip: {
				shared: true
				
			},
			legend: {
				verticalAlign: "top",
				horizontalAlign: "center",
                                fontSize: 14,
				fontWeight: "bold",
				fontFamily: "calibri",
				fontColor: "dimGrey"
			},
			axisX: {
				
				title: "Date"
			},
			axisY:{
				title: "S",
                                sufix: 'ms',
				includeZero: false
			}, 
			data: [{ 
				// dataSeries1
				type: "line",
				xValueType: "dateTime",
				showInLegend: true,
				name: "Service access time",
				dataPoints: dataPoints3
			},
{				
				// dataSeries2
				type: "line",
				xValueType: "dateTime",
				showInLegend: true,
				name: "Reproduction start delay" ,
				dataPoints: dataPoints6
			},
{				
				// dataSeries2
				type: "line",
				xValueType: "dateTime",
				showInLegend: true,
				name: "Initial buffering time" ,
				dataPoints: dataPoints7
			}
			
],
          legend:{
            cursor:"pointer",
            itemclick : function(e) {
              if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
                e.dataSeries.visible = false;
              }
              else {
                e.dataSeries.visible = true;
              }
              
            }
          }
		});




updateChart(chart4, 3000);
    
  }

/*----------------------------------------------------------
	                          Fonction pour désactiver les radio boutons
	------------------------------------------------------------*/

function disable2()
{

$("#30s2").attr('disabled', true);
$("#1min2").attr('disabled', true);
$("#2min2").attr('disabled', true);
$("#5min2").attr('disabled', true);
$("#10min2").attr('disabled', true);
$("#15min2").attr('disabled', true);
$("#30min2").attr('disabled', true);
$("#60min2").attr('disabled', true);
$("#infini").attr('disabled', true);
$("#autre2").attr('disabled', true);
$("#jr2").attr('disabled', true);
enable();
}

function enable2()
{

$("#30s2").attr('disabled', false);
$("#1min2").attr('disabled', false);
$("#2min2").attr('disabled', false);
$("#5min2").attr('disabled', false);
$("#10min2").attr('disabled', false);
$("#15min2").attr('disabled', false);
$("#30min2").attr('disabled', false);
$("#60min2").attr('disabled', false);
$("#infini").attr('disabled', false);
$("#autre2").attr('disabled', false);
$("#jr2").attr('disabled', false);
disable();
}

function disable()
{
$("#lab22").attr('disabled', true);
}

function enable()
{
$("#lab22").attr('disabled', false);
disable2();
}
/*----------------------------------------------------------
	                          Fonction pour afficher le bloc de programmation d'un test
	------------------------------------------------------------*/
function showschedDiv()
{
$("#schedDiv").show();

}
/*----------------------------------------------------------
	                          Fonction pour cacher le bloc de programmation d'un test
	------------------------------------------------------------*/
function hideschedDiv()
{
$("#schedDiv").hide();

}

		

