$(function() {
	function buildStartHTML(data) {
		var html = `<div class="message">
									<div class="message__title">
										<p class="message__title__username">${data.user_name}</p>
										<p class="message__title__timestamp">${data.created_at}</p>
									</div>`;
		return html;
	};

	function buildTextHTML(text) {
		var html = `	<p class="message__text">${text}</p>`;
		return html;
	};

	function buildEndHTML() {
		var html = '</div>';
		return html;
	};

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
			var htmlArray = new Array(buildStartHTML(data));
			if (data.text !== "") {
				htmlArray.push(buildTextHTML(data.text));
			}
			htmlArray.push(buildEndHTML());
			var html = htmlArray.join('\n');
			$('.messages').append(html);
		})
		.fail(function(){

		});
	}) 
});