// 이전에 생성된 요소들에 대해 이벤트 리스너를 추가하는 코드
var whiteKeys = document.querySelectorAll('.white-key')
var blackKeys = document.querySelectorAll('.black-key')

// 클릭상태확인
var isClicked = false // 클릭 상태를 저장할 변수
var isTouch = false // 클릭 상태를 저장할 변수
document.addEventListener('mousedown', function() {
	isClicked = true
})
document.addEventListener('mouseup', function() {
	isClicked = false
})

// 색변경 및 위치 이동 이벤트
function changeColorDuringAudio(id) {
	var element = document.getElementById(id)
	if (element) {
		if (id.includes('b')) {
			element.style.backgroundColor = '#3d3d3d'
		} else {
			element.style.backgroundColor = '#dfdfdf'
		}

		// 아래로 약간 내리는 애니메이션
		element.style.transition = 'transform 0.1s ease-in-out'
		element.style.transform = 'translateY(1%)' // 아래로 1.5px 이동

		// 일정 시간 후에 원래 위치로 돌아오기
		setTimeout(function() {
			// 다시 위로 올라가는 애니메이션
			element.style.transform = 'translateY(0)' // 원래 위치로 이동
			element.style.backgroundColor = ''
		}, 250) // 0.25초 후에 원래 위치로 복귀
	}
}

// 마우스 호버이벤트
function handleMouseOver(event) {
	if (isClicked) {
		const id = event.target.id
		// console.log('마우스가 올라간 요소의 ID:', id)
		/*	playSound(id, 80)*/
		sendPianoSocket(id, 80)
		changeColorDuringAudio(id)

	}
}

// 마우스 클릭이벤트
function handleClickOrDrag(event) {
	const id = event.target.id
	// console.log('클릭 요소의 ID:', id)
	/*playSound(id, 80)*/
	sendPianoSocket(id, 80)
	changeColorDuringAudio(id)
}

// 터치 시작 이벤트 핸들러
function handleTouchStart(event) {
	const id = event.target.id
	isTouch = true;
	sendPianoSocket(id, 80)
	changeColorDuringAudio(id)

}

// 터치 이동 이벤트 핸들러
function handleTouchMove(event) {
	// event.touches[0]는 첫 번째 터치 이벤트에 대한 정보를 제공합니다.
	const touchX = event.touches[0].clientX;
	const touchY = event.touches[0].clientY;

	// 터치된 지점 아래에 있는 요소를 찾음
	const id = document.elementFromPoint(touchX, touchY).id;

	if (isTouch) {
		sendPianoSocket(id, 80)
		changeColorDuringAudio(id)
	}

}

// 터치 종료 이벤트 핸들러
function handleTouchEnd(event) {
	isTouch = false;
	// 터치 이벤트가 종료될 때 수행할 동작
}
// 마우스 및 터치 이벤트 처리
whiteKeys.forEach((key) => {
	key.addEventListener('mouseover', handleMouseOver);
	key.addEventListener('click', handleClickOrDrag);
	key.addEventListener('touchstart', handleTouchStart); // 터치 시작
	key.addEventListener('touchmove', handleTouchMove);   // 터치 이동
	key.addEventListener('touchend', handleTouchEnd);     // 터치 종료
});

blackKeys.forEach((key) => {
	key.addEventListener('mouseover', handleMouseOver);
	key.addEventListener('click', handleClickOrDrag);
	key.addEventListener('touchstart', handleTouchStart);
	key.addEventListener('touchmove', handleTouchMove);
	key.addEventListener('touchend', handleTouchEnd);
});
// ================= 키보드 연주 키설정 ===============
// 이벤트를 처리하는 함수
var keySetting = 3
function handleKeyPress(event) {
	// 눌린 키의 코드를 가져옵니다.
	const keyPressed = event.key;
	var keyValue
	// 키에 따른 동작을 추가합니다.
	switch (keyPressed) {

		case 'q':
			keyValue = 3 + keySetting * 12
			sendPianoSocket(pianoKey[keyValue], 80)
			changeColorDuringAudio(pianoKey[keyValue])
			break;
		case '2':
			keyValue = 4 + keySetting * 12
			sendPianoSocket(pianoKey[keyValue], 80)
			changeColorDuringAudio(pianoKey[keyValue])
			break;
		case 'w':
			keyValue = 5 + keySetting * 12
			sendPianoSocket(pianoKey[keyValue], 80)
			changeColorDuringAudio(pianoKey[keyValue])
			break;
		case '3':
			keyValue = 6 + keySetting * 12
			sendPianoSocket(pianoKey[keyValue], 80)
			changeColorDuringAudio(pianoKey[keyValue])
			break;
		case 'e':
			keyValue = 7 + keySetting * 12
			sendPianoSocket(pianoKey[keyValue], 80)
			changeColorDuringAudio(pianoKey[keyValue])
			break;
		case 'r':
			keyValue = 8 + keySetting * 12
			sendPianoSocket(pianoKey[keyValue], 80)
			changeColorDuringAudio(pianoKey[keyValue])
			break;
		case '5':
			keyValue = 9 + keySetting * 12
			sendPianoSocket(pianoKey[keyValue], 80)
			changeColorDuringAudio(pianoKey[keyValue])
			break;
		case 't':
			keyValue = 10 + keySetting * 12
			sendPianoSocket(pianoKey[keyValue], 80)
			changeColorDuringAudio(pianoKey[keyValue])
			break;
		case '6':
			keyValue = 11 + keySetting * 12
			sendPianoSocket(pianoKey[keyValue], 80)
			changeColorDuringAudio(pianoKey[keyValue])
			break;
		case 'y':
			keyValue = 12 + keySetting * 12
			sendPianoSocket(pianoKey[keyValue], 80)
			changeColorDuringAudio(pianoKey[keyValue])
			break;
		case '7':
			keyValue = 13 + keySetting * 12
			sendPianoSocket(pianoKey[keyValue], 80)
			changeColorDuringAudio(pianoKey[keyValue])
			break;
		case 'u':
			keyValue = 14 + keySetting * 12
			sendPianoSocket(pianoKey[keyValue], 80)
			changeColorDuringAudio(pianoKey[keyValue])
			break;
		case '9':
			if (keySetting > 0) {
				keySetting--

			}
			break;
		case '0':
			if (keySetting < 6) {
				keySetting++
			}
			break;


		default:

			break;
	}
}

// 문서 전체에 키보드 이벤트 리스너를 추가합니다.
document.addEventListener('keydown', EventHandler);
document.addEventListener('keydown', handleKeyPress);


// ID가 "commentInput"인 특정 입력 요소에 focus 이벤트 리스너를 추가합니다.
function EventHandler() {
	const comment_input = document.getElementById('comment');
	if (comment_input != null) {

		comment_input.addEventListener('focus', function() {
			// focus 이벤트 발생 시 키보드 이벤트 리스너를 제거합니다.
			document.removeEventListener('keydown', handleKeyPress);
		});

		// ID가 "commentInput"인 특정 입력 요소에 blur 이벤트 리스너를 추가합니다.
		comment_input.addEventListener('blur', function() {
			// blur 이벤트 발생 시 키보드 이벤트 리스너를 추가합니다.
			document.addEventListener('keydown', handleKeyPress);
		});
	}


	// ID가 "commentInput"인 특정 입력 요소에 focus 이벤트 리스너를 추가합니다.
	const message_input = document.getElementById('message');
	if (message_input != null) {
		message_input.addEventListener('focus', function() {
			// focus 이벤트 발생 시 키보드 이벤트 리스너를 제거합니다.
			document.removeEventListener('keydown', handleKeyPress);
		});

		// ID가 "commentInput"인 특정 입력 요소에 blur 이벤트 리스너를 추가합니다.
		message_input.addEventListener('blur', function() {
			// blur 이벤트 발생 시 키보드 이벤트 리스너를 추가합니다.
			document.addEventListener('keydown', handleKeyPress);
		});
	}

	// ID가 "commentInput"인 특정 입력 요소에 focus 이벤트 리스너를 추가합니다.
	const re_comment_input = document.getElementById('re-comment');
	if (re_comment_input != null) {
		re_comment_input.addEventListener('focus', function() {
			// focus 이벤트 발생 시 키보드 이벤트 리스너를 제거합니다.
			document.removeEventListener('keydown', handleKeyPress);
		});

		// ID가 "commentInput"인 특정 입력 요소에 blur 이벤트 리스너를 추가합니다.
		re_comment_input.addEventListener('blur', function() {
			// blur 이벤트 발생 시 키보드 이벤트 리스너를 추가합니다.
			document.addEventListener('keydown', handleKeyPress);
		});
	}

}


var pianoKey = [
	'A0',
	'Bb0',
	'B0',
	'C1',
	'Db1',
	'D1',
	'Eb1',
	'E1',
	'F1',
	'Gb1',
	'G1',
	'Ab1',
	'A1',
	'Bb1',
	'B1',
	'C2',
	'Db2',
	'D2',
	'Eb2',
	'E2',
	'F2',
	'Gb2',
	'G2',
	'Ab2',
	'A2',
	'Bb2',
	'B2',
	'C3',
	'Db3',
	'D3',
	'Eb3',
	'E3',
	'F3',
	'Gb3',
	'G3',
	'Ab3',
	'A3',
	'Bb3',
	'B3',
	'C4',
	'Db4',
	'D4',
	'Eb4',
	'E4',
	'F4',
	'Gb4',
	'G4',
	'Ab4',
	'A4',
	'Bb4',
	'B4',
	'C5',
	'Db5',
	'D5',
	'Eb5',
	'E5',
	'F5',
	'Gb5',
	'G5',
	'Ab5',
	'A5',
	'Bb5',
	'B5',
	'C6',
	'Db6',
	'D6',
	'Eb6',
	'E6',
	'F6',
	'Gb6',
	'G6',
	'Ab6',
	'A6',
	'Bb6',
	'B6',
	'C7',
	'Db7',
	'D7',
	'Eb7',
	'E7',
	'F7',
	'Gb7',
	'G7',
	'Ab7',
	'A7',
	'Bb7',
	'B7',
	'C8',
]

var audioPath = '/piano_sample/'
var audioCache = {}

function preloadAllAudio() {
	pianoKey.forEach(function(key) {
		var audio = new Audio(audioPath + key + '.mp3')
		audioCache[key] = audio
		audio.load() // 오디오 로딩
	})
}
preloadAllAudio()

function playSound(id, valocity) {

	// var audio = new Audio(audioPath + id + '.mp3') // 해당 id에 맞는 오디오 요소 생성
	// audio.play() // 오디오 재생
	var audio = audioCache[id]

	audio.currentTime = 0 // 재생 위치를 처음으로 되돌립니다.
	audio.volume = valocity / 90

	audio.play() // 오디오 재생
}

function onMIDISuccess(midiAccess) {
	function midiInputStateChanged(event) {
		console.log(event.port.name, event.port.manufacturer, event.port.state)
		if (event.port.state === 'connected') {
			const inputs = midiAccess.inputs.values()
			for (
				let input = inputs.next();
				input && !input.done;
				input = inputs.next()
			) {
				input.value.onmidimessage = function(message) {
					const [command, note, velocity] = message.data
					if (command === 144) {
						// console.log(`Note: ${note}, Velocity: ${velocity}`)

						sendPianoSocket(pianoKey[note - 21], velocity)
						changeColorDuringAudio(pianoKey[note - 21])
					}
				}
			}
		} else if (event.port.state === 'disconnected') {
			// 연결이 끊긴 MIDI 장치의 처리 로직
		}
	}

	midiAccess.onstatechange = midiInputStateChanged

	const inputs = midiAccess.inputs.values()
	for (
		let input = inputs.next();
		input && !input.done;
		input = inputs.next()
	) {
		input.value.onmidimessage = function(message) {
			const [command, note, velocity] = message.data
			if (command === 144) {
				// console.log(`Note: ${note}, Velocity: ${velocity}`)
				playSound(pianoKey[note - 21], velocity)
				changeColorDuringAudio(pianoKey[note - 21])
			}
		}
	}
}

function onMIDIFailure(error) {
	console.error('MIDI access failed', error)
}

navigator.requestMIDIAccess().then(onMIDISuccess, onMIDIFailure)

// 위치 조절

const positionSlider = document.getElementById('positionSlider')
const sizeSlider = document.getElementById('sizeSlider')
const pianoView = document.querySelector('.web-piano-view')
const pianoFrame = document.querySelector('.web-piano-frame') // 요소 선택

var pianoWidth = pianoView.offsetWidth
var frameWidth = pianoFrame.offsetWidth
pianoFrame.scrollLeft = pianoWidth / 3

// 슬라이더 이동시 해당 스크롤 위치로 이동
positionSlider.addEventListener('input', function(event) {
	const value = event.target.value
	const pianoViewWidth = document.querySelector('.web-piano-view').offsetWidth
	const pianoFrameWidth = pianoFrame.offsetWidth

	// 슬라이더 값에 따라 피아노 뷰의 위치 계산
	const pianoViewScroll = (pianoViewWidth - pianoFrameWidth) * (value / 100)
	pianoFrame.scrollLeft = pianoViewScroll
})

// 사이즈 조절
sizeSlider.addEventListener('input', function(event) {
	var frameWidth = pianoFrame.offsetWidth
	// 이벤트 발생 시 수행할 동작을 여기에 작성합니다.
	const value = event.target.value

	pianoView.style.width = `${value * frameWidth}px`
	pianoWidth = pianoView.offsetWidth

	pianoFrame.scrollLeft = frameWidth
	positionSlider.value = 50
	// console.log(pianoWidth)
})


const web_piano = document.querySelector('.web-piano')
const message_box = document.querySelector('.message-box')
const chatting_box = document.getElementById('chatting-box')

var screen_state = false

function full_screen() {
	if (!screen_state) {
		screen_state = true
		if (web_piano.requestFullscreen) {
			web_piano.requestFullscreen();
		} else if (web_piano.webkitRequestFullscreen) { /* Safari, Chrome */
			web_piano.webkitRequestFullscreen();
		} else if (web_piano.msRequestFullscreen) { /* IE11 */
			web_piano.msRequestFullscreen();
		}
		pianoView.style.width = '100vw'
		message_box.style.display = 'none'
		chatting_box.style.display = 'none'
	} else {
		screen_state = false
		if (document.exitFullscreen) {
			document.exitFullscreen()
		} else if (web_piano.webkitExitFullscreen) { /* Safari, Chrome */
			document.webkitExitFullscreen();
		} else if (web_piano.msExitFullscreen) { /* IE11 */
			document.msExitFullscreen();
		}
		pianoView.style.width = `${pianoFrame.offsetWidth}px`
		message_box.style.display = 'flex'
		chatting_box.style.display = 'flex'
	}
}

// ======================== 웹소켓 ======================
let stompClient_piano; // stompClient를 전역 변수로 선언
let stompClient_message;


// SockJS 라이브러리 불러오기
const sockJsScript = document.createElement('script');
sockJsScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/sockjs-client/1.6.1/sockjs.min.js';

const stompScript = document.createElement('script');
stompScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/stomp.js/2.3.3/stomp.min.js';


sockJsScript.onload = function() {
	// SockJS 라이브러리 로드 후에 Stomp.js 라이브러리 로드
	stompScript.onload = function() {
		// Stomp.js 라이브러리 로드 후에 실행되는 부분
		const socket_piano = new SockJS('/socket');
		stompClient_piano = Stomp.over(socket_piano);
		stompClient_piano.debug = function(str) { }
		stompClient_piano.connect({}, function(frame) {
			console.log('Connected to the WebSocket server');
			stompClient_piano.subscribe('/sub/web-piano', function(message) {
				const receivedMessage = JSON.parse(message.body);
				const note = receivedMessage.note;
				const velocity = receivedMessage.velocity;

				playSound(note, velocity)
				changeColorDuringAudio(note)
			});
		});
		const socket_message = new SockJS('/socket');
		stompClient_message = Stomp.over(socket_message);
		stompClient_message.debug = function(str) { }
		stompClient_message.connect({}, function(frame) {
			console.log('Connected to the WebSocket server');

			stompClient_message.subscribe('/sub/web-piano/message', function(message) {
				const receivedMessage = JSON.parse(message.body);
				const _user_name = receivedMessage.user_name;
				const _message = receivedMessage.message;

				if (_user_name == user_name) {
					addMessageSender(_message)
				} else {
					addMessageReceiver(_user_name, _message)
				}

				message_box.scrollTo(0, message_box.scrollHeight)
			});
		});


	};
	document.head.appendChild(stompScript);
};
document.head.appendChild(sockJsScript);


function sendPianoSocket(note, velocity) {
	const message = {
		note: note,
		velocity: velocity
	};
	stompClient_piano.send("/pub/web-piano", {}, JSON.stringify(message));
}


function sendMessageSocket(name, message) {
	var message = {
		user_name: name,
		message: message
	};
	stompClient_piano.send("/pub/web-piano/message", {}, JSON.stringify(message));
}

let user_name;// = document.getElementById('user_name').textContent;

// JavaScript 부분
function sendMessage() {
	// id가 message인 input 요소 가져오기
	const input = document.getElementById('message');

	// input 요소의 값 가져오기
	var message = input.value;

	if (message !== '') {
		if (user_name == null || user_name == '') {
			var blog_user = document.getElementById("user_name").innerText.split(" ")[0]
			if (blog_user != '') {
				user_name = blog_user
			} else {
				user_name = prompt("채팅할 이름을 입력해주세요.", "")
			}
			if (user_name != null && user_name != '') {
				sendMessageSocket("(시스템 관리자)", user_name + "님이 입장했습니다.")
			}
		}
		setTimeout(function() {
			if (user_name != null && user_name != '') {
				sendMessageSocket(user_name, message)
			}
		}, 50) // 0.25초 후에 원래 위치로 복귀


		// input 요소의 값을 비우기
		input.value = '';
	}
}

function addMessageReceiver(user_name, message) {
	// 새로운 메시지 요소 생성
	const receiverUser = document.createElement('p');
	receiverUser.classList.add('receiver-user');
	receiverUser.textContent = user_name; // 유저 이름 설정

	const receiverMessage = document.createElement('p');
	receiverMessage.classList.add('receiver-message');

	const spanElement = document.createElement('span');
	spanElement.textContent = message; // 메시지 내용 설정



	receiverMessage.textContent = getCurrentTime(); // 메시지 시간 설정
	receiverMessage.prepend(spanElement);

	// 생성된 요소들 메시지 박스에 추가
	message_box.appendChild(receiverUser);
	message_box.appendChild(receiverMessage);
}

function addMessageSender(message) {

	const senderMessage = document.createElement('p');
	senderMessage.classList.add('sender-message');

	const spanElement = document.createElement('span');
	spanElement.textContent = message; // 메시지 내용 설정



	senderMessage.textContent = getCurrentTime(); // 메시지 시간 설정
	senderMessage.appendChild(spanElement);

	// 생성된 요소들 메시지 박스에 추가

	message_box.appendChild(senderMessage);
}

function getCurrentTime() {
	const now = new Date();
	let hours = now.getHours();
	let minutes = now.getMinutes();

	// 시간과 분이 한 자리 수인 경우 앞에 0을 추가하여 두 자리 수로 만듭니다.
	hours = hours < 10 ? '0' + hours : hours;
	minutes = minutes < 10 ? '0' + minutes : minutes;

	return hours + ':' + minutes;
}

const message_input = document.getElementById('message');
message_input.addEventListener('keypress', function(event) {
	console.log(event.key);
	if (event.key === 'Enter') {
		event.preventDefault(); // 엔터 키의 기본 동작(개행)을 막습니다.

		sendMessage();


	}
})
