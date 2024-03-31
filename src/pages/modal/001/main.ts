import 'uno.css'
import './style.css'

import { $ } from '../../../utils/dom'
import { useModal } from './modal'

$.all('[data-dialog]').forEach((el) => {
  const id = el.dataset.dialog
  const closeable = el.dataset.dialogCloseable === 'true'
  const animation = {
    enterClass: 'dialog-enter',
    leaveClass: 'dialog-leave',
  }
  const modal = useModal({
    element: el,
    closeable,
    onModalClick: () => {
      // ...
    },
    onBeforeEnter: () => {
      el.classList.add(animation.enterClass)
    },
    onAfterEnter: () => {
      el.classList.remove(animation.enterClass)
    },
    onBeforeLeave: () => {
      el.classList.add(animation.leaveClass)
    },
    onAfterLeave: () => {
      el.classList.remove(animation.leaveClass)
    },
  })

  $.all(`[data-dialog-enter="${id}"]`).forEach((trigger) => {
    trigger.addEventListener('click', modal.enter)
  })

  $.all('.dialog .dialog__close-button', el).forEach((trigger) => {
    trigger.addEventListener('click', modal.leave)
  })
})
