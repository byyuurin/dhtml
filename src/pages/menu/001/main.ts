import 'uno.css'
import './style.css'
import { $ } from '../../../utils/dom'

$<HTMLDivElement>('.navigation-toggle')?.addEventListener('click', () => {
  $('.navigation')?.classList.toggle('is-expand')
})

Array.from($.all<HTMLAnchorElement>('.menu-item')).forEach(el => {
  el.onclick = function () {
    $('.menu-item.is-active')?.classList.toggle('is-active')
    el.classList.toggle('is-active')
  }
})

if (window.innerWidth >= 768)
  $<HTMLDivElement>('.navigation-toggle')?.dispatchEvent(new Event('click'))
