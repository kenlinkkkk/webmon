<?php
require 'autoload.php';
$Config = new CallConfig();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1" /> 
    <title>V-Monitor - <?php echo Misc::getHostname(); ?></title>
    <link rel="stylesheet" href="web/css/utilities.css" type="text/css">
    <link rel="stylesheet" href="web/css/frontend.css" type="text/css">
    <link rel="icon" type="image/x-icon" href="favicon.ico">
    <!--[if IE]>
    <script src="http://html5shiv.googlecode.com/svn/trunk/html5.js"></script>
    <![endif]-->
    <script src="js/plugins/jquery-2.1.0.min.js" type="text/javascript"></script>
    <script src="js/plugins/jquery.knob.js" type="text/javascript"></script>
    <script src="js/esmtest.js" type="text/javascript"></script>
    <script>
    $(function(){
        $('.gauge').knob({
            'fontWeight': 'normal',
            'format' : function (value) {
                return value + '%';
            }
        });

        $('a.reload').click(function(e){
            e.preventDefault();
        });
        const config = <?php echo json_encode($Config->getAll(), JSON_PRETTY_PRINT); ?>;
    });
    </script>
</head>

<body class="">

<nav role="main">
    <div id="appname">
        <a href="index.php"><span class="icon-bell"></span>V-Monitor</a>
    </div>
</nav>


<div id="main-container">

    <div class="box column-left" id="esm-system">
        <div class="box-header">
            <h1>System</h1>
        </div>

        <div class="box-content">
            <table class="firstBold">
                <tbody>
                    <tr>
                        <td>Hostname</td>
                        <td id="system-hostname"></td>
                    </tr>
                    <tr>
                        <td>OS</td>
                        <td id="system-os"></td>
                    </tr>
                    <tr>
                        <td>Kernel version</td>
                        <td id="system-kernel"></td>
                    </tr>
                    <tr>
                        <td>Uptime</td>
                        <td id="system-uptime"></td>
                    </tr>
                    <tr>
                        <td>Last boot</td>
                        <td id="system-last_boot"></td>
                    </tr>
                    <tr>
                        <td>Current user(s)</td>
                        <td id="system-current_users"></td>
                    </tr>
                    <tr>
                        <td>Server date & time</td>
                        <td id="system-server_date"></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    <div class="box column-right" id="esm-disk">
        <div class="box-header">
            <h1>Disk usage</h1>
        </div>

        <div class="box-content">
            <table>
                <thead>
                <tr>
                    <?php if ($Config->get('disk:show_filesystem')): ?>
                        <th class="w10p filesystem">Filesystem</th>
                    <?php endif; ?>
                    <th class="w20p">Mount</th>
                    <th>Use</th>
                    <th class="w15p">Free</th>
                    <th class="w15p">Used</th>
                    <th class="w15p">Total</th>
                </tr>
                </thead>
                <tbody>

                </tbody>
            </table>
        </div>
    </div>

    <div class="cls"></div>

    <div class="box column-left" id="esm-memory">
        <div class="box-header">
            <h1>Memory</h1>
        </div>

        <div class="box-content">
            <table class="firstBold">
                <tbody>
                    <tr>
                        <td class="w20p">Used %</td>
                        <td><div class="progressbar-wrap"><div class="progressbar" style="width: 0%;">0%</div></div></td>
                    </tr>
                    <tr>
                        <td class="w20p">Used</td>
                        <td id="memory-used"></td>
                    </tr>
                    <tr>
                        <td class="w20p">Free</td>
                        <td id="memory-free"></td>
                    </tr>
                    <tr>
                        <td class="w20p">Total</td>
                        <td id="memory-total"></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>

    <div class="t-center">
        <div class="box column-right column-left" id="esm-services">
            <div class="box-header">
                <h1>Services status</h1>
            </div>

            <div class="box-content">
                <table>
                    <tbody></tbody>
                </table>
            </div>
        </div>
    </div>

    

    <div class="cls"></div>

</div>



</body>
</html>
