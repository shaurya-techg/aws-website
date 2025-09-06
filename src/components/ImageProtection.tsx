'use client'

import { useEffect } from 'react'

export default function ImageProtection() {
  useEffect(() => {
    // Prevent right-click context menu only on images
    const handleImageContextMenu = (e: MouseEvent) => {
      if ((e.target as HTMLElement).tagName === 'IMG') {
        e.preventDefault()
        return false
      }
    }

    // Prevent dragging only for images
    const handleImageDragStart = (e: DragEvent) => {
      if ((e.target as HTMLElement).tagName === 'IMG') {
        e.preventDefault()
        return false
      }
    }

    // Prevent F12, Ctrl+Shift+I, Ctrl+U only for development tools
    const handleKeyDown = (e: KeyboardEvent) => {
      // Prevent F12 (Dev Tools)
      if (e.key === 'F12') {
        e.preventDefault()
        return false
      }
      
      // Prevent Ctrl+Shift+I (Dev Tools)
      if (e.ctrlKey && e.shiftKey && e.key === 'I') {
        e.preventDefault()
        return false
      }
      
      // Prevent Ctrl+U (View Source)
      if (e.ctrlKey && e.key === 'u') {
        e.preventDefault()
        return false
      }
    }

    // Add event listeners
    document.addEventListener('contextmenu', handleImageContextMenu)
    document.addEventListener('dragstart', handleImageDragStart)
    document.addEventListener('keydown', handleKeyDown)

    // Cleanup
    return () => {
      document.removeEventListener('contextmenu', handleImageContextMenu)
      document.removeEventListener('dragstart', handleImageDragStart)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  return null // This component doesn't render anything
}
