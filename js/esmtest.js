var esm = {};


esm.getSystem = function() {

    var module = 'system';
    var $box = $('.box#esm-'+module+' .box-content tbody');
    $.ajax({
        type: 'GET',
        dataType: 'json',
        url: 'libs/'+module+'.php',
        success: function (data) {
            esm.insertDatas($box, module, data)
        }
    })
}


esm.getLoad_average = function() {

    var module = 'load_average';

    esm.reloadBlock_spin(module);

    var $box = $('.box#esm-'+module+' .box-content');

    $.ajax({
        type: 'GET',
        dataType: 'json',
        url: 'libs/'+module+'.php',
        success: function (data) {
            esm.reconfigureGauge($('input#load-average_1', $box), data[0]);
            esm.reconfigureGauge($('input#load-average_5', $box), data[1]);
            esm.reconfigureGauge($('input#load-average_15', $box), data[2]);
        }
    })
}


esm.getCpu = function() {

    var module = 'cpu';

    esm.reloadBlock_spin(module);
    var $box = $('.box#esm-'+module+' .box-content tbody');

    $.ajax({
        type: 'GET',
        dataType: 'json',
        url: 'libs/'+module+'.php',
        success: function (data) {
            esm.insertDatas($box, module, data);
        }
    })

}


esm.getMemory = function() {

    var module = 'memory';

    esm.reloadBlock_spin(module);
    var $box = $('.box#esm-'+module+' .box-content tbody');

    $.ajax({
        type: 'GET',
        dataType: 'json',
        url: 'libs/'+module+'.php',
        success: function (data) {
            esm.insertDatas($box, module, data);

            var $progress = $('.progressbar', $box);

            $progress
                .css('width', data.percent_used+'%')
                .html(data.percent_used+'%')
                .removeClass('green orange red');

            if (data.percent_used <= 50)
                $progress.addClass('green');
            else if (data.percent_used <= 75)
                $progress.addClass('orange');
            else
                $progress.addClass('red');
        }
    })
}


esm.getSwap = function() {

    var module = 'swap';

    esm.reloadBlock_spin(module);

    var $box = $('.box#esm-'+module+' .box-content tbody');

    $.ajax({
        type: 'GET',
        dataType: 'json',
        url: 'libs/'+module+'.php',
        success: function (data) {
            esm.insertDatas($box, module, data);

            // Percent bar
            var $progress = $('.progressbar', $box);

            $progress
                .css('width', data.percent_used+'%')
                .html(data.percent_used+'%')
                .removeClass('green orange red');

            if (data.percent_used <= 50)
                $progress.addClass('green');
            else if (data.percent_used <= 75)
                $progress.addClass('orange');
            else
                $progress.addClass('red');
        }
    })
}


esm.getDisk = function() {

    var module = 'disk';

    esm.reloadBlock_spin(module);
    var $box = $('.box#esm-'+module+' .box-content tbody');

    $.ajax({
        type: 'GET',
        dataType: 'json',
        url: 'libs/'+module+'.php',
        success: function (data) {
            $box.empty();

            for (var line in data)
            {
                var bar_class = '';

                if (data[line].percent_used <= 50)
                    bar_class = 'green';
                else if (data[line].percent_used <= 75)
                    bar_class = 'orange';
                else
                    bar_class = 'red';

                var html = '';
                html += '<tr>';

                if (typeof data[line].filesystem != 'undefined')
                    html += '<td class="filesystem">'+data[line].filesystem+'</td>';

                html += '<td>'+data[line].mount+'</td>';
                html += '<td><div class="progressbar-wrap"><div class="progressbar '+bar_class+'" style="width: '+data[line].percent_used+'%;">'+data[line].percent_used+'%</div></div></td>';
                html += '<td class="t-center">'+data[line].free+'</td>';
                html += '<td class="t-center">'+data[line].used+'</td>';
                html += '<td class="t-center">'+data[line].total+'</td>';
                html += '</tr>';

                $box.append(html);
            }
        }
    })
}


esm.getLast_login = function() {

    var module = 'last_login';

    esm.reloadBlock_spin(module);
    var $box = $('.box#esm-'+module+' .box-content tbody');

    $.ajax({
        type: 'GET',
        dataType: 'json',
        url: 'libs/'+module+'.php',
        success: function (data) {
            $box.empty();

            for (var line in data)
            {
                var html = '';
                html += '<tr>';
                html += '<td>'+data[line].user+'</td>';
                html += '<td class="w50p">'+data[line].date+'</td>';
                html += '</tr>';

                $box.append(html);
            }
        }
    })
}


esm.getNetwork = function() {

    var module = 'network';

    esm.reloadBlock_spin(module);
    var $box = $('.box#esm-'+module+' .box-content tbody');

    $.ajax({
        type: 'GET',
        dataType: 'json',
        url: 'libs/'+module+'.php',
        success: function (data) {
            $box.empty();

            for (var line in data)
            {
                var html = '';
                html += '<tr>';
                html += '<td>'+data[line].interface+'</td>';
                html += '<td>'+data[line].ip+'</td>';
                html += '<td class="t-center">'+data[line].receive+'</td>';
                html += '<td class="t-center">'+data[line].transmit+'</td>';
                html += '</tr>';

                $box.append(html);
            }
        }
    })
}


esm.getPing = function(time) {

    var module = 'ping';

    // esm.reloadBlock_spin(module);
    var $box = $('.box#esm-'+module+' .box-content tbody');

    $.ajax({
        type: 'GET',
        dataType: 'json',
        url: 'libs/'+module+'.php',
        success: function (data) {
            $box.empty();
            for (var line in data)
            {
                var html = '';
                html += '<tr>';
                html += '<td>'+data[line].host+'</td>';
                html += '<td>'+data[line].name+'</td>';
                html += '<td>'+data[line].ping+' ms</td>';
                html += '</tr>';

                $box.append(html);
            }
        }
    })
}


esm.getServices = function() {

    var module = 'services';

    esm.reloadBlock_spin(module);
    var $box = $('.box#esm-'+module+' .box-content tbody');

    $.ajax({
        type: 'GET',
        dataType: 'json',
        url: 'libs/'+module+'.php',
        success: function (data) {
            $box.empty();

            for (var line in data)
            {
                var label_color  = data[line].status == 1 ? 'success' : 'error';
                var label_status = data[line].status == 1 ? 'online' : 'offline';

                var html = '';
                html += '<tr>';
                html += '<td class="w15p"><span class="label '+label_color+'">'+label_status+'</span></td>';
                html += '<td>'+data[line].name+'</td>';
                html += '<td class="w15p">'+data[line].port+'</td>';
                html += '</tr>';

                $box.append(html);
            }
        }
    })
}

esm.getFromOtherServer = function(data) {
    $.ajax({
        type: 'GET',
        dataType: 'json',
        url: 'libs/center.php',
        success: function (data) {
            console.log(data);
        }
    })
}


esm.getAll = function() {
    esm.getSystem();
    esm.getFromOtherServer(),
    esm.getCpu();
    esm.getLoad_average();
    esm.getMemory();
    esm.getSwap();
    esm.getDisk();
    esm.getLast_login();
    esm.getNetwork();
    esm.getPing();
    esm.getServices();
}

esm.reloadBlock = function(block) {

    esm.mapping[block]();

}

esm.reloadBlock_spin = function(block) {

    var $module = $('.box#esm-'+block);

    $('.reload', $module).toggleClass('spin disabled');
    // $('.box-content', $module).toggleClass('faded');
}

esm.insertDatas = function($box, block, datas) {
    for (var item in datas)
    {
        $('#'+block+'-'+item, $box).html(datas[item]);
    }
}

esm.reconfigureGauge = function($gauge, newValue) {
    // Change colors according to the percentages
    var colors = { green : '#7BCE6C', orange : '#E3BB80', red : '#CF6B6B' };
    var color  = '';

    if (newValue <= 50)
        color = colors.green;
    else if (newValue <= 75)
        color = colors.orange;
    else
        color = colors.red;

    $gauge.trigger('configure', {
        'fgColor': color,
        'inputColor': color,
        'fontWeight': 'normal',
        'format' : function (value) {
            return value + '%';
        }
    });

    // Change gauge value
    $gauge.val(newValue).trigger('change');
}


esm.mapping = {
    all: esm.getAll,
    out: esm.getFromOtherServer(),
    system: esm.getSystem,
    load_average: esm.getLoad_average,
    cpu: esm.getCpu,
    memory: esm.getMemory,
    swap: esm.getSwap,
    disk: esm.getDisk,
    last_login: esm.getLast_login,
    network: esm.getNetwork,
    ping: esm.getPing,
    services: esm.getServices
};