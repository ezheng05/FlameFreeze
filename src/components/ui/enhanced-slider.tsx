import React from 'react';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

interface EnhancedSliderProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step: number;
  icon?: React.ReactNode;
  unit?: string;
  lowLabel?: string;
  midLabel?: string;
  highLabel?: string;
  className?: string;
}

export function EnhancedSlider({
  label,
  value,
  onChange,
  min,
  max,
  step,
  icon,
  unit = '',
  lowLabel = '',
  midLabel = '',
  highLabel = '',
  className,
}: EnhancedSliderProps) {
  return (
    <div className={cn("space-y-3", className)}>
      <div className="flex items-center justify-between">
        <Label className="text-base font-medium tracking-tight flex items-center">
          {icon && <span className="mr-2 text-orange-500">{icon}</span>}
          {label}
        </Label>
        <span className="text-sm font-medium text-orange-600 bg-orange-50 px-2 py-1 rounded-md">
          {value}{unit}
        </span>
      </div>
      
      <div className="relative flex items-center select-none touch-none w-full h-5">
        <Slider
          value={[value]}
          onValueChange={([newValue]) => onChange(newValue)}
          min={min}
          max={max}
          step={step}
          className="w-full"
        />
      </div>
      
      {(lowLabel || midLabel || highLabel) && (
        <div className="flex justify-between text-sm font-medium text-orange-600 px-1">
          <span>{lowLabel || min + unit}</span>
          <span>{midLabel || ((max - min) / 2 + min) + unit}</span>
          <span>{highLabel || max + unit}</span>
        </div>
      )}
    </div>
  );
} 