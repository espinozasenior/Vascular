// Wait for PhoneGap to load
document.addEventListener("deviceready", onDeviceReady, false);

// PhoneGap is ready
function onDeviceReady() {
	setTimeout(function() {
		app.navigate("#indice"); // Do something after 2 seconds
		}, 2000);
	//startConfirm();
}

function onConfirm(button) {
	if (button == true) {
		setTimeout(function() {
			app.navigate("#indice"); // Do something after 2 seconds
			}, 2000);
	}
	else {
		
		navigator.app.exitApp();
	}
}

function go(id) {
	app.navigate(id);
}

function startConfirm() {
	navigator.notification.confirm(
	'Aqui según respùesta de si o no.', // message
	onConfirm, // callback to invoke with index of button pressed
	'¿Es usted profesional satnitario?', // title
	'Si, No'          // buttonLabels
	);
}

function fail(error) {
	console.log(error.code);
}

//ListView Filter Anexo

(function ($) {
	// custom css expression for a case-insensitive contains()
	jQuery.expr[':'].Contains = function(a,i,m){
		return (a.textContent || a.innerText || "").toUpperCase().indexOf(m[3].toUpperCase())>=0;
		};
	
	function filterList(header, list) { 
		// header is any element, list is an unordered list
		// create and add the filter form to the header
		var form = $("<form>").attr({"class":"filterform","action":"#"}),
		input = $("<input>").attr({"class":"filterinput","type":"search","name":"s","result":"0","id":"headeranexoss", "style":"padding-left:1%;", "placeholder":"Cercar..." });
		
		$(form).append(input).appendTo(header);
		
		$(input)
		.change( function () {
			var filter = $(this).val();
			if(filter) {
				
				$matches = $(list).find('a:Contains(' + filter + ')').parent();
				$('li', list).not($matches).slideUp();
				$matches.slideDown();
				
				} else {
				$(list).find("li").slideDown();
			}
			return false;
			})
		.keyup( function () {
			// fire the above change event after every letter
			$(this).change();
			});
	}
	
	
	//ondomready
	$(function () {
		filterList($("#form"), $("#list-anexoss"));
		filterList($("#form-buscador"), $("#list-anexos"));
		});
	}(jQuery));
//Cerrar app
function Exit() {
	navigator.app.exitApp();
}

//Ocultar cuadro de busqueda
function closeModalViewSearch() {
	$("#modalview-search").kendoMobileModalView("close");
}
function closeModalViewAnexos() {
	$("#modalview-anexos").kendoMobileModalView("close");
}
function closeModalViewListAnexos() {
	$("#modalview-list-anexos").kendoMobileModalView("close");
}

//Resaltar texto buscado
function borrarBusqueda() {
	$('span').removeClass('resaltarTexto');
}

function resaltarTexto(id,texto) {
	
	$(".resaltarTexto").each(function() {
		$(this).contents().unwrap();
		});
	
	if((texto!="") && texto!=" "){
		
		$("#"+id+" .lectura").each(function() {
			$(this).resaltar(texto, "resaltarTexto",id);
			});
		
	}
}

function highlight(original, searchterms) {
	$(".highlight").each(function() {
		$(this).contents().unwrap();
		});
	
	var terms = searchterms.split(" ");
	var output = original;
	
	for (var i = 0; i < terms.length; i++) {
		var term = terms[i];
		if (term.length <= 3) {
			// replace whole word only
			var re = new RegExp("\\b" + term + "\\b", "gi");
			output = output.replace(re, "<span class=\"highlight\">" + term + "</span>");
		}
		else {
			// replace any part of word
			var re = new RegExp(term, "gi");
			output = output.replace(re , "<span class=\"highlight\">" + term + "</span>");
		}
	}
	
	return output;
}

jQuery.fn.extend({
	resaltar: function(busqueda, claseCSSbusqueda, id){
		var regex = new RegExp("(<[^>]*>)|("+ busqueda.replace(/([-.*+?^${}()|[\]\/\\])/g,"\\$1") +')', 'ig');
		var nuevoHtml=this.html(this.html().replace(regex, function(a, b, c){
			return (a.charAt(0) == "<") ? a : "<span class=\"resaltarTexto\" data=\""+ id +"\">" + c + "</span>";
			}));
		console.log("html: "+nuevoHtml);
		return nuevoHtml;
	}
	});
// Resetear al tamaño original
var originalFontSize = $('html').css('font-size');

$(".resetFont").click(function() {
	$('.lectura').css('font-size', originalFontSize);
	});

// Disminuir tamaño fuente
function disminuirText(e) {
	var currentFontSize = $('.lectura').css('font-size');
	var currentFontSizeNum = parseFloat(currentFontSize, 10);
	var newFontSize = currentFontSizeNum * 0.8;
	$('.lectura').css('font-size', newFontSize);
	return false;
}

// Aumentar tamaño fuente
function aumentarText(e) {
	var currentFontSize = $('.lectura').css('font-size');
	var currentFontSizeNum = parseFloat(currentFontSize, 10);
	var newFontSize = currentFontSizeNum * 1.2;
	$('.lectura').css('font-size', newFontSize);
	return false;
}