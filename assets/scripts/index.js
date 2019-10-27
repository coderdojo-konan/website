$(document).ready(function(){
  let main_offset = $('main').offset()

  $(document).scroll(function(){
    scroll_start = $(document).scrollTop();
    if (scroll_start > main_offset.top) {
      $('.navbar').addClass('is-colored')
    } else {
      $('.navbar').removeClass('is-colored')
    }
  })
})

$(document).ready(function() {
  $('#contact-form').submit(function(e){
    let flag = true;

    e.preventDefault();

    $('.error').text('')
    $('.message').text('')
    $('.message').removeClass('success-message')
    $('.message').removeClass('error-message')

    const data = {
      name: $('#contact-form [name=name]').val(),
      email: $('#contact-form [name=email]').val(),
      subject: $('#contact-form [name=subject]').val(),
      body: $('#contact-form [name=body]').val(),
      recaptchaToken: $('#contact-form [name=recaptcha-token]').val()
    }

    if (!data.name) {
      $('.error-name').text('この項目は必須です。').addClass('is-danger')
      $('#contact-form [name=name]').addClass('is-danger')
      flag = false
    }
    if (!data.email) {
      $('.error-email').text('この項目は必須です。').addClass('is-danger')
      $('#contact-form [name=email]').addClass('is-danger')
      flag = false
    }
    if (!data.subject) {
      $('.error-subject').text('この項目は必須です。').addClass('is-danger')
      $('#contact-form [name=subject]').addClass('is-danger')
      flag = false
    }
    if (!data.body) {
      $('.error-body').text('この項目は必須です。')
      $('#contact-form [name=body]').addClass('is-danger')
      flag = false
    }

    if (flag) {
      $.post('http://localhost:3000/contact', data)
        .done(function(res) {
          if (res === 'success') {
            $('.message').text('送信に成功しました！')
            $('.message').addClass('success-message')
          } else {
            $('.message').text('送信に失敗しました。もう一度お試しください。')
            $('.message').addClass('error-message')
          }
        })

      grecaptcha.execute('6LeDrL8UAAAAAN0WsBFZK60QCR7E4QEjSOFUCM_-', {action: 'homepage'}).then(function(token) {
        $('.recaptcha-token').val(token);
      })
    } else {
      return flag
    }
  })
});