var ListLaporanClicked = false;

$('.ui.dropdown').dropdown()

// animating List
$('.laporan').click(function () {

    // showDetail(this.data('id'))
    let id_laporan = $(this).data('laporan-id')
    getData(id_laporan)    

    if (!ListLaporanClicked) {
        var timeline = anime.timeline({ autoplay: false })
        timeline.add({
            targets: '.laporan-container',
            opacity: 0,
            duration: 500,
            autoplay: false,
            easing: [.98, -0.01, .58, .58],
            complete: function (anim) {
                $('.laporan-container').removeClass('ten wide column').addClass('five wide column')
            }
        }).add({
            targets: '.laporan-container',
            opacity: 1,
            duration: 1000,
            autoplay: false,
            easing: [.98, -0.01, .58, .58],
            complete: function (anim) {
                $('#detail-panel').css('display', 'block')
            }
        }).add({
            targets: '#detail-panel',
            opacity: 1,
            duration: 300,
            scale: ['0', '1'],
            easing: [0.815, 0.060, 0.000, 0.845],
            elasticity: 800,
            complete: function (anim) {
                ListLaporanClicked = true
            }
        })
        timeline.play()
    } else {
        var animateDetailPanel = anime({
            targets: '#detail-panel',
            opacity: 1,
            duration: 300,
            scale: ['0', '1'],
            easing: [0.815, 0.060, 0.000, 0.845],
            elasticity: 800,
            autoplay: false
        })
        animateDetailPanel.play();
    }

})

$('#back-panel').click(function () {
    var timeline = anime.timeline({ autoplay: false })
    timeline.add({
        targets: '#detail-panel',
        opacity: 0,
        duration: 300,
        scale: ['1', '0'],
        easing: [0.815, 0.060, 0.000, 0.845],
        elasticity: 800,
        complete: function (anim) {
            $('#detail-panel').css('display', 'none')
        }

    }).add({
        targets: '.laporan-container',
        opacity: 0,
        duration: 500,
        autoplay: false,
        easing: [.98, -0.01, .58, .58],
        complete: function (anim) {
            $('.laporan-container').removeClass('five wide column').addClass('ten wide column')
        }
    }).add({
        targets: '.laporan-container',
        opacity: 1,
        duration: 1000,
        autoplay: false,
        easing: [.98, -0.01, .58, .58],
        complete: function (anim) {
            ListLaporanClicked = false
        }
    })
    timeline.play()
})

$('document').ready(function () {
    animateLanding.play()
})

var animateLanding = anime({
    targets: '.panel-container',
    scale: [0, 1],
    opacity: [0, 1],
    duration: 500,
    autoplay: false,
    easing: [0.815, 0.060, 0.000, 0.845]
})

function showDetail(data_laporan) {
    
    let colors = ['red', 'yellow', 'green']  
    console.log(data_laporan)
    
    
    $('#status-laporan').removeClass().addClass('ui mini '+colors[data_laporan.report_status]+' label')
    $('#status-laporan').html(data_laporan.status)
    $('#violation-laporan').html(data_laporan.violation)
    $('#created-laporan').html(data_laporan.created)
    $('#description-laporan').html(data_laporan.description)
    $('#username-laporan').html(data_laporan.username)
    $('#location-laporan').html(data_laporan.location)
    $('#evidence-laporan').attr('src', data_laporan.path)    
    $('#form-update, #form-delete').attr('action', '/admin/report/'+data_laporan.id)  
        
    switch(data_laporan.report_status) {
        case 0:            
            $('input[name=report_status]').val('1')
            $('#update-laporan').html('VERIFIKASI')
            break
        case 1:        
            $('input[name=report_status').val('2')
            $('#update-laporan').html('TAMBAH POINT')
            break
        case 2:                  
            $('input[name=report_status').val('3')
            $('#update-laporan').html('SELESAI')
            break
        default:            
            break
            
    }
}

function getData(id_laporan) {
    $.ajax({
        url: "/report/detail/" + id_laporan,
        method: "GET",
        dataType: "JSON",
        success: function (result) {
            showDetail(result)
        }
    });
}

$('#delete-laporan').click(function() {
   $('#form-delete').submit();        
})


$('#bars').click(function () {
    $('.mysidebar').toggle('slow')
})
