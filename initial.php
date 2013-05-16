<?
$file_handle = fopen("initial.log", "r");
$syslog = array();
// load intial data
while (!feof($file_handle)) {
      $line = fgets($file_handle);
      array_push($syslog,$line) ;
      }

$num_log = count($syslog) ;
$submit_json =array();
$log =array();
// split field and build json
for ($i=0;$i<$num_log;$i++){ 
     $item =array();
     $separate = split(" ",$syslog[$i]) ;
     $time =  $separate[0]." ".$separate[1]." ".$separate[2] ;
     $computer =  $separate[3] ;
     $service =  $separate[4];
     $message = $separate[5] ;
     for($s=6;$s<count($separate);$s++){
         $message = $message." ".$separate[$s] ;          
         }
     $item['time'] = $time ;
     $item['computer'] = $computer;
     $item['service'] = $service;
     $item['message'] = $message ;
     array_push($log,$item) ;
     } 
$submit_json['syslog'] = $log ;
// return json
echo json_encode( $submit_json );
fclose($file_handle);

?>
