//Create an XMLHttpRequest Object and Callback Function
function loadXMLDoc(phpname){
   var xmlhttp;
   if (window.XMLHttpRequest){
      // code for IE7+, Firefox, Chrome, Opera, Safari
      xmlhttp=new XMLHttpRequest();
   }  
   else {
        // code for IE6, IE5
      xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
      try {
            xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
      } 
      catch(e){
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
      }

   } 

   xmlhttp.onreadystatechange=function(){
        if (xmlhttp.readyState==4 && xmlhttp.status==200){
           //paser json format and call AppendRow function
           var jsonObj = JSON.parse(xmlhttp.responseText);
           var num_row = jsonObj.syslog.length;   
           for(i = 0;i<num_row -1;i++){ 
               var time = jsonObj.syslog[i].time;
               var computer = jsonObj.syslog[i].computer;
               var service = jsonObj.syslog[i].service;
               var message = jsonObj.syslog[i].message;
               AppendRow(time,computer,service,message) ; 
           }     
        }
   }
   xmlhttp.open("GET",phpname,true);
   xmlhttp.send();

}
//Append new row at the end of the table
function AppendRow(time,computer,service,message){

    table=document.getElementById('tb');
    var row = document.createElement("tr");
    var col = document.createElement("td");
    var cellText = document.createTextNode(time);
    col.appendChild(cellText);
    row.appendChild(col);
 
    col = document.createElement("td");
    cellText = document.createTextNode(computer);
    col.appendChild(cellText);
    row.appendChild(col);

    col = document.createElement("td");
    cellText = document.createTextNode(service);
    col.appendChild(cellText);
    row.appendChild(col);
 
    col = document.createElement("td");
    cellText = document.createTextNode(message);
    col.appendChild(cellText);
    row.appendChild(col); 

    table.appendChild(row);

}
// load intial syslog  data 
loadXMLDoc("initial.php") ;
// load new syslog data
window.onload=setInterval(function(){

      loadXMLDoc("update.php");},500);
