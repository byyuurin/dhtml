import { $ } from '../../../utils/dom'

interface ModalManagerOptions {
  /** basic z-index */
  zIndex: number
  /** css animation settings */
  animation: {
    duration: number
    enterClass: string
    leaveClass: string
  }
}

interface UseModalOptions {
  /** modal content element */
  element: HTMLElement
  closeable?: boolean
  onModalClick?: () => void
  onBeforeEnter?: () => void
  onAfterEnter?: () => void
  onBeforeLeave?: () => void
  onAfterLeave?: () => void
}

interface ModalInstance {
  element: HTMLElement
  style: HTMLElement['style']
  enter: () => void
  leave: () => void
}

function createModalOverlay(root: HTMLElement, className: string) {
  const overlay = document.createElement('div')
  overlay.className = className
  root.appendChild(overlay)
  return overlay
}

// function wait(callback: () => void, ms: number) {
//   return new Promise<void>((resolve) => {
//     setTimeout(() => {
//       callback()
//       resolve()
//     }, ms)
//   })
// }

// function handleModalClick() {

// }

// function handleModalEnter() {}

// function handleModalLeave() {

// }

export function createModalManager(overlayClass: string, options: ModalManagerOptions) {
  const root = document.body
  const rootStyle = { ...root.style }
  const properties = {
    duration: '--modal-duration',
  }
  const instances: Record<string, ModalInstance | undefined> = {}
  const history: string[] = []
  let promise: Promise<void> | null = null
  let instanceIndex = 0
  let layerIndex = options.zIndex

  const getOverlay = () => $<HTMLDivElement>(`.${overlayClass}`, root)

  const nextLayer = () => {
    layerIndex += 2
    return layerIndex
  }

  const modalLock = (p: Promise<void>) => {
    p.finally(() => {
      promise = null
    })
    promise = p
  }

  const modalEnter = (key: string, modalOptions: UseModalOptions) => {
    if (promise) return
    if (history.includes(key)) return

    modalLock(new Promise((resolve) => {
      const { enterClass, duration } = options.animation
      const { onBeforeEnter, onAfterEnter } = modalOptions
      const modal = instances[key]!
      let overlay = getOverlay()

      if (!overlay) overlay = createModalOverlay(root, overlayClass)

      history.push(key)
      root.style.overflow = 'hidden'
      root.style.setProperty(properties.duration, `${options.animation.duration}ms`)
      modal.element.style.zIndex = `${nextLayer()}`
      modal.element.style.display = modal.style.display
      overlay.style.zIndex = `${+modal.element.style.zIndex - 1}`

      if (history.length <= 1) overlay.classList.add(enterClass)

      if (onBeforeEnter)
        onBeforeEnter()

      setTimeout(() => {
        if (history.length <= 1) overlay?.classList.remove(enterClass)

        if (onAfterEnter)
          onAfterEnter()

        resolve()
      }, duration)
    }))
  }

  const modalLeave = (key: string, modalOptions: UseModalOptions) => {
    if (promise) return
    if (!history.includes(key)) return

    modalLock(new Promise((resolve) => {
      const { leaveClass, duration } = options.animation
      const { onBeforeLeave, onAfterLeave } = modalOptions
      const modal = instances[key]!
      const overlay = getOverlay()!
      history.pop()

      if (!history.length) overlay.classList.add(leaveClass)

      if (onBeforeLeave) onBeforeLeave()

      setTimeout(() => {
        modal.element.style.zIndex = ''
        modal.element.style.display = 'none'

        if (!history.length) {
          overlay.classList.remove(leaveClass)
          root.removeChild(overlay)
          root.style.overflow = rootStyle.overflow
          root.style.removeProperty(properties.duration)
          layerIndex = options.zIndex
        }
        else {
          const id = history.slice(-1)[0]
          overlay.style.zIndex = `${+instances[id]!.element.style.zIndex - 1}`
        }

        if (onAfterLeave) onAfterLeave()

        resolve()
      }, duration)
    }))
  }

  const useModal = (modalOptions: UseModalOptions) => {
    const { element, closeable = false, onModalClick } = modalOptions
    let key = ''

    if (element) {
      key = `${overlayClass}-${++instanceIndex}`
      instances[key] = {
        element,
        style: { ...element.style },
        enter: () => modalEnter(key, modalOptions),
        leave: () => modalLeave(key, modalOptions),
      }
      element.style.display = 'none'
      element.addEventListener('click', async (e) => {
        if (e.target !== element) return
        if (promise) return
        if (onModalClick) onModalClick()
        if (closeable) return instances[key]!.leave()

        modalLock(new Promise((resolve) => {
          instances[key]!.element.classList.add('dialog-shake')
          setTimeout(() => {
            instances[key]!.element.classList.remove('dialog-shake')
            resolve()
          }, options.animation.duration)
        }))
      })
    }

    return {
      enter: () => instances[key]?.enter(),
      leave: () => instances[key]?.leave(),
    }
  }

  return {
    useModal,
  }
}

export const { useModal } = createModalManager('modal', {
  zIndex: 1000,
  animation: {
    duration: 300,
    enterClass: 'modal-enter',
    leaveClass: 'modal-leave',
  },
})
