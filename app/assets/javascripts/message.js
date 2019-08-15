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

	function buildImageHTML(imageUrl) {
		var html = `	<img class="message__image" src="${imageUrl}">`;
		return html;
	};

	function buildEndHTML() {
		var html = '</div>';
		return html;
	};

	$('.input-form').on('submit', function(e){
		e.preventDefault();

		// フォーム未入力チェック
		if ($('#message_text').val() === "" && $('#fileselect').val() === "") {
			alert("メッセージを入力してください");
			return false;
		}

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
			};
			if (data.image.url !== null) {
				htmlArray.push(buildImageHTML(data.image.url));
			};
			htmlArray.push(buildEndHTML());
			var html = htmlArray.join('\n');
			$('.messages').append(html);
			$('.input-form__input-area').val('');
			$('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'slow', 'swing');
		})
		.fail(function(){
			alert('Something wrong occurred.');
		});
	}) 
});