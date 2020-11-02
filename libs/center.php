<?php
require '../autoload.php';
$Config = new CallConfig();

$data = array();
$data_disk = array();

// get data service
$data_service = array();
$available_protocols = array('tcp', 'udp');
$show_port = $Config->get('services:show_port');
if (count($Config->get('services:list')) > 0)
{
    foreach ($Config->get('services:list') as $service)
    {
        $host     = $service['host'];
        $port     = $service['port'];
        $name     = $service['name'];
        $protocol = isset($service['protocol']) && in_array($service['protocol'], $available_protocols) ? $service['protocol'] : 'tcp';

        if (Misc::scanPort($host, $port, $protocol))
            $status = 1;
        else
            $status = 0;

        $data_service[] = array(
            'port'      => $show_port === true ? $port : '',
            'name'      => $name,
            'status'    => $status,
        );
    }
}
//end get data service

//get data ram
$data_memory = array();

$free = 0;

if (shell_exec('cat /proc/meminfo'))
{
    $free    = shell_exec('grep MemFree /proc/meminfo | awk \'{print $2}\'');
    $buffers = shell_exec('grep Buffers /proc/meminfo | awk \'{print $2}\'');
    $cached  = shell_exec('grep Cached /proc/meminfo | awk \'{print $2}\'');

    $free = (int)$free + (int)$buffers + (int)$cached;
}

// Total
if (!($total = shell_exec('grep MemTotal /proc/meminfo | awk \'{print $2}\'')))
{
    $total = 0;
}

// Used
$used = $total - $free;

// Percent used
$percent_used = 0;
if ($total > 0)
    $percent_used = 100 - (round($free / $total * 100));


$data_memory = array(
    'used'          => Misc::getSize($used * 1024),
    'free'          => Misc::getSize($free * 1024),
    'total'         => Misc::getSize($total * 1024),
    'percent_used'  => $percent_used,
);

//end get data ram

//get data disk

if (!(exec('/bin/df -T | awk -v c=`/bin/df -T | grep -bo "Type" | awk -F: \'{print $2}\'` \'{print substr($0,c);}\' | tail -n +2 | awk \'{print $1","$2","$3","$4","$5","$6","$7}\'', $df)))
{
    $data_disk[] = array(
        'total'         => 'N.A',
        'used'          => 'N.A',
        'free'          => 'N.A',
        'percent_used'  => 0,
        'mount'         => 'N.A',
        'filesystem'    => 'N.A',
    );
}
else
{
    $mounted_points = array();
    $key = 0;

    foreach ($df as $mounted)
    {
        list($filesystem, $type, $total, $used, $free, $percent, $mount) = explode(',', $mounted);

        if (strpos($type, 'tmpfs') !== false && $Config->get('disk:show_tmpfs') === false)
            continue;

        if (!in_array($mount, $mounted_points))
        {
            $mounted_points[] = trim($mount);

            $data_disk[$key] = array(
                'total'         => Misc::getSize($total * 1024),
                'used'          => Misc::getSize($used * 1024),
                'free'          => Misc::getSize($free * 1024),
                'percent_used'  => trim($percent, '%'),
                'mount'         => $mount,
            );

            if ($Config->get('disk:show_filesystem'))
                $data_disk[$key]['filesystem'] = $filesystem;
        }

        $key++;
    }
}
//end get data disk

// parse data

$data[] = array(
    'memory' => $data_memory,
    'disk' => $data_disk,
    'service' => $data_service,
);

echo json_encode($data);
// end parse data