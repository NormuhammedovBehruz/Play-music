const container = document.querySelector('.container')
const title = document.querySelector('.title')
const cover = document.querySelector('.cover')
const proccessContainer = document.querySelector('.proccess-container')
const proccessEl = document.querySelector('.proccess')
const audio = document.querySelector('.audio')
const prevEl = document.querySelector('.prev')
const playEl = document.querySelector('.play')
const nextEl = document.querySelector('.next')
const voiceRange = document.querySelector('.voice-range')
const start = document.querySelector('.start')
const end = document.querySelector('.end')
const endTimeMinutes = document.querySelector('.end-time-minutes')
const endTimeSecondes = document.querySelector('.end-time-secondes')
const slider = document.querySelector('input')
const value = document.querySelector('.value')

value.textContent = slider.value;
slider.oninput = function() {
    value.textContent = this.value
}

voiceRange.addEventListener('input', () => {
    audio.volume = voiceRange.value / 100
})

const songs = [
    'Otnika  -  Peaky blinders',
    'Metro Boomin  -  Space cadet',
    'Alessia Cara  -  Here',
    'Xxxtentacion  -  The remedy for a broken heart',
    'Xxxtentacion  -  Hope',
    'Gazan  -  Два крыля на двоих',
]

let currentSong = 0

playSong(songs[currentSong])

function playSong(song) {
    audio.src = `./musics/${song}.mp3`
    title.textContent = song
    cover.src = `./album/${song}.jpg`
}

function playMusic() {
    const isPlay = container.classList.contains('play')

    if (!isPlay) {
        play()
    } else {
        pause()
    }
}

function play() {
    playEl.innerHTML = '<i class="fas fa-pause"></i>'
    container.classList.add('play')
    audio.play()
}

function pause() {
    playEl.innerHTML = '<i class="fas fa-play"></i>'
    container.classList.remove('play')
    audio.pause()
}

function nextMusic() {
    currentSong++
    
    if (currentSong > songs.length - 1) {
        currentSong = 0
    }

    playSong(songs[currentSong])
    
    audio.play()
}

function prevMusic() {
    currentSong--

    if (currentSong < 0) {
        currentSong = songs.length - 1
    }

    playSong(songs[currentSong])
    
    audio.play()    
}

function proccess(e) {
    const currentTime = audio.currentTime
    const widthProccess = (currentTime / e.target.duration) * 100
    proccessEl.style.width = `${widthProccess}%`

    let audioDuration = audio.duration
    let endMinutes = Math.floor(audioDuration / 60)
    let endSecondes = Math.floor(audioDuration % 60)
    end.textContent = `${endMinutes}:${(endSecondes = endSecondes < 10 ? '0' + endSecondes : endSecondes)}`

    let startMinutes = Math.floor(currentTime / 60)
    let startSecondes = Math.floor(currentTime % 60)
    start.textContent = `${startMinutes}:${(startSecondes = startSecondes < 10 ? '0' + startSecondes : startSecondes)}`



}

function changeTimeStep(e) {
    audio.currentTime = (e.offsetX / this.offsetWidth) * audio.duration
}

playEl.addEventListener('click', playMusic)
nextEl.addEventListener('click', nextMusic)
prevEl.addEventListener('click', prevMusic)
audio.addEventListener('timeupdate', proccess)
proccessContainer.addEventListener('click', changeTimeStep)
audio.addEventListener('ended', nextMusic)
