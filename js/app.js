function calcolaPunti(points,margins){
    var index = 0;
    var status;
    var imageNorthLat=margins[0];
    var imageSouthLat=margins[1];
    var imageWestLong=margins[2];
    var imageEastLong=margins[3];
    var imageLongPixels=$('#map').width()+parseInt($('.map-container').css('padding-top'))+parseInt($('.map-container').css('margin-top'));
    var imageLatPixels=$('#map').height()+parseInt($('.map-container').css('padding-left'))+parseInt($('.map-container').css('margin-top'));
    var pixelsPerLat=imageLatPixels/(imageNorthLat-imageSouthLat);
    var pixelsPerLong=imageLongPixels/(imageEastLong-imageWestLong);
    $.each(points,function(){
        var xPixelPosition=(points[index].long-imageWestLong)*pixelsPerLong;
        var yPixelPosition=Math.abs(points[index].lat+imageNorthLat)*pixelsPerLat;
        if (points[index].status == 'working'){status = "green"} else if (points[index].status == 'noworking') {status = "red"} else if (points[index].status == 'incarico') {status = "yellow"}
            $('.map-container').append('<a id="dot_'+points[index].id+'" class="dot '+status+' tooltips" href="javascript:void(0);"><span>'+points[index].name+'</span></a>');
            $('#dot_'+points[index].id).css('top',yPixelPosition+'px');
            $('#dot_'+points[index].id).css('left',xPixelPosition+'px');
            index+=1;
    });
}

$(document).ready(function(){

    var italia;
    var punti;

    $.ajax({
        url: "json/Margin.json",
        data: {'margin':'italia'},
        dataType: "text",
        success: function(data) {
            console.log($.parseJSON(data));
        }
    });









    calcolaPunti(punti,italia);
});


















$('[id*="dot_"]').on('click',function(){
    var $app = $(this);
    var val = $app.attr('id');
    var str = val.substr(val.indexOf("_")+1,val.length);
    $('[id*="point_"]').hide();
    $('[id*="dot_"]').removeClass('active');
    $('[id*="tab_"]').css('opacity',0.4);
    $('#point_'+str+'_info').show();
    $(this).addClass('active');
    $('#tab_'+str).css('opacity',1);
});

$('[id*="tab_"]').on('click',function(){
    var $app = $(this);
    var val = $app.attr('id');
    var str = val.substr(val.indexOf("_")+1,val.length);
    $('[id*="point_"]').hide();
    $('[id*="dot_"]').removeClass('active');
    $('[id*="tab_"]').css('opacity',0.4);
    $('#point_'+str+'_info').show();
    $('#dot_'+str).addClass('active');
    $(this).css('opacity',1);
});

$(window).resize(function(){
    calcolaPunti(punti,italia);
});

$('#help_btn').on('click',function(){
    if ($('.side').width() == 0){
        $('.side').css({width:"19.9%"});
        $('.content-pane').css({width:"79.9%"});
        calcolaPunti(punti,italia);
    } else {
        $('.side').css({width:"0%"});
        $('.content-pane').css({width:"100%"});
        calcolaPunti(punti,italia);
    }
});
