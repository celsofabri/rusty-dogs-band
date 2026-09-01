/**
 * Revela um elemento quando ele entra na viewport (scroll reveal).
 * Respeita `prefers-reduced-motion`: nesse caso o conteudo ja nasce visivel.
 */
import { useEffect, useRef, useState } from "react"

const useScrollReveal = ({ threshold = 0.18, rootMargin = "0px 0px -10% 0px", once = true } = {}) => {
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return undefined

    const prefersReducedMotion =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches

    if (prefersReducedMotion || typeof IntersectionObserver === "undefined") {
      setIsVisible(true)
      return undefined
    }

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsVisible(true)
            if (once) observer.unobserve(entry.target)
          } else if (!once) {
            setIsVisible(false)
          }
        })
      },
      { threshold, rootMargin }
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [threshold, rootMargin, once])

  return [ref, isVisible]
}

export default useScrollReveal
