"use client"

import { cn } from "@/lib/utils"
import { Target, TrendingUp, Award } from "lucide-react"

interface SellerGoalProgressProps {
  currentValue: number
  targetValue: number
  currency?: string
  period?: string
  milestones?: { value: number; label: string }[]
}

export function SellerGoalProgress({
  currentValue = 45200,
  targetValue = 50000,
  currency = "$",
  period = "Monthly",
  milestones = [
    { value: 25000, label: "Bronze" },
    { value: 37500, label: "Silver" },
    { value: 50000, label: "Gold" },
  ],
}: SellerGoalProgressProps) {
  const progressPercent = Math.min((currentValue / targetValue) * 100, 100)
  const remaining = targetValue - currentValue

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="rounded-lg bg-amber-100 p-2 dark:bg-amber-900/50">
            <Target className="h-5 w-5 text-amber-600 dark:text-amber-400" />
          </div>
          <h3 className="font-semibold text-slate-900 dark:text-white">{period} Goal</h3>
        </div>
        <span className="text-2xl font-bold text-slate-900 dark:text-white">
          {progressPercent.toFixed(0)}%
        </span>
      </div>

      {/* Progress bar with gradient */}
      <div className="relative mb-4">
        <div className="h-4 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
          <div
            className="h-full rounded-full bg-gradient-to-r from-amber-400 via-amber-500 to-emerald-500 transition-all duration-1000"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Milestone markers */}
        <div className="absolute -top-1 left-0 right-0 flex justify-between">
          {milestones.map((milestone) => {
            const position = (milestone.value / targetValue) * 100
            const reached = currentValue >= milestone.value
            return (
              <div
                key={milestone.value}
                className="absolute flex flex-col items-center"
                style={{ left: `${position}%`, transform: "translateX(-50%)" }}
              >
                <div
                  className={cn(
                    "h-6 w-6 rounded-full border-2 transition-colors",
                    reached
                      ? "border-amber-500 bg-amber-500"
                      : "border-slate-300 bg-white dark:border-slate-600 dark:bg-slate-800"
                  )}
                >
                  {reached && (
                    <Award className="h-full w-full p-1 text-white" />
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Milestone labels */}
      <div className="mb-6 flex justify-between text-xs">
        {milestones.map((milestone) => {
          const reached = currentValue >= milestone.value
          return (
            <span
              key={milestone.value}
              className={cn(
                "transition-colors",
                reached
                  ? "font-medium text-amber-600 dark:text-amber-400"
                  : "text-slate-400 dark:text-slate-500"
              )}
            >
              {milestone.label}
            </span>
          )
        })}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 rounded-xl bg-slate-50 p-4 dark:bg-slate-800/50">
        <div>
          <p className="text-xs text-slate-500 dark:text-slate-400">Current</p>
          <p className="text-lg font-bold text-slate-900 dark:text-white">
            {currency}{currentValue.toLocaleString()}
          </p>
        </div>
        <div className="text-right">
          <p className="text-xs text-slate-500 dark:text-slate-400">Target</p>
          <p className="text-lg font-bold text-slate-900 dark:text-white">
            {currency}{targetValue.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Encouragement message */}
      {remaining > 0 ? (
        <div className="mt-4 flex items-center gap-2 text-sm">
          <TrendingUp className="h-4 w-4 text-emerald-500" />
          <span className="text-slate-600 dark:text-slate-400">
            Just <span className="font-semibold text-slate-900 dark:text-white">{currency}{remaining.toLocaleString()}</span> more to reach your goal!
          </span>
        </div>
      ) : (
        <div className="mt-4 flex items-center gap-2 rounded-lg bg-emerald-100 p-3 text-sm dark:bg-emerald-900/30">
          <Award className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
          <span className="font-medium text-emerald-700 dark:text-emerald-400">
            Congratulations! You've reached your goal!
          </span>
        </div>
      )}
    </div>
  )
}
