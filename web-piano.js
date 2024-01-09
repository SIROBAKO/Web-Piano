// 이전에 생성된 요소들에 대해 이벤트 리스너를 추가하는 코드
var whiteKeys = document.querySelectorAll('.white-key')
var blackKeys = document.querySelectorAll('.black-key')

// 클릭상태확인
var isClicked = false // 클릭 상태를 저장할 변수
document.addEventListener('mousedown', function () {
    isClicked = true
})
document.addEventListener('mouseup', function () {
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
        setTimeout(function () {
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
        playSound(id, 80)

        changeColorDuringAudio(id)
    }
}

// 마우스 클릭이벤트
function handleClickOrDrag(event) {
    const id = event.target.id
    // console.log('클릭 요소의 ID:', id)
    playSound(id, 80)
    changeColorDuringAudio(id)
}

whiteKeys.forEach((key) => {
    key.addEventListener('mouseover', handleMouseOver)
    key.addEventListener('click', handleClickOrDrag)
})

blackKeys.forEach((key) => {
    key.addEventListener('mouseover', handleMouseOver)
    key.addEventListener('click', handleClickOrDrag)
})

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

var audioPath = './piano_sample/'
var audioCache = {}

function preloadAllAudio() {
    pianoKey.forEach(function (key) {
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
                input.value.onmidimessage = function (message) {
                    const [command, note, velocity] = message.data
                    if (command === 144) {
                        // console.log(`Note: ${note}, Velocity: ${velocity}`)
                        playSound(pianoKey[note - 21], velocity)
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
        input.value.onmidimessage = function (message) {
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
positionSlider.addEventListener('input', function (event) {
    const value = event.target.value
    const pianoViewWidth = document.querySelector('.web-piano-view').offsetWidth
    const pianoFrameWidth = pianoFrame.offsetWidth

    // 슬라이더 값에 따라 피아노 뷰의 위치 계산
    const pianoViewScroll = (pianoViewWidth - pianoFrameWidth) * (value / 100)
    pianoFrame.scrollLeft = pianoViewScroll
})

// 사이즈 조절
sizeSlider.addEventListener('input', function (event) {
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
var screen_state = false

function full_screen() {
    if (!screen_state) {
        screen_state = true
        if (web_piano.requestFullscreen) {
            web_piano.requestFullscreen()
        } else if (web_piano.webkitRequestFullscreen) {
            /* Safari, Chrome */
            web_piano.webkitRequestFullscreen()
        } else if (web_piano.msRequestFullscreen) {
            /* IE11 */
            web_piano.msRequestFullscreen()
        }
    } else {
        screen_state = false
        if (document.exitFullscreen) {
            document.exitFullscreen()
        } else if (web_piano.webkitExitFullscreen) {
            /* Safari, Chrome */
            document.webkitExitFullscreen()
        } else if (web_piano.msExitFullscreen) {
            /* IE11 */
            document.msExitFullscreen()
        }
    }
}
