//프론트엔드(app.js) + 백엔드(server.js)

const nickForm = document.querySelector("#nickName");
const messageList = document.querySelector("ul");
const messageForm = document.querySelector("#message");

//const socket = new WebSocket("ws://localhost:3000/");
//http로 하면 연결안됑!
const socket = new WebSocket(`ws://${window.location.host}`);

function makeMessage(type, payload){
    //🔽 💥콤마로 하는게 맞앙!!! 세미콜론 넣으면 {type: 값} 하나만 보내져.
    const msg = {type, payload};//{type: 'nickName', payload: 'gd'}

    //어떤 프로그래밍 언어를 사용하고 있을지 모르니 String으로 보내는게 API를 사용할때 String으로 보내자.
    return JSON.stringify(msg);
}

//💥이벤트는 정해져 있으니 아무거나 쓰면 안됑!

//연결 확인
socket.addEventListener("open", ()=>{
    console.log("Connected to Server ✅")
})

//연결 종료
socket.addEventListener("close", ()=>{
    console.log("Disconnected to Server ❌"); //서버가 종료되면 브라우저에서 알 수 있음.
})

setTimeout(()=>{
    socket.send(makeMessage("state","hello from the browser!"));
},10000);


//서버가 돌려준 데이터 '받기'
socket.addEventListener("message",(message) => {
    const li = document.createElement("li");
    console.log(message);
    li.innerText = message.data;
    messageList.append(li);   
    //console.log("Just got this: ", message, " from the Server");
    //console.log("New message: ", message.data);
})


//메세지 서버에 '보내기'
messageForm.addEventListener("submit", (event)=>{
    event.preventDefault();
    const input = messageForm.querySelector("input");

    
   // socket.send(input.value);//front-end에서 back-end로 무언가를 보내는 중
    socket.send(makeMessage("new_message", input.value)); 

    const li = document.createElement("li");
    li.innerText = `You : ${input.value}`;
    messageList.append(li);
    //console.log(input.value);
    input.value="";//비워주기
});

//닉네임 서버에 '보내기'
nickForm.addEventListener("submit", (e)=>{
    e.preventDefault();
    const input = nickForm.querySelector("input");
    //socket.send(input.value);//닉네임 back-end로 전달.

    //json타입으로 보내자(text타입으로 보내면 nickname인걸 구분 못하기 때문에)
    socket.send(makeMessage("nickName", input.value));
    input.value = "";
})