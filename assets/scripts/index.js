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