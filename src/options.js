$(document).ready(function() {

  chrome.storage.sync.get("ILYhideTooltip", function (obj) {
    console.log("Loaded doc: " + obj.ILYhideTooltip);
    if (obj.ILYhideTooltip) {
      $("#hideTooltip").prop('checked', true);
    } else {
      $("#hideTooltip").prop('checked', false);
    }
  });

  $("#hideTooltip").on("click", function() {
    if($(this).is(':checked')) {
      // save checked
      console.log('checked');

      chrome.storage.sync.set({'ILYhideTooltip': true}, function() {
        // Notify that we saved.
      });
    } else {
      // save unchecked
      console.log('unchecked');

      chrome.storage.sync.set({'ILYhideTooltip': false}, function() {
        // Notify that we saved.
      });
    }
  });

});
