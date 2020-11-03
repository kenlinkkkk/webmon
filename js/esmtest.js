var esm = {};

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

esm.getFromOtherServer = function(url, tag) {
    $.ajax({
        type: 'GET',
        dataType: 'json',
        url: url + '/libs/center.php',
        success: function (data) {
            // start memory
            $box_memory = $('.box#esm-memory-'+tag+' .box-content tbody');
            var memory = data.memory;
            esm.insertDatas($box_memory, 'memory-' + tag, data);
            var $progress = $('.box#esm-memory-'+tag+' .box-content tbody .progressbar');
            $progress
                .css('width', memory.percent_used+'%')
                .html(memory.percent_used+'%')
                .removeClass('green orange red');

            if (memory.percent_used <= 50)
                $progress.addClass('green');
            else if (memory.percent_used <= 75)
                $progress.addClass('orange');
            else
                $progress.addClass('red');
            //end memory

            //start box disk
            $box_disk = $('.box#esm-disk-'+tag+' .box-content tbody')
            var disk = data.disk;
            $box_disk.empty();
            for (var line in disk) {
                var bar_class = '';

                if (disk[line].percent_used <= 50)
                    bar_class = 'green';
                else if (disk[line].percent_used <= 75)
                    bar_class = 'orange';
                else
                    bar_class = 'red';

                var html = '';
                html += '<tr>';

                if (typeof disk[line].filesystem != 'undefined')
                    html += '<td class="filesystem">'+disk[line].filesystem+'</td>';

                html += '<td>'+disk[line].mount+'</td>';
                html += '<td><div class="progressbar-wrap"><div class="progressbar '+bar_class+'" style="width: '+disk[line].percent_used+'%;">'+disk[line].percent_used+'%</div></div></td>';
                html += '<td class="t-center">'+disk[line].free+'</td>';
                html += '<td class="t-center">'+disk[line].used+'</td>';
                html += '<td class="t-center">'+disk[line].total+'</td>';
                html += '</tr>';

                $box_disk.append(html);
            }
            //end box disk

            //start box services
            $box_services = $('.box#esm-services-'+tag+' .box-content tbody');
            var services = data.services;
            $box_services.empty();

            for (var line in services)
            {
                var label_color  = services[line].status == 1 ? 'success' : 'error';
                var label_status = services[line].status == 1 ? 'online' : 'offline';

                var html = '';
                html += '<tr>';
                html += '<td class="w15p"><span class="label '+label_color+'">'+label_status+'</span></td>';
                html += '<td>'+services[line].name+'</td>';
                html += '<td class="w15p">'+services[line].port+'</td>';
                html += '</tr>';

                $box_services.append(html);
            }
            // end box services
        }
    })
}


esm.getAll = function() {
    esm.getFromOtherServer();
    esm.getMemory();
    esm.getDisk();
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
    out: esm.getFromOtherServer,
    memory: esm.getMemory,
    disk: esm.getDisk,
    services: esm.getServices
};