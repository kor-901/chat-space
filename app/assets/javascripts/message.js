// 処理中フラグ
var isSending = false;

$(function() {
  function buildStartHTML(data) {
    var html = `<div class="message" data-message-id="${data.id}">
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

  // メッセージ送信の非同期通信
  $('.input-form').on('submit', function(e){
    e.preventDefault();

    if (isSending === true) {
      alert("処理中です");
      return;
    };

    // フォーム未入力チェック
    if ($('#message_text').val() === "" && $('#fileselect').val() === "") {
      alert("メッセージを入力してください");
      return false;
    };
    
    isSending = true;

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
      $('.input-form__send-button').prop('disabled', false);
    })
    .fail(function(){
      alert('通信に失敗しました');
    });
    isSending = false;
  })

  // 画面の自動更新
  var reloadMessages = function() {
    // ブラウザに表示されている最新メッセージのidを取得
    last_message_id = $('.message').last().data('message-id');

    $.ajax({
      type: 'GET',
      url: '/api/messages',
      dataTypd: 'json',
      data: {id: last_message_id}
    })
    .done(function(message) {
      console.log('success');
    })
    .fail(function() {
      console.log('error');
    });
  };
});