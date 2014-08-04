function abrirPanelEventos(){
	cerrarPaneles();
	$("#panelEvento").show();
}

function abrirPanelPrincipal(){
	cerrarPaneles();
	$("#panelPrincipal").show();
	//$("body").css('background', 'none');
}

function abrirPanelRegistrarDeportes(){
	cerrarPaneles();
	$("#panelRegistrarDeportes").show();
}

function cerrarPaneles(){
	$("#panelLogin").hide();
	$("#panelPrincipal").hide();
	$("#panelEvento").hide();
	$("#panelRegistrarDeportes").hide();
}

$( document ).ready(function() {

	$("#btn-login").click(function() {	
		abrirPanelPrincipal();
		/*try{
		
			$.ajax({
				type: "GET",
				crossDomain: true,
				contentType: "application/json; charset=utf-8", 
				headers: { 'Access-Control-Allow-Origin': '*' },
				url: 'http://sportivas.com.co/_common/_ajax/login.php?callback=?',
				dataType: 'json', 
				async:false,
				data:{u:'icarojf@gmail.com', p:'fbc71ce36cc20790f2eeed2197898e71'},
				
				success: function(msg) { 
						AjaxOK(msg);
					 },
					 error: AjaxError
				});
		
		}catch(exception){alert(exception)}

		function AjaxOK(result) {
					alert(result.d);
				} 
				function AjaxError(result) { 
					 alert("ERROR " + result.status + ' ' + result.statusText);
				 } */
	});
	
	
	$("#btn-signup").click(function() {	
		try{
			$.ajax({
				type: "GET",
				crossDomain: true,
				contentType: "application/json; charset=utf-8", 
				headers: { 'Access-Control-Allow-Origin': '*' },
				url: 'http://sportivas.com.co/_common/_ajax/registro.php?callback=?',
				dataType: 'jsonp', 
				async:false,
				data: {n:'usuario1', a : 'apellido', e : 'u@gmail.com',f : '01/02/2014',c : CryptoJS.MD5('123'), k : 'nickname'}, 
				
				success: function (data, textStatus, jqXHR) {
					
					console.log(data);
					alert(data);
									//abrirPanelPrincipal();
					
				},
				error: function (jqXHR, textStatus, errorThrown) {
					alert('error:'+jqXHR)
					alert('error:'+textStatus)
					alert('error:'+errorThrown)
					console.log(jqXHR); console.log(textStatus); console.log(errorThrown);
				}
			});

		}catch(exception){alert(exception)}
	});	

});/*Document Ready*/


/*********** MAPAS *****************/
/*Mapa*/
function init_map() {
  var myLocation = new google.maps.LatLng(45.430817,12.331516);
	
  var mapOptions = {
	center: myLocation,
	zoom: 14
  };
  
  var marker = new google.maps.Marker({
	  position: myLocation,
	  title:"Peggy Guggenheim Collection"});
	  
  var map = new google.maps.Map(document.getElementById("map-container"),
	  mapOptions);
  
  marker.setMap(map);	

}

google.maps.event.addDomListener(window, 'load', init_map);
/* Fin Mapa */


/*Autocompletar*/
  var substringMatcher = function(strs) {
	  return function findMatches(q, cb) {
	  var matches, substrRegex;

	  // an array that will be populated with substring matches
	  matches = [];
	   
	  // regex used to determine if a string contains the substring `q`
	  substrRegex = new RegExp(q, 'i');
	   
	  // iterate through the pool of strings and for any string that
	  // contains the substring `q`, add it to the `matches` array
	  $.each(strs, function(i, str) {
		  if (substrRegex.test(str)) {
			  // the typeahead jQuery plugin expects suggestions to a
			  // JavaScript object, refer to typeahead docs for more info
			  matches.push({ value: str });
		  }
	  });
	   
	  cb(matches);
	  };
  };

  var escenarios = ['Bosque popular', 'Coliseo mayor', 'Coliseo menor', 'Club Manizales', 'Escenario 1'];

  $('#escenarios .typeahead').typeahead({
	  hint: true,
	  highlight: true,
	  minLength: 1
  },
  {
	  name: 'escenarios',
	  displayKey: 'value',
	  source: substringMatcher(escenarios)
  });
  
  /*Fin Autocompletar*/