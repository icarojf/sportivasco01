/*Variables globales*/
var myLocation = new google.maps.LatLng(5.067132,-75.51828799999998);
var servidorUrl = 'http://sportivas.com.co/';

var map, mapEscenarios, mapEventos;
var listaEscenariosCiudad;
var markers = [];

var escenariosCiudad = [];// = ['Bosque popular', 'Coliseo mayor', 'Coliseo menor', 'Club Manizales', 'Escenario 1'];
var eventosCiudad = [];// = ['Bosque popular', 'Coliseo mayor', 'Coliseo menor', 'Club Manizales', 'Escenario 1'];


function abrirDescripcion(idD){
	$("#descrip_"+idD).toggle();
}
	
 $(document).ready(function () {
 
	//navigator.splashscreen.hide();

	google.maps.event.addDomListener(window, 'load', inicializarMapa);
	google.maps.event.addDomListener(window, 'load', listarEscenarios);
	google.maps.event.addDomListener(window, 'load', listarEventos);
	
	$('.nav a').on('click', function(){
		//$(".btn-navbar").click(); //bootstrap 2.x
		$(".navbar-toggle").click() //bootstrap 3.x by Richard
	});
	$('.nav li a').on('click', function() {
		$(this).parent().parent().find('.active').removeClass('active');
		$(this).parent().addClass('active').css('font-weight', 'bold');
	});
	
	//servicioObtenerEscenarios();
	listaEscenariosCiudad = '[{"id":"2","nombre":"Bosque Popular","longitud":"-75.473853","latitud":"5.036146","direccion":"Cra 31 Via Enea","imagen":"_files\/escenario\/img\/20140803122230000000-__-bosque.jpg","telefono":"8890000","encargado":"Arnulfo Guar\u00edn"},{"id":"1","nombre":"Coliseo Mayor","longitud":"-75.487366","latitud":"5.057593","direccion":"Cra 23 # 63 - 18","imagen":"_files\/escenario\/img\/20140803122230000000-__-coliseo.jpeg","telefono":"8890000","encargado":"Mart\u00edn Munevar"}]';
	listaEscenariosCiudad =eval(listaEscenariosCiudad);
	
	$.each(listaEscenariosCiudad, function (indice, dato) {	
		escenariosCiudad[indice] = dato.nombre;
 	});
	
	var listaEventosCiudad = '[{"id":"2","titulo":"Torneo de Ultimate Femenino","fecha":"2014-08-22","hora":"10:00","descripcion":"Torneo Femenino de Ultimate que se llevar\u00e1 a cabo en las instalaciones del bosque popular cerca a la cafeter\u00eda.","telefono":"8890000","email":"contacto@correo.com","escenario-nombre":"Bosque Popular","escenario-latitud":"5.036146","escenario-longitud":"-75.473853","escenario-direccion":"Cra 31 Via Enea"},{"id":"1","titulo":"Caminata Campa\u00f1a Contra el Cancer de mama","fecha":"2014-08-08","hora":"09:00","descripcion":"Marcha para tomar conciencia de los cuidados para combatir el c\u00e1ncer de mama.","telefono":"8890000","email":"contacto@correo.com","escenario-nombre":"Coliseo Mayor","escenario-latitud":"5.057593","escenario-longitud":"-75.487366","escenario-direccion":"Cra 23 # 63 - 18"}]';
	listaEventosCiudad =eval(listaEventosCiudad);
	
	//servicioObtenerEventos();
	$.each(listaEventosCiudad, function (indice, dato) {	
		eventosCiudad[indice] = dato.titulo;
 	});
	
	
	var listaPublicaciones = '[{"id":"1","titulo":"As\u00ed va la novela de la continuidad de Jos\u00e9 P\u00e9kerman","fecha":"2014-08-03","fuente":"http:\/\/www.eltiempo.com\/deportes\/futbol\/proceso-de-renovacion-de-pekerman-con-la-seleccion-colombia\/14335035","descripcion":"Este s\u00e1bado, en Buenos Aires, se esperaba el primer encuentro cara a cara entre Luis Bedoya, el presidente de la Federaci\u00f3n Colombiana de F\u00fatbol (Colf\u00fatbol) y Pascual Lezcano, el empresario del entrenador Jos\u00e9 P\u00e9kerman, el director t\u00e9cnico que en los dos \u00faltimos a\u00f1os y medio clasific\u00f3 a la Selecci\u00f3n Colombia a un mundial de f\u00fatbol tras 16 a\u00f1os y tres intentos consecutivos de fracasos, y logr\u00f3 la m\u00e1s vibrante y brillante participaci\u00f3n jam\u00e1s lograda en un mundial con su llegada a los cuartos de final de la reciente Copa del Mundo de Brasil 2014.","imagen":"_files\/publicacion\/img\/20140803122230000000-__-pekerman.jpg","usuario-nombre":"Admin","usuario-apellido":"Admin","usuario-nickname":"admin"},{"id":"2","titulo":"Julia Takacs oro y Record en el Campeonato Iberoameriacano","fecha":"2014-08-03","fuente":"http:\/\/mujerydeporte.org\/w\/?p=8275","descripcion":"La espa\u00f1ola Julia Takacs super\u00f3 hoy el r\u00e9cord de los 10 kil\u00f3metros marcha del Campeonato Iberoamericano de Atletismo, que comenz\u00f3 hoy en Sao Paulo, y se hizo con la medalla de oro de la prueba.<br>La madrile\u00f1a se impuso en 43:10.95 y bati\u00f3 as\u00ed la marca realizada por la portuguesa Ana Cabecinha en el Campeonato Iberoamericano en 2010 (43:31.21), seg\u00fan inform\u00f3 la asesor\u00eda de prensa del torneo.","imagen":"_files\/publicacion\/img\/20140803122230000000-__-julia.jpg","usuario-nombre":"Admin","usuario-apellido":"Admin","usuario-nickname":"admin"},{"id":"3","titulo":"Banquillo, en femenino","fecha":"2014-08-03","fuente":"http:\/\/deportes.elpais.com\/deportes\/2014\/07\/29\/actualidad\/1406652471_582011.html","descripcion":"Ha entrado en la historia por ser quien es, o mejor, por lo que es. Aunque no le guste y lo demuestre continuamente. \u201cNo es un orgullo para m\u00ed, no lo veo as\u00ed\u201d, asegura Corinne Diacre, que lleva tres semanas al frente del Clermont Foot, un modesto equipo de la Segunda Divisi\u00f3n francesa, lo que la convierte en la primera mujer que dirige a un equipo profesional de f\u00fatbol masculino.","imagen":"_files\/publicacion\/img\/20140803122230000000-__-femenino.jpg","usuario-nombre":"Admin","usuario-apellido":"Admin","usuario-nickname":"admin"}]';
	//listaPublicaciones = eval(listaPublicaciones.replace(/-/g, "_"));	
	listaPublicaciones = eval(listaPublicaciones.replace(/usuario-nombre/g,"usuario_nombre"));
	
	//servicioObtenerPublicaciones();
	$.each(listaPublicaciones, function (indice, dato) {	
		//publicaciones[indice] = dato.titulo;
		var articulo ='<div class="media well">'+
							'<a href="#" class="pull-left">'+
							'	<img src="http://f3.trucoteca.com/logros/beijing-2008-el-videojuego-oficial-de-los-juegos/xbox-360-gran-clase-en-ciclismo_bn.jpg" class="media-object photoProfile" alt="" />'+
							'</a>'+
							'<div class="media-body">'+
						'	<h4 class="media-heading">'+dato.usuario_nombre+'</h4>'+dato.titulo + 						
						'</div>'+
						'<br/>'+
						'<img alt="32x32" src="'+servidorUrl+dato.imagen+'" style="width: 100%;" onclick="abrirDescripcion('+dato.id+')" />'+
						'<br/>'+
						'<div id="descrip_'+dato.id+'" style="display:none">'+ dato.descripcion+'</div>'+
						'<br/>'+
						'<div class="input-group">'+
						'  <span class="input-group-addon"><i class="glyphicon glyphicon-heart"></i><span class="badge">11</span></span>'+
						'  <span class="input-group-addon"><i class="glyphicon glyphicon-comment"></i><span class="badge">20</span></span>'+
						'  <span class="input-group-addon"><i class="glyphicon glyphicon-share"></i></span>'+
						'</div>'+					
					'</div>';
		$("#publicacionesMuro").append(articulo);
		
 	});
	
	
	
	// Workaround for bug in mouse item selection
	$.fn.typeahead.Constructor.prototype.blur = function() {
		var that = this;
		setTimeout(function () { that.hide() }, 250);
	};
		 
	$('#escenarios_busqueda').typeahead({
		source: function(query, process) {
		return escenariosCiudad;
		}
	});
	
	$('#escenarios_busqueda').on('change', function(event) {
		clearMarkers();
		setInMap(map, event.target.value, escenariosCiudad);
	});
	
	
	$('#nombreEscenarioUno_busqueda').typeahead({
		source: function(query, process) {
		return escenariosCiudad;
		}
	});
	
	$('#nombreEscenarioUno_busqueda').on('change', function(event) {
		clearMarkers();
		setInMap(mapEscenarios, event.target.value, escenariosCiudad);
	});
	
	$('#nombreEventoUno_busqueda').typeahead({
		source: function(query, process) {
		return eventosCiudad;
		}
	});
	
	$('#nombreEventoUno_busqueda').on('change', function(event) {
		clearMarkers();
		setInMap(mapEventos, event.target.value, eventosCiudad);
	});
  
});

function servicioObtenerEscenarios(){
		try{
			$.ajax({
				type: "POST",
				url: servidorUrl +'_common/_ajax/escenario.php',
				dataType: 'json', 
				async:false,
				data:{o:1},				
				success: function(msg) { 
						AjaxOK(msg);
				},
				error: AjaxError
				});
		
		}catch(exception){alert('e:'+exception)}

		function AjaxOK(result) {
			if(result=="1"){
				alert('no hay escenarios');
			}else{
				
				listaEscenariosCiudad =eval(result);
				//alert('escenarios:'+listaEscenariosCiudad.length);
			}
		} 
		
		function AjaxError(result) { 
			 alert("ERROR " + result.status + ' ' + result.statusText);
		}
}

function servicioObtenerEventos(){
		try{
			$.ajax({
				type: "POST",
				url: servidorUrl +'_common/_ajax/evento.php',
				dataType: 'json', 
				async:false,
				data:{o:1},				
				success: function(msg) { 
						AjaxOK(msg);
				},
				error: AjaxError
				});
		
		}catch(exception){alert('e:'+exception)}

		function AjaxOK(result) {
			if(result=="1"){
				alert('no hay eventos');
			}else{
				
				listaEventosCiudad =eval(result);
				//alert('eventos:'+listaEventosCiudad.length);
			}
		} 
		
		function AjaxError(result) { 
			 alert("ERROR " + result.status + ' ' + result.statusText);
		}
}


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

function abrirPanelEventosBusqueda(){
	cerrarPaneles();
	listarEventos();
	$("#panelEventosBusqueda").show();
	google.maps.event.trigger(mapEventos, 'resize');
}

function abrirPanelEscenarios(){
	cerrarPaneles();
	listarEscenarios();	
	$("#panelEscenarios").show();
	google.maps.event.trigger(mapEscenarios, 'resize');
}

function abrirPanelLogin(){
	cerrarPaneles();
	$("#panelLogin").show();
}

function cerrarPaneles(){
	$("#panelLogin").hide();
	$("#panelMuro").hide();
	$("#panelEvento").hide();
	$("#panelEventosBusqueda").hide();
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
				url: servidorUrl +'_common/_ajax/login.php',
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
				url: servidorUrl + '_common/_ajax/registro.php',
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
	markers = [];
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

             /*var marker = new google.maps.Marker({
                 map: map,
                 position: latlng,
                 title: 'Ubicacion actual',
				 draggable:true,
				 animation: google.maps.Animation.DROP,
             });
			 google.maps.event.addListener(marker, 'click', toggleBounce);*/

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



// Sets the map on all markers in the array.
function setInMap(mapAux, value, array) {
  for (var i = 0; i < markers.length; i++) {
	if(array[i]==value){
		markers[i].setMap(mapAux);
	}
  }
}

// Sets the map on all markers in the array.
function setAllMap(mapAux) {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(mapAux);
  }
}

// Removes the markers from the map, but keeps them in the array.
function clearMarkers() {
  setAllMap(null);
}

// Shows any markers currently in the array.
function showMarkers() {
  setAllMap(mapAux);
}


/* Fin Mapa */
  
  /*listar escenarios*/
  function listarEscenarios(){
	markers = [];
	//var listaEscenariosCiudad = '[{"id":"2","nombre":"Bosque Popular","longitud":"-75.473853","latitud":"5.036146","direccion":"Cra 31 Via Enea","imagen":"_files\/escenario\/img\/20140803122230000000-__-bosque.jpg","telefono":"8890000","encargado":"Arnulfo Guar\u00edn"},{"id":"1","nombre":"Coliseo Mayor","longitud":"-75.487366","latitud":"5.057593","direccion":"Cra 23 # 63 - 18","imagen":"_files\/escenario\/img\/20140803122230000000-__-coliseo.jpeg","telefono":"8890000","encargado":"Mart\u00edn Munevar"}]';
	listaEscenariosCiudad =eval(listaEscenariosCiudad);
	
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
			 
				//console.log(listaEscenariosCiudad.length)
				$.each(listaEscenariosCiudad, function (indice, valor) {	
					//console.log(valor)
					setTimeout(function() {
					//console.log(valor.id)
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
					  content: '<b>' + valor.nombre + '</b></br> ' + valor.direccion + '</br><img src="' + servidorUrl + valor.imagen + '" alt="" height="128" width="128">  '
					});
					
					google.maps.event.addListener(marker, 'click', function() {
						this.info.open(mapEscenarios, marker);
					});
				  markers.push(marker);
				  
				}, indice * 500);
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
  
  
  /*listar eventos*/
  function listarEventos(){
	markers = [];
	//servicio retorna este json
	var listaEventosCiudad = '[{"id":"2","titulo":"Torneo de Ultimate Femenino","fecha":"2014-08-22","hora":"10:00","descripcion":"Torneo Femenino de Ultimate que se llevar\u00e1 a cabo en las instalaciones del bosque popular cerca a la cafeter\u00eda.","telefono":"8890000","email":"contacto@correo.com","escenario-nombre":"Bosque Popular","escenario-latitud":"5.036146","escenario-longitud":"-75.473853","escenario-direccion":"Cra 31 Via Enea"},{"id":"1","titulo":"Caminata Campaña Contra el Cancer de mama","fecha":"2014-08-08","hora":"09:00","descripcion":"Marcha para tomar conciencia de los cuidados para combatir el c\u00e1ncer de mama.","telefono":"8890000","email":"contacto@correo.com","escenario-nombre":"Coliseo Mayor","escenario-latitud":"5.057593","escenario-longitud":"-75.487366","escenario-direccion":"Cra 23 # 63 - 18"}]';
	listaEventosCiudad = eval(listaEventosCiudad.replace(/-/g, ""));	
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

             mapEventos = new google.maps.Map(document.getElementById('map-container-events'), mapOptions);

             var latlng = new google.maps.LatLng(latitude, longitude);
             mapEventos.setCenter(latlng);
			
			var image = 'img/puntoActual.png';	
             var marker = new google.maps.Marker({
                 map: mapEventos,
                 position: latlng,
                 title: 'Mi ubicacion!',
				 draggable:true,
				 animation: google.maps.Animation.DROP,
				 icon: image

             });
			 //console.log(eventosCiudad);
			 google.maps.event.addListener(marker, 'click', toggleBounce);
			 
				//console.log(listaEventos.length)
				$.each(listaEventosCiudad, function (indice, valor) {	
					//console.log(valor.escenariolatitud)
					setTimeout(function() {
					
					var imageIcon2 = 'img/puntoEvento.png';	
				  
					var marker = new google.maps.Marker({
						position: new google.maps.LatLng(valor.escenariolatitud,"-"+valor.escenariolongitud),
						map: mapEventos,
						draggable: false,
						animation: google.maps.Animation.DROP,
						icon: imageIcon2,
						clickable: true
					  })
					marker.info = new google.maps.InfoWindow({
					  content: '<b>' + valor.titulo + '</b></br> ' + valor.escenariodireccion
					});
					google.maps.event.addListener(marker, 'click', function() {
						this.info.open(mapEventos, marker);
					});
					
				  markers.push(marker);
				 
				}, indice * 500);
			});
		}
			 

     });
	 
	
	
  }
	
	