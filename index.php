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
    <?php foreach ($Config->get('host') as $item) {?>
    <div class="box">
        <div class="box-header">
            <h1><?php echo $item['name']?></h1>
        </div>
        <div class="box" id="esm-memory-<?php echo $item['tag']?>">
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
        <div class="cls"></div>
        <div class="box column-left" id="esm-disk-<?php echo $item['tag']?>">
            <div class="box-header">
                <h1>Disk usage</h1>
            </div>

            <div class="box-content">
                <table>
                    <thead>
                    <tr>
                        <th class="w10p filesystem">Filesystem</th>
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
        <div class="t-center">
            <div class="box column-right column-right" id="esm-services-<?php echo $item['tag']?>">
                <div class="box-header">
                    <h1>Services status</h1>
                </div>

                <div class="box-content">
                    <table>
                        <tbody>

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <div class="cls"></div>
    </div>
    <?php } ?>
</div>

<script>
    $(function(){
        const config = <?php echo json_encode($Config->getAll(), JSON_PRETTY_PRINT); ?>;
        for (var node in config.host) {
            esm.getFromOtherServer(node.url, node.tag)
        }

        setInterval(function () {
            for (var node in config.host) {
                esm.getFromOtherServer(node.url, node.tag)
            }
        }, config.refresh_time * 1000)
    });
</script>

</body>
</html>
