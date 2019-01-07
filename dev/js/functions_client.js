//Selectpicker
$('.selectpicker').selectpicker();

//Solicite uma Proposta
$(document).on('click', '#utilP', function(e) {
    $('#carProposta .listCars').addClass('hidden');
    $('#carProposta .listUtil').removeClass('hidden');
});

$(document).on('click', '#carP', function(e) {
    $('#carProposta .listUtil').addClass('hidden');
    $('#carProposta .listCars').removeClass('hidden');    
});

//Showroom
$(function() {
	var selectedClass = "";
	$(".fil-cat").click(function(){ 
		selectedClass = $(this).attr("data-rel"); 
		$("#veiculos").fadeTo(100, 0.1);
		$(".veic").not("."+selectedClass).fadeOut().removeClass('scale-anm');
    setTimeout(function() {
      $("."+selectedClass).fadeIn().addClass('scale-anm');
      $("#veiculos").fadeTo(300, 1);
    }, 300); 
	});
});

//Simule (modal)
$(document).on( "click", '.btSimule', function(e) {
   $('#modalSimule').modal('show');
});


