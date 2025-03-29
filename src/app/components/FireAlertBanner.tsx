"use client"

import { useState } from "react"
import { AlertTriangle, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function FireAlertBanner() {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  return (
    <div className="bg-red-600 text-white py-2 px-4">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            <span className="text-sm font-medium">
              High fire danger today. Stay alert and be prepared to evacuate if notified.
            </span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="text-white hover:bg-red-700 h-8 w-8 p-0"
            onClick={() => setIsVisible(false)}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Dismiss</span>
          </Button>
        </div>
      </div>
    </div>
  )
} 