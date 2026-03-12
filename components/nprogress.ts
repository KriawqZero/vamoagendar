'use client'

import { useEffect, useRef } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

NProgress.configure({
  showSpinner: false,
  trickleSpeed: 200,
})

function isModifiedEvent(event: MouseEvent) {
  return event.metaKey || event.ctrlKey || event.shiftKey || event.altKey
}

export function NavigationProgress() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const currentUrlRef = useRef('')
  const startedRef = useRef(false)
  const doneTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    currentUrlRef.current = `${pathname}${searchParams.toString() ? `?${searchParams}` : ''}`

    if (doneTimeoutRef.current) {
      clearTimeout(doneTimeoutRef.current)
      doneTimeoutRef.current = null
    }

    if (startedRef.current) {
      NProgress.done()
      startedRef.current = false
    }
  }, [pathname, searchParams])

  useEffect(() => {
    const startProgress = () => {
      if (doneTimeoutRef.current) {
        clearTimeout(doneTimeoutRef.current)
        doneTimeoutRef.current = null
      }
      if (!startedRef.current) {
        NProgress.start()
        startedRef.current = true
      }

      // fallback para evitar barra infinita quando não houver troca real de rota
      doneTimeoutRef.current = setTimeout(() => {
        if (startedRef.current) {
          NProgress.done()
          startedRef.current = false
        }
      }, 6000)
    }

    const handleClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || isModifiedEvent(event)) return

      const target = event.target as Element | null
      const anchor = target?.closest('a')
      if (!anchor) return
      if (anchor.target === '_blank') return
      if (anchor.hasAttribute('download')) return

      const href = anchor.getAttribute('href')
      if (!href || href.startsWith('#')) return

      const url = new URL(anchor.href, window.location.href)
      if (url.origin !== window.location.origin) return

      const nextUrl = `${url.pathname}${url.search}`
      if (nextUrl === currentUrlRef.current) return

      startProgress()
    }

    const handlePopState = () => {
      startProgress()
    }

    window.addEventListener('click', handleClick, true)
    window.addEventListener('popstate', handlePopState)

    return () => {
      window.removeEventListener('click', handleClick, true)
      window.removeEventListener('popstate', handlePopState)
      if (doneTimeoutRef.current) {
        clearTimeout(doneTimeoutRef.current)
        doneTimeoutRef.current = null
      }
      if (startedRef.current) {
        NProgress.done()
        startedRef.current = false
      }
    }
  }, [])

  return null
}
