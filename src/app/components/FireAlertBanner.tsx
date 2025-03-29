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
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-start sm:items-center gap-2 flex-1">
            <AlertTriangle className="h-5 w-5 flex-shrink-0 mt-0.5 sm:mt-0" />
            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
              <span className="text-sm font-medium">
                High fire danger today.
              </span>
              <span className="text-sm">
                Stay alert and be prepared to evacuate if notified.
              </span>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="text-white hover:bg-red-700 h-8 w-8 p-0 flex-shrink-0"
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