<?php
require '../autoload.php';
$Config = new CallConfig();


$datas = array();

if (count($Config->get('ping:hosts')) > 0)
    $hosts = $Config->get('ping:hosts');
else
    $hosts = array('google.com', 'localhost');

foreach ($hosts as $host)
{
    $host_ip = '';
    $host_name = '';
    if (strpos($host, ';') > 0) {
        $host_ip = explode(';', $host)[0];
        $host_name = explode(';', $host)[1];
    } else {
        $host_ip = $host;
        $host_name = $host;
    }
    exec('/bin/ping -qc 1 '.$host_ip.' | awk -F/ \'/^rtt/ { print $5 }\'', $result);

    if (!isset($result[0]))
    {
        $result[0] = 0;
    }
    
    $datas[] = array(
        'host' => $host_ip,
        'name' => $host_name,
        'ping' => $result[0],
    );

    unset($result);
}

echo json_encode($datas);