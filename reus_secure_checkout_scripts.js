(function($){
  $('div.gift-type-button label').click(function () {
    $('#monthly-durations').val('0');
    $('#frequency-list').val('monthly');

    $('.sustaining-frequency-container').hide();
    $('.sustaining-duration-container').hide();
  });
})(jQuery);
