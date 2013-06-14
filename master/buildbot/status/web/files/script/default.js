$(document).ready(function() {
	//Default text on login input fields
    $(".defaultText").focus(function(srcc) {
        if ($(this).val() == $(this)[0].value)
        {
 
            $(this).removeClass("defaultTextActive");
            $(this).val("");
        }
    });
    
    $(".defaultText").blur(function() {
        if ($(this).val() == "")
		{
            $(this).addClass("defaultTextActive");
            $(this).val($(this)[0].value);
        }
    });
    
    $(".defaultText").blur();        

    $("form").submit(function() {
		$(".defaultText").each(function() {
			if($(this).val() == this.value) 
			{
				$(this).val("");
			}
		});
	});

	$('#password-clear').show();
	$('#password-password').hide();
	 
	$('#password-clear').focus(function() {
	    $('#password-clear').hide();
	    $('#password-password').show();
	    $('#password-password').focus();
	});
	$('#password-password').blur(function() {
	    if($('#password-password').val() == '') {
	        $('#password-clear').show();
	        $('#password-password').hide();
	    }
	});

	//Show / hide

	$(function centerPopup(){
		$('.more-info-box').each(function(){
				$(this).css('left',($(window).width()-$(this).outerWidth())/ 2 + 'px');
				$(this).css('top',($(window).height()-$(this).outerHeight())/ 2 + 'px');
		});
	});
	$('.more-info').click(function(e){
		e.preventDefault();
		$('.more-info-box').hide();
		$(this).next().fadeIn('fast');
	});

	$(document, '.close-btn').click(function(e){
		if (!$(e.target).closest('.more-info-box, .more-info').length || $(e.target).closest('.close-btn').length ) {
			$('.more-info-box').fadeOut('fast');
		}
	}); 

	// class on selected menuitem
	$(function setCurrentItem(){
		var path = window.location.pathname.split("\/");
		
		 $('.top-menu a').each(function(index) {
		 	var thishref = this.href.split("\/");
	        if(thishref[thishref.length-1].trim().toLowerCase() == path[1].trim().toLowerCase())
	            $(this).parent().addClass("selected");
	    });
	});

	// check all in tables
	$(function selectAll() {
	    $('#selectall').click(function () {
	        $('#inputfields').find(':checkbox').prop('checked', this.checked);
	    });
	});

	// chrome font problem fix
	$(function chromeWin() {
		var is_chrome = /chrome/.test( navigator.userAgent.toLowerCase() );
		var isWindows = navigator.platform.toUpperCase().indexOf('WIN')!==-1;
		if(is_chrome && isWindows){
		  $('body').addClass('chrome win');

		}
	});
/*
	var pusher = new Pusher('9e21c24843450454233f'); // Replace with your app key
	var channel = pusher.subscribe('my-channel');

	channel.bind('my-event', function(data) {
  		//alert('An event was triggered with message: ' + data.message);
  		$('#esttime').html(data.message);

	});	
*/
});
var sock = null;
         var ellog = null;

         window.onload = function() {

            var wsuri;
            ellog = document.getElementById('log');

            if (window.location.protocol === "file:") {
               wsuri = "ws://localhost:9000";
            } else {
               wsuri = "ws://" + window.location.hostname + ":9000";
            }

            if ("WebSocket" in window) {
               sock = new WebSocket(wsuri);
            } else if ("MozWebSocket" in window) {
               sock = new MozWebSocket(wsuri);
            } else {
               log("Browser does not support WebSocket!");
               window.location = "http://autobahn.ws/unsupportedbrowser";
            }

            if (sock) {
               sock.onopen = function() {
                  log("Connected to " + wsuri);
               }

               sock.onclose = function(e) {
                  log("Connection closed (wasClean = " + e.wasClean + ", code = " + e.code + ", reason = '" + e.reason + "')");
                  sock = null;
               }

               sock.onmessage = function(e) {
                  log("Got echo: " + e.data);
               }
            }
         };

         function broadcast() {
            var msg = document.getElementById('message').value;
            if (sock) {
               sock.send(msg);
               log("Sent: " + msg);
            } else {
               log("Not connected.");
            }
         };
 
         function log(m) {
         	//$(ellog).html(this.innerHTML += m + '\n');
            //$(ellog).scrollTop(this.scrollHeight);
            $('#content').html(m);
            $(ellog).html(m);
         };
            
