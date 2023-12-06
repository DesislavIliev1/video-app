addEventListener("DOMContentLoaded", (e) =>{
    const media = document.querySelector('video')
    const playBtn = document.querySelector(".btn-play")
    const pauseBtn = document.querySelector(".btn-pause")
    const stopBtn = document.querySelector(".btn-stop")
    const progressBar = document.querySelector(".progress-bar")
    const progressBut = document.querySelector(".but")
    const videoTimeline = document.querySelector('.video-timeline')
    const currentVidTime = document.querySelector('.current-time')
    const videoDuration = document.querySelector('.video-duration')
    const container = document.querySelector('.wrapper')
    const switchTheme = document.querySelector('.switch-theme');
    const progArea = document.querySelector('.progress-area') 
    const buttons = document.querySelector('.btn');

    const formatTime = time =>{
        let seconds = Math.floor(time % 60);
        let minutes = Math.floor(time / 60) % 60;
        let hours = Math.floor(time / 3600);

        seconds = seconds < 10 ? `0${seconds}` : seconds;
        minutes = minutes < 10 ? `0${minutes}` : minutes;
        hours = hours < 10 ? `0${hours}` : hours;

        if(hours == 0 ){
            return `${minutes}:${seconds}`
        }
        return `${hours}:${minutes}:${seconds}`

    }
    playBtn.addEventListener('click', (e)=>{
    media.play();
    playBtn.style.visibility = 'hidden';
    pauseBtn.style.visibility = 'visible';
    })

    pauseBtn.addEventListener('click', (e)=>{
        media.pause();
        playBtn.style.visibility = 'visible';
        pauseBtn.style.visibility = 'hidden';
        })


        stopBtn.addEventListener('click', (e)=>{
            media.pause();
            media.currentTime = 0 ;
           
           if( pauseBtn.style.visibility === 'visible'){
            
            pauseBtn.style.visibility = 'hidden'

           }
           playBtn.style.visibility = 'visible';
            })


        media.addEventListener('timeupdate', e=>{
                let {currentTime, duration } = e.target;
                console.log(currentTime, duration);
                let percent = (currentTime / duration) * 100 ;
                progressBar.style.width = `${percent}%`;
                progressBut.style.left = `${percent}%`;
                currentVidTime.innerText = formatTime(currentTime);
            })

        videoTimeline.addEventListener("click", e=>{
            let timeLineWidth = videoTimeline.clientWidth;
            media.currentTime = (e.offsetX / timeLineWidth) * media.duration;

        })

        const draggableProgressBar = e =>{
            let timeLineWidth = videoTimeline.clientWidth;
            progressBar.style.width = `${e.offsetX}px`;
            progressBut.style.left = `${e.offsetX}px`;
            media.currentTime = (e.offsetX / timeLineWidth) * media.duration;
            currentVidTime.innerText = formatTime(media.currentTime);

        }

        videoTimeline.addEventListener("mousedown", ()=>{
            videoTimeline.addEventListener("mousemove", draggableProgressBar)
        })

        container.addEventListener("mouseup", ()=>{
            videoTimeline.removeEventListener("mousemove", draggableProgressBar)
        })

        media.addEventListener("loadeddata", e=>{
            videoDuration.innerText = formatTime(e.target.duration);
        })

        videoTimeline.addEventListener("mousemove", e=>{
            const progressTime = videoTimeline.querySelector("span")
            let offsetX = e.offsetX;
            progressTime.style.left = `${offsetX}px`;
            let timeLineWidth = videoTimeline.clientWidth;
            let percent = (e.offsetX / timeLineWidth) * media.duration;
            progressTime.innerText = formatTime(percent)
                
            
        })

        function setCSS(eleID) {
            var currTabElem = document.getElementById(eleID);
        
            currTabElem.setAttribute("class", "dark-progres");
            // currTabElem.setAttribute("className", "some_class_name");
        }

        const theme = localStorage.getItem('theme')

        theme && document.body.classList.add(theme)

        const themeToggle = () =>{
            document.body.classList.toggle('dark-mode');
            progArea.classList.toggle('dark-mode');
            buttons.classList.toggle('dark-mode');
        
           
        
            if (document.body.classList.contains('dark-mode') &&  progArea.classList.contains('dark-mode') &&  buttons.classList.contains('dark-mode') ) {
                localStorage.setItem('theme', 'dark-mode')
                
              } else {
                localStorage.removeItem('theme')
              }
        }

        switchTheme.addEventListener('click', themeToggle);

        
})