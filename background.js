//chrome.storage.local.set({ 'isEnable': true}, function() {});

var isEnable = getData('isEnable').then(result => isEnable = result)


chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if(request.page == 'content') {
        sendResponse({ page: 'background', isEnable: isEnable });
    }
    if(request.page == 'popup') {
        if(request.body == 'getdata'){
            sendResponse({isEnable : isEnable});
        }
        if(request.body == 'setdata'){
            isEnable = request.isEnable
            chrome.storage.local.set({ 'isEnable': request.isEnable}, function() {});
        }
        if(request.body == 'test'){
            chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
            var activeTab = tabs[0];
            var message = { text: 'Привет, content!' };
            chrome.tabs.sendMessage(activeTab.id, message);
            });
        }
    }
});

async function getValueFromStorage(key) {
  return new Promise((resolve) => {
    chrome.storage.local.get(key, function(result) {
      resolve(result[key]);
    });
  });
}

async function getData(key) {
  return await getValueFromStorage(key);
}

function test()
{
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      var activeTab = tabs[0];
      var message = { text: 'Привет, content!' };

      // Отправляем сообщение в активную вкладку
      chrome.tabs.sendMessage(activeTab.id, message);
    });
}
