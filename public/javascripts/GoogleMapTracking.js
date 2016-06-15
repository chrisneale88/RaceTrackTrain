// Google Map Tracking Scripts

//GLOBAL VARIABLES
var compass = null,
    needle = null,
    ctx = null,
    degrees = 0;

	function initialize() {
      //  var socket = io();
        var lat = -23.12899428;
        var lng = 150.78;

        var mapOptions = {
            zoom: 14,
            center: new google.maps.LatLng(lat, lng),
            mapTypeId: google.maps.MapTypeId.SATELLITE,
            disableDefaultUI: true,
            disableDoubleClickZoom: true,
            scrollwheel: false
        };

        var map = new google.maps.Map(document.getElementById('map-canvas'),
            mapOptions);

        var poly = new google.maps.Polyline(
            {
                strokeColor: '#000000',
                strokeOpacity: 1.0,
                strokeWeight: 3
            });
        poly.setMap(map);


        // get the mag-canvas element.
        var mag = document.getElementById("mag-canvas");

        // is HTML Canvas supported?
        if (mag.getContext("2d")) {
            ctx = mag.getContext('2d');

            // load the needle image.
            needle = new Image();
            needle.src = '/images/halfneedle.png';

            // load the compass image.
            compass = new Image();
            compass.src = "/images/halfcompass.png";

            compass.onload = draw(0);
        } else {
            alert("canvas not supported");
        }

        function draw( degrees ) {
            clearCanvas();

            // draw the compass on the canvas.
            ctx.drawImage(compass, 0, 0);

            // save the current drawing state.
            ctx.save();

            // reposition to draw needle.
            ctx.translate(50, 50);

            // rotate needle around this point.
            ctx.rotate(degrees * ( Math.PI / 180 ));

            // draw the needle.
            ctx.drawImage(needle, -50, -50);

            // restore the previous drawing state
            ctx.restore();
        };

        // Draw Compass and get ready to receive mag events.
        function clearCanvas() {
            // clear the canvas
            ctx.clearRect(0, 0, 100, 100);
        };

      //  socket.on("newMag", function(degree){
      //      draw(degree);
      //  });
    }
