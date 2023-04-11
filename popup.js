//const button = document.querySelector('#my-button');
//button.addEventListener('click', sendToBackground);
//
//function sendToBackground() {
//  const inputField = document.querySelector('#input-field');
//  const message = inputField.value;
//
//  chrome.runtime.sendMessage({page:"popup", data: message });
//}

var isEnable = false

chrome.runtime.sendMessage({page:"popup", body: 'getdata' }, function(response) {
    var openAICheckbox = document.getElementById('open-ai-checkbox');
    openAICheckbox.checked = response.isEnable
});

document.addEventListener('DOMContentLoaded', function() {
  // Получаем ссылку на элемент checkbox по его id
  var openAICheckbox = document.getElementById('open-ai-checkbox');
  // Обрабатываем событие change (изменение состояния) на элементе checkbox
  openAICheckbox.addEventListener('change', function() {
    // Если checkbox отмечен, то выводим сообщение в консоль
    chrome.runtime.sendMessage({page:"popup", body: 'setdata', isEnable:openAICheckbox.checked });
      
    if (openAICheckbox.checked) {
      //alert('Open AI включен!');
    } else {
      //alert('Open AI выключен!');
    }
  });
});


var clipboard = navigator.clipboard;


