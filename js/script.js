

window.addEventListener('DOMContentLoaded', () => {

    // *************  TABS  *******************
    const tabs = document.querySelectorAll(".tabheader__item")
        tabContents = document.querySelectorAll(".tab_content")
        tabParents = document.querySelector('.tabheader__items')

    function hideTabContents () {
        tabContents.forEach(tabContent => {
            tabContent.classList.add('hide')
            tabContent.classList.remove('show')
        });

        tabs.forEach(tab => {
            tab.classList.remove('tabheader__item_active')
        })
    }   
    
    function showTabContent(index = 0) {
        tabContents[index].classList.add('show', 'fade') 
        tabContents[index].classList.remove('hide')
        tabs[index].classList.add('tabheader__item_active')
    }
    hideTabContents()
    showTabContent()
    
    tabParents.addEventListener('click', event => {
        const target = event.target

        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((tab, index) => {
                if (target === tab) {
                hideTabContents()
                showTabContent(index)
                }
            })
        }
    })

     // *************  loader  *******************
    const loaderWrapper = document.querySelector(".loader-wrapper");

    setTimeout( () => {
        loaderWrapper.style.display = 'none'
    },1500)


     // *************  Timer  *******************
    const deadline = '2024-03-27'

    function getTimeRemaining (endTime) {
        let days, hours, minutes, seconds
        const time = Date.parse(endTime) - Date.parse(new Date())

        if (time <= 0) {
            days = 0
            hours = 0
            minutes = 0
            seconds = 0
        } else {
            days = Math.floor(time / (1000 * 60 * 60 * 24))
            hours = Math.floor((time / (1000 * 60 * 60)) % 24)
            minutes = Math.floor((time / (1000 * 60)) % 60)
            seconds = Math.floor((time / (1000)) % 60)
        }

        return { 
            totelTime: time,
            days,
            hours,
            minutes,
            seconds,
        }
    }

    function formatNumber (number) {
        if (number >= 0 && number < 10) {
            return `0${number}`
        } else {
            return number
        }
    }

    function setClock (selector, endTime) {
        const timer = document.querySelector(selector),

        days = timer.querySelector('#days'),
        hours = timer.querySelector('#hours'),
        minutes = timer.querySelector('#minutes'),
        seconds = timer.querySelector('#seconds'),
        timeInterval = setInterval(updateClock, 1000)
        updateClock()

    function updateClock () {
        const time = getTimeRemaining (endTime)

        days.textContent = formatNumber (time.days)
        hours.textContent = formatNumber (time.hours)
        minutes.textContent = formatNumber (time.minutes)
        seconds.textContent = formatNumber (time.seconds)

        if (time.totelTime <= 0) {
            clearInterval(timeInterval)
        }
    }

    }

    setClock('.timer', deadline)


    // *************  Modal  *******************
    const modalOpenBtn = document.querySelectorAll('[data-modal]'),
    modal = document.querySelector('.modal'),
    modalCloseBtn = document.querySelector('[data-modal-close]')
    modalContent = document.querySelector('.modal__content')

    function openModal() {
        modal.classList.add('show', 'fade')
        modal.classList.remove('hide')
        modalContent.classList.add('modal_fade')
        document.body.style.overflow = "hidden"  
        clearInterval(modalTimerId)
    }

    function closeModal() {
        modal.classList.add('remove')
        modal.classList.remove('show')
        document.body.style.overflow = ""
    }

    modalOpenBtn.forEach(btn  => {
        btn.addEventListener('click', () => {
            openModal()
        })
    })

    modalCloseBtn.addEventListener('click', () => {
        closeModal()
    })

    modal.addEventListener('click', (evt) => {
        if (evt.target === modal) {
            closeModal()
        } 
    })

    document.addEventListener("keydown", (event) => {
        if (event.code === 'Escape' && modal.classList.contains("show")) {
            closeModal()
        }
    })

    const modalTimerId = setTimeout(openModal, 4000);



    // *************  Class  *******************
    class OfferMenu {
        constructor (src, alt, title, descr, discount, sale, parentSelector) {
            this.src = src
            this.alt = alt
            this.title = title
            this.descr = descr
            this.discount = discount
            this.sale = sale
            this.parent = document.querySelector(parentSelector)
            this.formatToUSD ()
        }

        formatToUSD () {
            this.discount = this.discount.toLocaleString("en-US", {style:"currency", currency:"USD"});
            this.sale = this.sale.toLocaleString("en-US", {style:"currency", currency:"USD"});
        }

        render () {
            const element = document.createElement("div")
            element.innerHTML = `
            <img src="${this.src}" alt="${this.alt}">
            <div>
                <h3>${this.title}</h3>
                <p>${this.descr}</p>
                <p><del>${this.discount}</del> <span class="primary-text">${this.sale}</span></p>
            </div>
            `

            this.parent.append(element)
        }
    }


    fetch("http://localhost:3000/offers", {
        method: "GET",
        headers: {"content-type": "application/json"}
    })
    .then(response => response.json())
    .then(data => {
        data.forEach(offer => {
            const {src, alt, title, descr, discount, sale, parentSelector} = offer
            new OfferMenu(src, alt, title, descr, discount, sale, parentSelector).render()
        })
    })

    // const offers = [
    //     {
    //         src: "./img/offer1.png",
    //         alt:  "Quattro Pasta",
    //         title: "Quattro Pasta",
    //         descr: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam, quibusdam.",
    //         discount: 55,
    //         sale: 20,
    //         parentSelector: ".offers-items"
    //     },
    //     {
    //         src: "./img/offer2.png",
    //         alt:  "Vegertarian Pasta",
    //         title: "Vegertarian Pasta",
    //         descr: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam, quibusdam.",
    //         discount: 65,
    //         sale: 25,
    //         parentSelector: ".offers-items"
    //     },
    //     {
    //         src: "./img/offer3.png",
    //         alt:  "Quattro Pasta",
    //         title: "Quattro Pasta",
    //         descr: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam, quibusdam.",
    //         discount: 25,
    //         sale: 15,
    //         parentSelector: ".offers-items"
    //     }
    // ]

    // offers.forEach(offer => {
    //     const {src, alt, title, descr, discount, sale, parentSelector} = offer
    //     new OfferMenu(src, alt, title, descr, discount, sale, parentSelector).render()
    // })



    
    // const firstOffer = new OfferMenu(
    //     "./img/offer1.png",
    //     "Vegertarian Pasta",
    //     "Vegertarian Pasta",
    //     "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam, quibusdam.",
    //     65,
    //     25,
    //     ".offers-items"
    // )
    // const secondOffer = new OfferMenu(
    //     "./img/offer2.png",
    //     "Vegertarian Pasta",
    //     "Vegertarian Pasta",
    //     "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam, quibusdam.",
    //     65,
    //     25,
    //     ".offers-items"
    // )
    // const thirdOffer = new OfferMenu(
    //     "./img/offer3.png",
    //     "Quattro Pasta",
    //     "Quattro Pasta",
    //     "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam, quibusdam.",
    //     25,
    //     15,
    //     ".offers-items"
    // )

    // firstOffer.render()
    // secondOffer.render()
    // thirdOffer.render()



    // FORM 
    const form = document.querySelector('form'),
        telegramTokenBOt = "6862412072:AAGWRiPkQOq7299xrthLt51G6wTK512Bqo4",
        chatID = "1660712160"

    const message = {
        loading: "loading...",
        success: "thank you for contacting with us",
        failure: "something went wrong"
    }    

    form.addEventListener('submit', event => {
        event.preventDefault()
        const loader = document.createElement("div")
        loader.classList.add('loader')
        loader.style.height = '20px'
        loader.style.width = '20px'
        loader.style.marginTop = '20px'
        form.append(loader)


        const formData = new FormData(form) 

        const object = {} 
        formData.forEach((value, key) =>{
            object[key] = value
        })

        fetch(`https://api.telegram.org/bot${telegramTokenBOt}/sendMessage`, {
            method: "POST",
            headers: {"content-type": "application/json"},
            body: JSON.stringify({
                chat_id: chatID,
                text: `Name: ${object.name}. phone: ${object.phone}`
            })
        })
        .then(() => {
            showStatusMessage(message.success)
            form.reset()
        })
        .catch(() => showStatusMessage(message.failure))
        .finally(() => loader.remove())
    })


    function showStatusMessage (message) {
        const modalDialog = document.querySelector('.modal__dialog')

        modalDialog.classList.add('hide')
        openModal()


        const statusModal = document.createElement("div")
        statusModal.classList.add('modal__dialog')
        statusModal.innerHTML = `
        <div class="modal__content">
            <div data-modal-close class="modal__close">&times;</div>
            <div class="modal__title">${message}</div>
        </div>
        `

        document.querySelector('.modal').append(statusModal)

        setTimeout(() =>{
            statusModal.remove()
            modalDialog.classList.add('show')
            modalDialog.classList.remove('hide')
            closeModal()
        }, 3000)
    }
})