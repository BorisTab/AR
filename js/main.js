var rectangle;
var map;
var rightUpLat;
var rightUpLng;
var leftDownLat;
var leftDownLng;

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 55.72, lng: 37.66},
        zoom: 11
    });

    var bounds = {
        north: 55.8,
        south: 55.7,
        east: 37.75,
        west: 37.55
    };

    // Define the rectangle and set its editable property to true.
    rectangle = new google.maps.Rectangle({
        bounds: bounds,
        editable: true,
        draggable: true
    });

    rectangle.setMap(map);

    // Add an event listener on the rectangle.
    getCoordinate();
    rectangle.addListener('bounds_changed', getCoordinate);
}
// Show the new coordinates for the rectangle in an info window.

function getCoordinate(event) {
    var ne = rectangle.getBounds().getNorthEast();
    var sw = rectangle.getBounds().getSouthWest();

    rightUpLat = ne.lat();
    rightUpLng = ne.lng();
    leftDownLat = sw.lat();
    leftDownLng = sw.lng();
}
$('document').ready(function () {
    $(".coordinate-send").submit(function() {
        $('#right-up-lat').value = rightUpLat;
        $('#right-up-lng').value = rightUpLng;
        $('#left-bottom-lat').value = leftDownLat;
        $('#left-bottom-lng').value = leftDownLng;

        let th = $(this);
        $.ajax({
            type: "POST",
            url: "",              //напишешь сюда обработчик
            data: th.serialize()
        }).done(function() {
            $('.choose-zone-title').text('Спасибо!');
            $('.coordinate-send').css('display', 'none');
            setTimeout(function() {
                th.trigger("reset");
            }, 1000);
        });
        return false;
    });
});