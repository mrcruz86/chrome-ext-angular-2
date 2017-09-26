chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.badgeMessage) {
    chrome.browserAction.setBadgeBackgroundColor({'color':'#000940'});
    chrome.browserAction.setBadgeText({'text':request.badgeMessage.toString()});
  }
});

chrome.tabs.onHighlighted.addListener(function(selectedInfo) {
  chrome.browserAction.setBadgeText({'text':''});
  selectedInfo.tabIds.forEach(function (val, key) {
    chrome.tabs.get(val, function(tab) {
      if (tab) {
        chrome.tabs.sendMessage(tab.id, {'tabId': tab.id});
      }
    });
  });
});
