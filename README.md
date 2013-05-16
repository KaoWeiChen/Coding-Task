Coding-Task
===========

The coding task would show syslog data by html table,as well as it immediately presnet the latest syslog.

The other files are as follows

1. index.html 

   It is a basic web page.

2. syslog.js 

   It continued to communicate with back-end ,send requst and get data.In addition, he parse 
   json format and present syslog. 

3. initial.php 

   When the web page is executed, it will deal with the past has been the presence of syslog data.
   The syslog data is from the auth.log on linux and it is converted into json format.
   
4. update.php 
   
   When it is executed , it will deal with the latest syslog data and send to the front end.
   The syslog.js will continue to use the callback function to communicate with it.
   
