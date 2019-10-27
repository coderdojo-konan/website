$(document).ready(() => {
  $(".responsive-iframe").cbIframeSize();
});

$('.navbar-burger').on('click', e => {
  $('#navBurger').hasClass('is-active') ? $('#navBurger').removeClass('is-active') : $('#navBurger').addClass('is-active')
})

grecaptcha.ready(function() {
  grecaptcha.execute('6LeDrL8UAAAAAN0WsBFZK60QCR7E4QEjSOFUCM_-', {action: 'homepage'}).then(function(token) {
    $('.recaptcha-token').val(token);
  });
});