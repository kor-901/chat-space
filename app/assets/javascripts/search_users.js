$(function() {
	function appendSearchResult(user) {
		var html = `<div class="chat-group-user clearfix">
									<p class="chat-group-user__name">${user.name}</p>
									<div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.user_id}" data-user-name="${user.name}">追加</div>
								</div>`;
		$('#user-search-result').append(html);
	};

	function appendChatMember(id, name) {
		var html = `<div class='chat-group-user'>
									<input name='group[user_ids][]' type='hidden' value='${id}'>
									<p class='chat-group-user__name'>${name}</p>
									<div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</div>
								</div>`;
		$('.chat-group-users.js-add-user').append(html);
	};

	// 検索テキストフィールド入力
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
			
			if (users.length !== 0) {
				users.forEach(function(user) {
					appendSearchResult(user);
				});
			};
		})
		.fail(function(){
			alert('ユーザー検索に失敗しました');
		});
	});

	// 追加ボタンクリック
	$(document).on('click', ".chat-group-user__btn--add", function() {
		//検索結果から削除
		$(this).parent().remove();

		// チャットメンバーに追加
		var addUserId = $(this).data('user-id');
		var addUserName = $(this).data('user-name');
		appendChatMember(addUserId, addUserName);
	});

	// 削除ボタンクリック
	$(document).on('click', ".chat-group-user__btn--remove", function() {
		$(this).parent().remove();
	});
});