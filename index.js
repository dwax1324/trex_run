document.addEventListener("DOMContentLoaded", () => {

    const dino = document.querySelector('.dino')
    const grid = document.querySelector('.grid')
    const gameOver = document.getElementById('over')
    const greeting = document.getElementById('greeting')
    const docScore = document.querySelector('.score')
    const cloud1 = document.querySelector('.cloud1')
    const cloud2 = document.querySelector('.cloud2')
    const cloud3 = document.querySelector('.cloud3')
    let score = 0
    let isJumping = false
    let isStarted = false
    let gravity = 0.9
    let isGameOver = false
    setInterval(() => {
        if (isStarted === false) {
            greeting.innerText = "Press Space to Start"
        } else {
            greeting.innerText = ""
            docScore.innerHTML = score
            if (!isGameOver) score++
            else {
            greeting.innerText = "reload to restart"
            }
        }
    }, 10);
    function control(e) {
        if (e.keyCode === 32) {
            if (isStarted) {
                if (!isJumping) {
                    isJumping = true
                    jump()
                }
                jump()
            } else {
                isStarted = true
                generateObstacles()
            }
        }
    }

    document.addEventListener('keydown', control)
    

    let position = 0
    function jump() {
        let count = 0
        if (position > 5) return
        let timerId = setInterval(function () {
            
            //move down
            if (count === 15) {
                clearInterval(timerId)

                let donwTimerId = setInterval(function () {
                    if (count === 0) {
                        clearInterval(donwTimerId)
                        isJumping= false
                    }
                    position -= 1
                    count--
                    position = position * gravity
                dino.style.bottom = position +'px'

                },15)
            }

            //move up
            count ++
            position += 30
            position = position * gravity
            dino.style.bottom = position + 'px'
        },20)

    
    }


    let cloud1Position = 100
    let cloud2Position = 130
    let cloud3Position = 160
    setInterval(() => {
    cloud1.style.left =  cloud1Position + 'vw'
        cloud2.style.left = cloud2Position + 'vw'
        cloud3.style.left =  cloud3Position + 'vw'
        cloud1Position -= 0.2
        cloud2Position -= 0.1
        cloud3Position -= 0.3
        if (cloud1Position < -30) {
            cloud1Position = 100
        }
        if (cloud2Position < -30) {
            cloud2Position = 130
        }
        if (cloud3Position < -30) {
            cloud3Position = 160
        }
        
    }, 20);


    function generateObstacles() {
        let randomTime = Math.random() * 4000
        let obstaclePosition = 100
        const obstacle = document.createElement('div')
        obstacle.classList.add('obstacle')
        grid.appendChild(obstacle)
        obstacle.style.left = obstaclePosition + 'vw'
        obstacle.innerText = "🔥"
        obstacle.style.fontSize = "60px";
        

        let timerId = setInterval(() => {
            if (obstaclePosition > 0 && obstaclePosition < 3 && position < 45) {
                clearInterval(timerId)
                isGameOver = true
                gameOver.innerText = 'GameOver'
                //remove

                while (grid.firstChild) {
                    grid.removeChild(grid.lastChild)
                }
            }
            obstaclePosition -= 1
            obstacle.style.left = obstaclePosition + 'vw'
        },20)
        if(!isGameOver) setTimeout(generateObstacles, randomTime)
    }



})