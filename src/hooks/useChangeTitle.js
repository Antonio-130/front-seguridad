import { useEffect } from "react"

export const useChangeTitle = (title) => {
  useEffect(() => {
    document.title = `${title} | Seguridad`
    document.getElementById("header-title").innerHTML = title
  }, [title])
}