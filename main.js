document.getElementById('sendButton').addEventListener('click', sendMessage);
//document.getEkementByID 사용자와 상호작용 
document.getElementById('messageInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});
//dom 브라우저 내장 기능(자바스크립트 코딩) > document 공부

const chat=document.querySelector('.chat-container')
console.log(chat)

function sendMessage() {
    const messageInput = document.getElementById('messageInput');
    const messageText = messageInput.value.trim();
    if (messageText === '') return;

    displayMessage(messageText, 'user');
    messageInput.value = ''; // 입력 필드 초기화
    messageInput.focus(); // 입력 필드에 다시 포커스

    generateMessage(messageText); // 서버에 메시지를 보내고 응답을 받아 처리
}

//isloafin =false 였다가 다음 generateMessage 실행 후 ture 로딩 이후 마지막 then fatch finally(무조건실행함수) isloading false 실행
let isLoading = false;
function generateMessage(userMessage) {
    isLoading = true;
    axios.post('http://127.0.0.1:8000/api/chatbots/chatbot/', { message: userMessage })
    //axios는 import 구동안함. / import & tipemodule 번들러(번들링과정에서 import문써서 패키지를 불러오는 기능)  
        .then(response => {
            const aiResponse = response.data.message; // 서버로부터 응답 받음
            displayMessage(aiResponse, 'ai'); // AI의 응답을 채팅창에 표시
        })
        .catch(error => {
            console.error('Error fetching response: ', error);
            displayMessage('Sorry, there was an error processing your message.', 'ai'); // 오류 발생시 사용자에게 알림
        })
        // .finally(() => { isLoading = false });
        //console.log > scope {} 내에서만 유효한 범위 개념 공부. 파이널리, 이즈로딩, 제너레이트 밖에 콘솔로그 추가하기. 조건문 이즈로딩 트루면 로딩ui표시 펄스되면 로딩si를 디스플레이온
}

function displayMessage(message, type) {
    const chatMessages = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('chat-message', type);
    messageDiv.textContent = message;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight; // 새 메시지가 추가될 때마다 스크롤을 맨 아래로 이동
}
