/**
 * Modal acessivel: role="dialog" + aria-modal, fecha com Esc ou clique no fundo,
 * prende o foco enquanto aberto e devolve o foco ao elemento que o abriu.
 */
import React, { useCallback, useEffect, useRef } from "react"
import Icon from "./Icon"
import useBodyScrollLock from "../hooks/useBodyScrollLock"

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea, input, select, iframe, [tabindex]:not([tabindex="-1"])'

const Modal = ({ isOpen, onClose, title, closeLabel = "Close", children }) => {
  const dialogRef = useRef(null)
  const closeRef = useRef(null)
  const lastFocused = useRef(null)

  useBodyScrollLock(isOpen)

  const handleKeyDown = useCallback(
    event => {
      if (event.key === "Escape") {
        event.stopPropagation()
        onClose()
        return
      }

      if (event.key !== "Tab" || !dialogRef.current) return

      const focusable = Array.from(dialogRef.current.querySelectorAll(FOCUSABLE))
      if (focusable.length === 0) return

      const first = focusable[0]
      const last = focusable[focusable.length - 1]

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    },
    [onClose]
  )

  useEffect(() => {
    if (!isOpen) return undefined

    lastFocused.current = document.activeElement
    const timer = window.setTimeout(() => closeRef.current?.focus(), 20)

    return () => {
      window.clearTimeout(timer)
      if (lastFocused.current instanceof HTMLElement) lastFocused.current.focus()
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="modal" onKeyDown={handleKeyDown}>
      {/* O fundo escuro fecha o modal ao clique; o conteudo abaixo intercepta o evento. */}
      <div className="modal__backdrop" onClick={onClose} role="presentation" />
      <div
        className="modal__dialog"
        role="dialog"
        aria-modal="true"
        aria-label={title}
        ref={dialogRef}
      >
        <button type="button" className="modal__close" onClick={onClose} ref={closeRef} aria-label={closeLabel}>
          <Icon name="close" size={22} />
        </button>
        {title ? <h2 className="modal__title">{title}</h2> : null}
        <div className="modal__body">{children}</div>
      </div>
    </div>
  )
}

export default Modal
