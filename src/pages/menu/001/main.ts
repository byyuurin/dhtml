import 'uno.css'
import './style.css'

document.querySelector<HTMLDivElement>('.navigation-toggle')?.addEventListener('click', () => {
  document.querySelector('.navigation')?.classList.toggle('is-expand')
})

Array.from(document.querySelectorAll<HTMLAnchorElement>('.menu-item')).forEach(el => {
  el.onclick = function() {
    document.querySelector('.menu-item.is-active')?.classList.toggle('is-active')

    el.classList.toggle('is-active')
  }
})
