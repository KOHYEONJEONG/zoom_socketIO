//프론트엔드(app.js) + 백엔드(server.js)

import http from "http";
import { Server } from "socket.io"; //npm i  socket.io
import express from "express"; 
const app = express();
//express 할일 : views를 설정해주고 render 해주는걸로 끝이다.
//❤️나머지는 websocket에서 실시간으로 알려줄거당, real-time(실시간)으로 할거당

app.set("view engine","pug");
app.set("views",__dirname+"/views");//home.pug 위치
app.use("/public",express.static(__dirname+"/public"));
//우리가 사용할 유일한 route 
app.get("/",(_, res) => res.render("home"));
app.get("/*",(_, res) => res.redirect("/"));//오!! 다른 url은 전혀 사용하지 않을 것이며 홈만 사용할거라 추가!


//순서1) 서버 만들기
const httpServer = http.createServer(app);
const wsServer = new Server(httpServer);


const handleListen = () => console.log(`Listening on http://localhost:3000/`);
httpServer.listen(3000,handleListen);


// //1️⃣터미널   :  npm run dev 실행하기
// //2️⃣브라우저 :  http://localhost:3000/ 으로 실행
// //재실행   :  rs
// //종료 : ctrl + c / Y OR y

// //하나더! server.js를 저장해야지 nodemon이 재시작된다!
// //↪️("ignore":["src/public/*"] <- 이거를 해놔서 재실행 방지!)






// //🔽순서2) 이렇게 하면 http서버, webSocket서버 둘 다 돌릴 수 있다.
// //여기서 하고 있는 것은, 같은 서버에 3000포트에 http, webSocket 둘 다 작동시키는거야.
// const wss = new WebSocket.Server({server});

// //브라우저끼리 메시지 볼 수 있게 브라우저를 담을 그릇
// const sockets = [];

// //app.js에서 인자값 넘어옴
// wss.on("connection", (socket)=>{ //connection이 생기면 socket을 받는다는 걸 알 수 있다.
//     console.log("Connected to Browser ✅");

//     //socket : backend에 연결된 사람의 정보를 제공해준다.
//     sockets.push(socket);
//     //console.log(socket);

//     socket["nickName"] = "Anon"; //익명 닉네임
    
//     socket.on("close", ()=> console.log("Disconnected from the Browser ❌"));//브라우저가 닫히면 close라는 event발생하며 터미널에서 보여짐
//     socket.on("message", (message) => {//메시지가 socket에서 전송되고 메시지의 type이 new_message이면

//         //console.log(message.toString("utf-8"));
//         const parsed =  JSON.parse(message.toString("utf-8"));//String을 js Object로 변환

//         switch(parsed.type){
//             case "new_message":
//                 sockets.forEach((aSocket) => aSocket.send(`${socket.nickName}:${parsed.payload}`));
//                 break;
//             case "nickName":
//                 socket["nickName"] = parsed.payload;//닉네임 있으면 넣어주기
//                 break;
//         }
//         //console.log("서버 : "+message);
//     });
//    //socket.send("hello!");//socket으로 데이터 보내기 + 프론트엔드에서도 받는 코드 필요함.
// });


// //http 서버 위에 ws 서버가 만들어 졌다.
// server.listen(3000,handleListen);


