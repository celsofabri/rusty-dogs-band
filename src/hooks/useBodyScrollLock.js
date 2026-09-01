/** Trava o scroll da pagina enquanto um modal ou o menu mobile estiver aberto. */
import { useEffect } from "react"

const useBodyScrollLock = locked => {
  useEffect(() => {
    if (!locked) return undefined
    const { overflow } = document.body.style
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = overflow
    }
  }, [locked])
}

export default useBodyScrollLock
