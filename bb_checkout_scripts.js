/* Compressed by the perl version of jsmin. */
/* JavaScript::Minifier 0.02 */
function getDonationAmount() {
  var donationAmount = 0;
  if (isDonationLevelSelected()) {
    var selectedDonationLevel = getSelectedDonationLevel();
    donationAmount = isUserSpecifiedDonationLevelSelected() ? getUserEnteredDonationAmount()  : jq('#donation_level' + selectedDonationLevel.val() + '_amount').val();
  }
  return donationAmount;
}
function haveOnlyOneDonationLevel() {
  return jq('div#donation-level-input-container label.donation-level-selector').length === 1;
}
function processSingleDonationLevel() {
  if (haveOnlyOneDonationLevel()) {
    jq('div#donation-level-input-container label.donation-level-selector').click();
  }
}
function selectDefaultDonationLevel() {
  if (!haveOnlyOneDonationLevel()) {
    var defaultDonationLevelId = jq('#defaultDonationLevelId').val();
    if (defaultDonationLevelId > 0) {
      var donationLevelLabelSelector = 'label[for=\'donation_level' + defaultDonationLevelId + '\']';
      jq(donationLevelLabelSelector).click();
    }
  }
}
function displaySustainingGiftMessage() {
  if (isSustainingGiftTypeSelected()) {
    var messagePart1 = jq('#sustaining_gift_message_part_1').val();
    var messagePart2 = jq('#sustaining_gift_message_part_2').val();
    var messagePart3 = jq('#sustaining_gift_message_part_3').val();
    var messagePart4 = jq('#sustaining_gift_message_part_4').val();
    var frequency = getSelectedFrequency();
    var duration = getSelectedDuration();
    var donationAmount = getDonationAmount();
    var frequencyModifier = _getModifiersBasedOnFrequencyAndDuration(frequency, duration);
    var nextPaymentDate = new Date();
    nextPaymentDate.setMonth(nextPaymentDate.getMonth() + frequencyModifier.monthsToAdd);
    var nextPaymentDateStr = (nextPaymentDate.getMonth() + 1) + '/' + nextPaymentDate.getDate() + '/' + nextPaymentDate.getFullYear();
    var foreverGift = (!durationExistsForFrequency(frequency)) || duration === '0';
    var totalDonationAmount = _totalDonationAmount(donationAmount, frequencyModifier);
    var sustainingGiftMessageElements = [
      messagePart1,
      ' ' + nextPaymentDateStr,
      '. ' + messagePart2,
      foreverGift ? ' ' + messagePart3 + ' ' : ' ',
      messagePart4,
      ' ',
      totalDonationAmount
    ];
    jq('div.sustaining-gift-message').text(sustainingGiftMessageElements.join(''));
    jq('div.sustaining-gift-message').show();
  }
}
function _totalDonationAmount(donationAmount, frequencyModifier) {
  return formatCurrency(amountInLowestDenomination((donationAmount * frequencyModifier.amountMultiplier).toString()), getCurrencyLocale());
}
function hideSustainingGiftMessage() {
  jq('div.sustaining-gift-message').text('');
  jq('div.sustaining-gift-message').hide();
}
function _getModifiersBasedOnFrequencyAndDuration(frequency, duration) {
  var frequencyModifier = {
  };
  if (frequency === 'monthly') {
    frequencyModifier.monthsToAdd = 1;
    frequencyModifier.amountMultiplier = 12;
  } else if (frequency === 'quarterly') {
    frequencyModifier.monthsToAdd = 3;
    frequencyModifier.amountMultiplier = 4;
  } else if (frequency === 'semi-annually') {
    frequencyModifier.monthsToAdd = 6;
    frequencyModifier.amountMultiplier = 2;
  } else {
    frequencyModifier.monthsToAdd = 12;
    frequencyModifier.amountMultiplier = 1;
  }
  if (durationExistsForFrequency(frequency) && duration > 0) {
    frequencyModifier.amountMultiplier = duration;
  }
  return frequencyModifier;
}
function getUserEnteredDonationAmount() {
  return jq('div.donation-level-user-entered :input[type=text]').val();
}
function getAmountForProcessing() {
  return formatCurrency(amountInLowestDenomination(getDonationAmount()), 'en_US', true);
}
function setUserEnteredDonationAmount(donationAmountInLowestDenomination) {
  jq('div.donation-level-user-entered :input[type=text]').val(formatCurrency(donationAmountInLowestDenomination, getCurrencyLocale(), true))
}
function isUserSpecifiedDonationLevelSelected() {
  if (isDonationLevelSelected()) {
    return getSelectedDonationLevel().closest('.donation-level-input-container').attr('type') === 'userSpecified';
  }
  return false;
}
function isDonationLevelSelected() {
  var selectedLevel = getSelectedDonationLevel();
  return (selectedLevel && selectedLevel.length == 1);
}
function getSelectedDonationLevel() {
  return jq('#donation-levels input[type=radio][checked="checked"]');
}
function getSelectedDonationLevelId() {
  return getSelectedDonationLevel().val();
}
function displayGiftAmountHeader() {
  var showRecuringGiftAmountHeader = isSustainingGiftTypeSelected();
  toggleElementVisibility('#gift_amount_header', !showRecuringGiftAmountHeader);
  toggleElementVisibility('#recurring_gift_amount_header', showRecuringGiftAmountHeader);
}
function toggleElementVisibility(elementSelector, show) {
  show ? jq(elementSelector).show()  : jq(elementSelector).hide();
}
function clearAmountField() {
  jq('#other_amount').val('');
}
function showDonationAmountError() {
  jq('#level_standard_row > .ErrorMessage').show();
  jq('#level_standard_row').addClass('form-error');
}
function hideDonationAmountError() {
  jq('#level_standard_row > .ErrorMessage').hide();
  jq('#level_standard_row').removeClass('form-error');
}
function setAndShowErrorMessage(srcErrorMsgContainer) {
  jq('span#level-error').text(jq(srcErrorMsgContainer).val());
  showDonationAmountError();
}
function setAndShowFrequencyErrorMessage(srcErrorMsgContainer) {
  jq('span#frequency-level-error').text(jq(srcErrorMsgContainer).val());
  showFrequencyError()
}
function showFrequencyError() {
  jq('.sustaining-frequency-container > .ErrorMessage').show();
  jq('.sustaining-frequency-container').addClass('form-error');
}
function hideFrequencyError() {
  jq('.sustaining-frequency-container > .ErrorMessage').hide();
  jq('.sustaining-frequency-container').removeClass('form-error');
}
function setAndShowDurationErrorMessage(srcErrorMsgContainer) {
  jq('span#duration-level-error').text(jq(srcErrorMsgContainer).val());
  showDurationError()
}
function showDurationError() {
  jq('.sustaining-duration-container > .ErrorMessage').show();
  jq('.sustaining-duration-container').addClass('form-error');
}
function hideDurationError() {
  jq('.sustaining-duration-container > .ErrorMessage').hide();
  jq('.sustaining-duration-container').removeClass('form-error');
}
function isDonationAmountValid() {
  var donationAmountInLowestDenomination = getDonationAmountInLowestDenomination();
  return (donationAmountInLowestDenomination && !isNaN(donationAmountInLowestDenomination));
}
function isDonationAmountLessThanMinimumAllowed() {
  return getDonationAmountInLowestDenomination() < getMinimumDonationAmountInLowestDenomination();
}
function getCurrencyLocale() {
  return jq('#currencyLocale').val();
}
function getDonationAmountInLowestDenomination() {
  return amountInLowestDenomination(getDonationAmount());
}
function getMinimumDonationAmountInLowestDenomination() {
  var selectedDonationLevelId = getSelectedDonationLevelId();
  var minimumDonationAmount = jq('#donation_level' + selectedDonationLevelId + '_minimum_amount').val();
  return amountInLowestDenomination(minimumDonationAmount);
}
function getMaximumDonationAmountInLowestDenomination() {
  var maxDonationAmount = jq('#maxDonationAmount').val();
  if (maxDonationAmount > 0) {
    return amountInLowestDenomination(maxDonationAmount);
  }
}
function getFormattedDonationAmount() {
  return formatCurrency(getDonationAmountInLowestDenomination(), getCurrencyLocale());
}
function amountInLowestDenomination(amount) {
  return parseCurrency(amount, getCurrencyLocale());
}
function isDonationAmountGreaterThanMaxAllowed() {
  return getDonationAmountInLowestDenomination() > getMaximumDonationAmountInLowestDenomination();
}
function validateDonationAmount() {
  if (!isDonationAmountValid()) {
    setAndShowErrorMessage('#giftAmountError');
    return false;
  } else if (isDonationAmountLessThanMinimumAllowed()) {
    setAndShowErrorMessage('#giftAmountLessThanMinAllowedError');
    return false;
  } else if (isDonationAmountGreaterThanMaxAllowed()) {
    setAndShowErrorMessage('#giftAmountGreaterThanMaxAllowedError');
    return false;
  }
  hideDonationAmountError();
  if (isUserSpecifiedDonationLevelSelected()) {
    setUserEnteredDonationAmount(getDonationAmountInLowestDenomination());
  }
  return true;
}
function validateSustainingGivingFields() {
  if (isSustainingGiftTypeSelected() === false) {
    return true;
  }
  if (isFrequencySelected() === false) {
    setAndShowFrequencyErrorMessage('#frequencyError');
    return false;
  }
  if (isFrequencySelected() === true && durationExistsForFrequency(getSelectedFrequency()) && isDurationSelected() === false) {
    setAndShowDurationErrorMessage('#durationError');
    return false;
  }
  return true;
}
function getSustainingFrequencyHiddenElement() {
  return jq('#sustaining\\.frequency');
}
function getSelectedFrequency() {
  return jq('#frequency-list').val();
}
function setSustainingFrequency() {
  var selectedFrequency = getSelectedFrequency();
  getSustainingFrequencyHiddenElement().val(selectedFrequency);
  hideAllDurations();
  hideFrequencyError();
  hideDurationError();
  if (selectedFrequency.length === 0) {
    jq('.sustaining-duration-container').hide();
    raiseEvent('frequencyUnSelected');
  } else {
    jq('.sustaining-duration-container').show();
    getFrequencyDurationSelectListElement(selectedFrequency).show();
    raiseEvent('frequencySelected');
  }
}
function getSustainingDurationHiddenElement() {
  return jq('#sustaining\\.duration');
}
function getSelectedDuration() {
  var selectedFrequency = getSelectedFrequency();
  return getFrequencyDurationSelectListElement(selectedFrequency).val()
}
function setSustainingDuration() {
  var selectedDuration = getSelectedDuration();
  getSustainingDurationHiddenElement().val(selectedDuration);
  if (isEmpty(selectedDuration)) {
    raiseEvent('durationUnSelected');
  } else {
    hideDurationError();
    raiseEvent('durationSelected');
  }
}
function hideAllDurations() {
  jq('#frequency-list option').each(function () {
    var durationElement = getFrequencyDurationSelectListElement(jq(this).val());
    durationElement.val('');
    durationElement.hide();
    getSustainingDurationHiddenElement().val('0');
  });
}
function getFrequencyDurationSelectListElement(frequency) {
  return jq('#' + frequency + '-durations');
}
function toggleSustainingFrequencyList(element) {
  unselectGiftTypeButtons();
  toggleGiftTypeButtonSelection(jq(element), true);
  if (jq(element).attr('for') === 'one_time') {
    getSustainingFrequencyHiddenElement().val('one-time');
    jq('#frequency-list').val('');
    jq('.sustaining-frequency-container').hide();
    jq('.sustaining-duration-container').hide();
    hideAllDurations();
    hideSustainingGiftMessage();
  } else {
    showFrequencyContainer();
  }
}
function showFrequencyContainer() {
  jq('.sustaining-frequency-container').show();
}
function hideFrequencyContainer() {
  jq('.sustaining-frequency-container').hide();
}
function selectOneTimeDonationButton() {
  toggleGiftTypeButtonSelection(jq('div#one_time').find('label'), true);
}
function toggleGiftTypeButtonSelection(giftTypeElement, selected) {
  selected ? giftTypeElement.addClass('selected')  : giftTypeElement.removeClass('selected');
}
function unselectGiftTypeButtons() {
  jq('div.gift-type-container label').each(function () {
    toggleGiftTypeButtonSelection(jq(this), false);
  });
}
function isSustainingGiftTypeSelected() {
  if (supportsSustainingGiving() && !supportsOneTimeGift()) {
    return true;
  } else if (supportsSustainingGiving()) {
    return jq('label.gift-type-label[for=\'sustaining\']').hasClass('selected');
  }
  return false;
}
function isFrequencySelected() {
  var frequencyValueToSubmit = getSustainingFrequencyHiddenElement().val();
  var frequencySelected = getSelectedFrequency();
  return !isEmpty(frequencySelected) && frequencyValueToSubmit === frequencySelected;
}
function isEmpty(value) {
  return !value || !value.trim();
}
function durationExistsForFrequency(frequency) {
  return getFrequencyDurationSelectListElement(frequency).length === 1;
}
function isDurationSelected() {
  var durationValueToSubmit = getSustainingDurationHiddenElement().val();
  var durationSelected = getSelectedDuration();
  return !isEmpty(durationSelected) && durationValueToSubmit === durationSelected;
}
function toggleGiftTypeContainerVisibility() {
  if (supportsSustainingGiving() && supportsOneTimeGift()) {
    jq('div.gift-type-container').show();
  } else {
    jq('div.gift-type-container').hide();
  }
}
function shouldEnablePaymentButton() {
  if (!isDonationLevelSelected() || (isUserSpecifiedDonationLevelSelected() && !getDonationAmount())) {
    return false;
  }
  if (supportsSustainingGiving() && isSustainingGiftTypeSelected()) {
    if (!isFrequencySelected()) {
      return false;
    }
    var selectedFrequency = getSelectedFrequency();
    if (durationExistsForFrequency(selectedFrequency) && !isDurationSelected()) {
      return false;
    }
    return true;
  }
  return true;
}
function raiseEvent(eventName) {
  jq.event.trigger(eventName);
}
function enablePaymentButtonAndDisplaySustainingGiftMessage() {
  if (shouldEnablePaymentButton()) {
    displaySustainingGiftMessage();
    raiseEvent('enablePaymentButton');
  }
}
function disablePaymentButtonAndHideSustainingGiftMessage() {
  hideSustainingGiftMessage();
  raiseEvent('disablePaymentButton');
}
function initDonationLevels() {
  jq(document).ready(function () {
    jq(document).on('donationLevelSelected frequencySelected durationSelected donationAmountEntered', function () {
      enablePaymentButtonAndDisplaySustainingGiftMessage();
    });
    jq(document).on('frequencyUnSelected donationAmountRemoved durationUnSelected noDonationLevelSelected', function () {
      disablePaymentButtonAndHideSustainingGiftMessage();
    });
    jq('div#donation-level-input-container label.donation-level-selector').each(function () {
      var labelId = jq(this).attr('for');
      jq('#' + labelId).click(function (event) {
        event.preventDefault();
        event.stopPropagation();
        jq(this).attr('checked', true);
      });
    });
    jq('div#donation-level-input-container label.donation-level-selector').click(function (event) {
      event.preventDefault();
      event.stopPropagation();
      var labelId = jq(this).attr('for');
      jq('div.donation-level-container label.selected').removeClass('selected');
      var labelElement = jq(this);
      labelElement.addClass('selected');
      jq('#donation-levels input[type=radio]').removeAttr('checked');
      jq('#' + labelId).trigger('click');
      raiseEvent('donationLevelSelected');
      var type = labelElement.closest('.donation-level-input-container').attr('type');
      if (type === 'userSpecified') {
        jq('div.donation-level-input-container[type=preset]').each(function () {
          jq(this).hide();
        });
        jq('.donation-level-user-entered').show();
        labelElement.closest('.donation-level-container').addClass('other-field');
        labelElement.hide();
        if (haveOnlyOneDonationLevel()) {
          jq('div.donation-level-user-entered a.otherClose').hide();
        }
        disablePaymentButtonAndHideSustainingGiftMessage();
      }
    });
    jq('div.donation-level-user-entered input#other_amount').keyup(function () {
      if (!getDonationAmount()) {
        raiseEvent('donationAmountRemoved');
      } else {
        raiseEvent('donationAmountEntered');
      }
    });
    jq('div.donation-level-user-entered a.otherClose').click(function (event) {
      event.preventDefault();
      event.stopPropagation();
      jq('div.donation-level-input-container[type=preset]').each(function () {
        jq(this).show();
      });
      jq('.other-field').removeClass('other-field');
      jq('.donation-level-user-entered').hide();
      var selectedLabel = jq('div.donation-level-container label.selected');
      selectedLabel.removeClass('selected');
      selectedLabel.show();
      jq('#donation-levels :radio:checked').attr('checked', false);
      hideDonationAmountError();
      clearAmountField();
      raiseEvent('noDonationLevelSelected');
    });
    jq('div.gift-type-button label').click(function () {
      toggleSustainingFrequencyList(jq(this));
      displayGiftAmountHeader();
    });
    jq(document).on('initializeUI', function (event) {
      event.stopPropagation();
      event.preventDefault();
      processSingleDonationLevel();
      selectDefaultDonationLevel();
      if (supportsSustainingGiving() && !supportsOneTimeGift()) {
        showFrequencyContainer();
      }
      toggleGiftTypeContainerVisibility();
      selectOneTimeDonationButton();
      displayGiftAmountHeader();
      jq('div#donation-levels').show();
    });
    componentState[DONATION_LEVELS_COMPONENT_NAME] = READY_STATE;
  });
}(function () {
  isJQInitialized(function () {
    initDonationLevels();
    console.log('donation_levels: jQuery ' + jq.fn.jquery + ' loaded.');
  });
}) ();
