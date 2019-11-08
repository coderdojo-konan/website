$(document).ready(function(){
  let main_offset = $('main').offset()
  let scroll_start = $(document).scrollTop();
  
  if (scroll_start > main_offset.top) {
    $('.navbar').addClass('is-colored')
  } else {
    $('.navbar').removeClass('is-colored')
  }

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
    const url = 'https://coderdojo-konan-website-api.herokuapp.com/form'

    e.preventDefault();

    $('.error').text('')
    $('.message').text('')
    $('.message').removeClass('success-message')
    $('.message').removeClass('error-message')
    $('#contact-form input').removeClass('is-danger')
    $('#contact-form textarea').removeClass('is-danger')

    const data = {
      name: $('#contact-form [name=name]').val(),
      email: $('#contact-form [name=email]').val(),
      subject: $('#contact-form [name=subject]').val(),
      body: $('#contact-form [name=body]').val(),
      agreePrivacyPolicy: $('#contact-form [name=agree-privacy-policy]').prop('checked'),
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
    if(!data.agreePrivacyPolicy) {
      $('.error-agreement').text('個人情報保護方針への同意をお願いします。')
      $('#contact-form [name=agree-privacy-policy]').addClass('is-danger')
      flag = false
    }

    if (flag) {
      $('#contact-form button').addClass('is-loading')
      $.post(url, data)
        .done(res => {
          if (res === 'success') {
            $('.message').text('送信に成功しました！')
            $('.message').addClass('success-message')
          } else {
            $('.message').text(`送信に失敗しました。もう一度お試しください。`)
            $('.message').addClass('error-message')
          }
          $('#contact-form button').removeClass('is-loading')
        })
        .fail(() => {
          $('.message').text(`送信に失敗しました。もう一度お試しください。`)
          $('.message').addClass('error-message')
          $('#contact-form button').removeClass('is-loading')
        })

      grecaptcha.execute('6LeDrL8UAAAAAN0WsBFZK60QCR7E4QEjSOFUCM_-', {action: 'homepage'}).then(function(token) {
        $('.recaptcha-token').val(token);
      })
    } else {
      $('.message').text('不足している項目があります。ご確認ください。')
      $('.message').addClass('error-message')

      return flag
    }
  })
});