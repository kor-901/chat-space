$(function() {
	function appendSearchResult(user) {
		var html = `<div class="chat-group-user clearfix">
									<p class="chat-group-user__name">${user.name}</p>
									<div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.user_id}" data-user-name="${user.name}">追加</div>
								</div>`;
		$('#user-search-result').append(html);
	};

	$('#user-search-field').on('keyup', function(){
		var input = $('#user-search-field').val();

		// 検索テキスト未入力の場合
		if (input === "") {
			$('#user-search-result').empty();
			return;
		}

		$.ajax({
			type: 'GET',
			url: '/users',
			data: {keyword: input},
			dataType: 'json'
		})
		.done(function(users){
			$('#user-search-result').empty();
			
			if (users.length !==0) {
				users.forEach(function(user) {
					appendSearchResult(user);
				});
			};
		})
		.fail(function(){
			alert('ユーザー検索に失敗しました');
		});
	});
});