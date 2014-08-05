/*Variables globales*/
var myLocation = new google.maps.LatLng(5.067132,-75.51828799999998);


var map, mapEscenarios;
var markers = [];


 $(document).ready(function () {
	google.maps.event.addDomListener(window, 'load', inicializarMapa);
	google.maps.event.addDomListener(window, 'load', listarEscenarios);
	
	$('.nav a').on('click', function(){
		//$(".btn-navbar").click(); //bootstrap 2.x
		$(".navbar-toggle").click() //bootstrap 3.x by Richard
	});
});


function abrirPanelPrincipal(){
	cerrarPaneles();
	$("#panelPrincipal").show();
	$("#panelMuro").show();
	//$("body").css('background', 'none');
}

function abrirPanelRegistrarDeportes(){
	cerrarPaneles();
	$("#panelRegistrarDeportes").show();
}

function abrirPanelEventos(){
	cerrarPaneles();
	$("#panelEvento").show();
	inicializarMapa();
	google.maps.event.trigger(map, 'resize');
}

function abrirPanelEscenarios(){
	cerrarPaneles();
	listarEscenarios();	
	$("#panelEscenarios").show();
	google.maps.event.trigger(mapEscenarios, 'resize');
}

function cerrarPaneles(){
	$("#panelLogin").hide();
	$("#panelMuro").hide();
	$("#panelEvento").hide();
	$("#panelRegistrarDeportes").hide();
	$("#panelEscenarios").hide();
}

$( document ).ready(function() {

	$("#btn-login").click(function() {	
		abrirPanelPrincipal();
		/*try{
			var u=$("#login-username").val();
			var p=""+CryptoJS.MD5($("#login-password").val()).toString();
			//alert(u+p);
			$.ajax({
				type: "POST",
				url: 'http://sportivas.com.co/_common/_ajax/login.php',
				dataType: 'json', 
				async:false,
				data:{u:u, p:p},				
				success: function(msg) { 
						AjaxOK(msg);
				},
				error: AjaxError
				});
		
		}catch(exception){alert('e:'+exception)}

		function AjaxOK(result) {
			if(result=="1"){
				alert('usuario o password sin coincidencias');
			}else if(result.nickname!=null){
				//alert('Bienvenido '+result.nickname);
				abrirPanelPrincipal();
			}
		} 
		
		function AjaxError(result) { 
			 alert("ERROR " + result.status + ' ' + result.statusText);
		}*/
	});
	
	
	$("#btn-signup").click(function() {	
		try{
			$.ajax({
				type: "POST",
				url: 'http://sportivas.com.co/_common/_ajax/registro.php',
				dataType: 'json', 
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
function inicializarMapa() {

	geocoder = new google.maps.Geocoder();

     var address = "manizales";

     geocoder.geocode({
         'address': address
     }, function (results, status) {

         if (status == google.maps.GeocoderStatus.OK) {

             var latitude = results[0].geometry.location.lat();
             var longitude = results[0].geometry.location.lng();
             //alert(latitude);
             //alert(longitude);

             var latlng = new google.maps.LatLng(latitude, longitude);

             var mapOptions = {
                 zoom: 8,
                 center: latlng,
                 mapTypeId: google.maps.MapTypeId.ROADMAP
             }

             map = new google.maps.Map(document.getElementById('map-container'), mapOptions);

             var latlng = new google.maps.LatLng(latitude, longitude);
             map.setCenter(latlng);

             var marker = new google.maps.Marker({
                 map: map,
                 position: latlng,
                 title: 'Hello World!',
				 draggable:true,
				 animation: google.maps.Animation.DROP,


             });
			 google.maps.event.addListener(marker, 'click', toggleBounce);

         }

     });
}

function toggleBounce() {

  if (this.getAnimation() != null) {
    this.setAnimation(null);
  } else {
    this.setAnimation(google.maps.Animation.BOUNCE);
  }
}


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
  
  
  /*listar escenarios*/
  
  
  function listarEscenarios(){
  
	var listaEscenarios = '[{"id":"2","nombre":"Bosque Popular","longitud":"-75.473853","latitud":"5.036146","direccion":"Cra 31 Via Enea","imagen":"_files\/escenario\/img\/20140803122230000000-__-bosque.png","telefono":"8890000","encargado":"Arnulfo Guar\u00edn"},{"id":"1","nombre":"Coliseo Mayor","longitud":"-75.487366","latitud":"5.057593","direccion":"Cra 23 # 63 - 18","imagen":"_files\/escenario\/img\/20140803122230000000-__-coliseo.png","telefono":"8890000","encargado":"Mart\u00edn Munevar"}]';
	listaEscenarios =eval(listaEscenarios);
	geocoder = new google.maps.Geocoder();

     var address = "manizales";

     geocoder.geocode({
         'address': address
     }, function (results, status) {

         if (status == google.maps.GeocoderStatus.OK) {

             var latitude = results[0].geometry.location.lat();
             var longitude = results[0].geometry.location.lng();
             //alert(latitude);
             //alert(longitude);

             var latlng = new google.maps.LatLng(latitude, longitude);

             var mapOptions = {
                 zoom: 12,
                 center: latlng,
                 mapTypeId: google.maps.MapTypeId.ROADMAP
             }

             mapEscenarios = new google.maps.Map(document.getElementById('map-container-spaces'), mapOptions);

             var latlng = new google.maps.LatLng(latitude, longitude);
             mapEscenarios.setCenter(latlng);

			var image = 'img/puntoActual.png';	
             var marker = new google.maps.Marker({
                 map: mapEscenarios,
                 position: latlng,
                 title: 'Mi ubicacion!',
				 draggable:true,
				 animation: google.maps.Animation.DROP,
				 icon: image

             });
			 google.maps.event.addListener(marker, 'click', toggleBounce);
			 
			
				console.log(listaEscenarios.length)
				$.each(listaEscenarios, function (indice, valor) {	
					console.log(valor)
					setTimeout(function() {
					console.log(valor.id)
					var imageIcon2 = 'img/puntoEscenario.png';	
				  
					var marker = new google.maps.Marker({
						position: new google.maps.LatLng(valor.latitud,valor.longitud),
						map: mapEscenarios,
						draggable: false,
						animation: google.maps.Animation.DROP,
						icon: imageIcon2,
						clickable: true
					  })
					marker.info = new google.maps.InfoWindow({
					  content: '<b>' + valor.nombre + '</b> ' + valor.direccion + ' '
					});
					
					google.maps.event.addListener(marker, 'click', function() {
						this.info.open(mapEscenarios, marker);
					});
				  markers.push(marker);
				  
				}, indice * 1000);
			});
		}
			 
			 /*var location = new google.maps.LatLng(5.036146,-75.473853);
	var marker = new google.maps.Marker({
	  position: location,
	  title:"Escenario 1"});
	marker.setMap(mapEscenarios);	
	
	var location2 = new google.maps.LatLng(5.057593,-75.487366);
	var marker2 = new google.maps.Marker({
	  position: location2,
	  title:"Escenario 2"});
	marker2.setMap(mapEscenarios);

         }*/

     });
	 
	
	
  }
  
	
	