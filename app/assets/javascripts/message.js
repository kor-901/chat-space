$(function() {
	$('.input-form').on('submit', function(e){
		e.preventDefault();
		var formData = new FormData(this);
		var url = $('.input-form').attr('action');

		$.ajax({
			type: "POST",
			url: url,
			data: formData,
			dataType: 'json',
			processData: false,
			contentType: false
		})
		.done(function(data){
			
		})
		.fail(function(){

		});
	}) 
});