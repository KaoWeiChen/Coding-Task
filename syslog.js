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
           var endtime = new Date() + maxtime;     
                          
           for(i = 0;i<num_row -1;i++){ 
               var time = jsonObj.syslog[i].time;
               var computer = jsonObj.syslog[i].computer;
               var service = jsonObj.syslog[i].service;
               var message = jsonObj.syslog[i].message;
               setTimeout(pushnode(time,computer,service,message),100);
               AppendRow(time,computer,service,message) ;
               
           }
           //when every item has completed, it load new data
           setTimeout(loadXMLDoc("update.php"),100);
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
loadXMLDoc("intial.php") ;



// draw graph  
var width = 1000,
    height = 700;
 
var color = d3.scale.category10();
 
var nodes = [],
    links = [];
 
var force = d3.layout.force()
    .nodes(nodes)
    .links(links)
    .charge(-200)
    .linkDistance(120)
    .size([width, height])
    .on("tick", tick);
 
var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);
 
var node = svg.selectAll(".node"),
    link = svg.selectAll(".link");
 
// 1. Add three nodes and three links.
function pushnode(time,computer,service,message) {
    var a = {id:'time',name:time}, b = {id:'computer',name:computer}, c = {id:'service',name:service} , d = {id:'message',name:message};
    nodes.push(a,b,c,d);
    links.push({source:a , target: b}, {source: b, target: c},{source: c, target: d});
    start();
    node.append("title")
        .text(function(d){return d.name;});
};
 
 

 
function start() {
  link = link.data(force.links(), function(d) { return d.source.id + "-" + d.target.id; });
  link.enter().insert("line", ".node").attr("class", "link");
  link.exit().remove();
 
  node = node.data(force.nodes(), function(d) { return d.id;});
  node.enter().append("circle").attr("class", function(d) { return "node " + d.id; }).attr("r", 5);
  node.exit().remove();
 
  force.start();
}
 
function tick() {
  node.attr("cx", function(d) { return d.x; })
      .attr("cy", function(d) { return d.y; })
 
  link.attr("x1", function(d) { return d.source.x; })
      .attr("y1", function(d) { return d.source.y; })
      .attr("x2", function(d) { return d.target.x; })
      .attr("y2", function(d) { return d.target.y; });
}
