class Slider {
    constructor(settings) {
        this.slider = document.querySelector(settings.slider)
        this.sliderParent = this.slider.querySelector('.slider__block')
        this.slides = [...this.sliderParent.children]
        this.next = document.querySelector('.next')
        this.prev = document.querySelector('.prev')

        this.dir = settings.direction.toUpperCase() == 'X' ? 'X' : 'Y'
        this.timeMove = settings.time ?? 1000
        this.width = this.slider.clientWidth
        this.height = this.slider.clientHeight
        this.moveSize = this.dir == 'X' ? this.width : this.height

        this.active = 0

        this.sliderParent.style = `
        position: relative; 
        height: ${this.height}px;
        overflow: hidden;
        `

        this.slides.forEach((slide, index) => {
            slide.style = `
            position: absolute;
            width: ${this.width}px;
            height: ${this.height}px;
            `
            if (index != this.active) {
                slide.style.transform = `translate${this.dir}(${this.width}px)`
            }
            if (index == this.slides.length - 1) {
                slide.style.transform = `translate${this.dir}(${-this.width}px)`
            }
        })

        this.next.addEventListener('click', () => this.move(this.next))
        this.prev.addEventListener('click', () => this.move(this.prev))

        if (settings.autoplay) {
            let interval = setInterval(() => {
                this.move(this.next)
            }, settings.interval)

            this.sliderParent.onmouseenter = function() {
                clearInterval(interval)
            }

            this.sliderParent.onmouseleave = () => {
                interval = setInterval(() => {
                    this.move(this.next)
                }, settings.interval)
            }
        }
    }


    move(btn) {
        this.disabledBtns()

        let prevOrNext = btn == this.next ? -this.moveSize : this.moveSize
        this.slides.forEach((item, i) => {
            item.style.transition = '0ms'
            if (i != this.active) {
                item.style.transform = `translate${this.dir}(${-prevOrNext}px)`
            }
        })

        this.slides[this.active].style.transform = `translate${this.dir}(${prevOrNext}px)`
        this.slides[this.active].style.transition = this.timeMove + 'ms'

        if (btn == this.next) {
            this.active++
            if (this.active == this.slides.length) {
                this.active = 0
            }
        } else if (btn == this.prev) {
            this.active--
            if (this.active < 0) {
                this.active = this.slides.length - 1
            }
        }

        this.slides[this.active].style.transform = `translate${this.dir}(0px)`
        this.slides[this.active].style.transition = this.timeMove + 'ms'
    }

    disabledBtns() {
        this.next.disabled = true
        this.prev.disabled = true
        setTimeout(() => {
            this.next.disabled = this.prev.disabled = false
        }, this.timeMove)
    }
}


let slider = new Slider({
    slider: '.slider',
    direction: 'x',
    time: 1000,
    autoplay: true,
    interval: 3000
})