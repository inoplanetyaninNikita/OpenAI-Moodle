chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  alert('Сообщение получено в content:');
});

function openAI(text)
{
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer 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");
    myHeaders.append("OpenAI-Organization", "org-AmCry3gCKitaXS4PHYX9mhps");
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "model": "gpt-3.5-turbo",
      "messages": [
        {
          "role": "user",
          "content": ""+text+""
        },

      ],
      "temperature": 0
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch("https://api.openai.com/v1/chat/completions", requestOptions)
      .then(response => response.text())
      .then(result =>{
          const obj = JSON.parse(result);
          
          
          if(answer != null && answer.type == 'text') {
              alert('Код находится в консоли!');
              console.log(obj.choices[0].message.content)
              //answer.value = obj.choices[0].message.content;
          }
          else
          {
              alert(obj.choices[0].message.content);
          }
          return obj.choices[0].message.content;
      }
            )
      .catch(error => console.log('error', error));
    
}

var element = document.evaluate('/html/body/div[1]/div[3]/div/div[3]/div/section[1]/div/form/div/div[1]/div[2]/div', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

if (element != null)
{
    var note = ""
    var answer = document.evaluate('/html/body/div[1]/div[3]/div/div[3]/div/section[1]/div/form/div/div[1]/div[2]/div/div[2]/div[1]/div[1]/input', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    if(answer != null && answer.type == 'radio') {note = ' Выбери один ответ.'}
    
    answer = document.evaluate('/html/body/div[1]/div[3]/div/div[3]/div/section[1]/div/form/div/div[1]/div[2]/div/div[2]/div/div[1]/input[2]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    if(answer != null && answer.type == 'checkbox') {note = ' 1 или несколько ответов'}
        
    answer = document.evaluate('/html/body/div[1]/div[3]/div/div[3]/div/section[1]/div/form/div/div[1]/div[2]/div/div[2]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    answer = answer.querySelector('input[type="text"]');
    if(answer != null && answer.type == 'text') {
        note = ' Если это программирование, напиши только код'
    }
    
    var text = element.textContent
    
    chrome.runtime.sendMessage({ page: 'content'}, function(response) {
    if(response.isEnable == true){
        var AItext = openAI(text + note, answer)
    }});
  
}
