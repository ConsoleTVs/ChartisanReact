import React, { createRef, useState, useEffect, useMemo } from 'react'
import { Chartisan, isChartisan, ChartisanOptions, UpdateOptions } from '@chartisan/chartisan'

export interface ControllerOptions {
  initOnDemand: boolean
}

export class ChartController<D> {
  _eventTarget = new EventTarget()
  _options: ControllerOptions = { initOnDemand: false }
  constructor(options?: ControllerOptions) {
    this._options = { ...this._options, ...options }
  }
  create(detail?: ChartisanOptions<D>) {
    this._eventTarget.dispatchEvent(new CustomEvent('create', { detail }))
  }
  update(detail?: UpdateOptions<D>) {
    this._eventTarget.dispatchEvent(new CustomEvent('update', { detail }))
  }
  destroy() {
    this._eventTarget.dispatchEvent(new CustomEvent('destroy'))
  }
}

export interface ChartisanChartProps<D> {
  chartisan: isChartisan<D>
  options?: ChartisanOptions<D>
  updateOptions?: UpdateOptions<D>
  height?: string | number
  controls?: ChartController<D>
}

export interface ChartProps<D> extends Omit<ChartisanChartProps<D>, 'chartisan'> {}

export function useChartControls<D>(options?: ControllerOptions) {
  const [controller] = useState(new ChartController<D>(options))
  return controller
}

export function ChartisanChart<D>({ height, chartisan, options, updateOptions, controls }: ChartisanChartProps<D>) {
  const chartStyle = useMemo(() => ({ height }), [height])
  const division = createRef<HTMLDivElement>()
  const [chart, setChart] = useState<Chartisan<D>>()
  const createChart = (data?: ChartisanOptions<D>) => {
    setChart(new chartisan({ el: division.current, ...data }))
  }
  const updateChart = (data?: UpdateOptions<D>) => {
    chart?.update(data)
  }
  const destroyChart = () => {
    chart?.destroy()
  }

  useEffect(() => {
    const initOnDemand = controls?._options.initOnDemand
    if (typeof initOnDemand !== 'undefined' && !initOnDemand) {
      createChart(options)
      return destroyChart
    }
    return () => {}
  }, [controls, options])

  useEffect(() => {
    updateChart(updateOptions)
  }, [updateOptions])

  useEffect(() => {
    const updateHandler = (event: CustomEvent) => {
      updateChart({ ...updateOptions, ...event.detail })
    }
    controls?._eventTarget.addEventListener('update', updateHandler)
    return () => controls?._eventTarget.removeEventListener('update', updateHandler)
  }, [controls, updateOptions, chart])

  useEffect(() => {
    controls?._eventTarget.addEventListener('destroy', destroyChart)
    return () => controls?._eventTarget.removeEventListener('destroy', destroyChart)
  }, [controls, chart])

  useEffect(() => {
    const createHandler = (event: CustomEvent) => {
      createChart({ ...options, ...event.detail })
    }
    controls?._eventTarget.addEventListener('create', createHandler)
    return () => controls?._eventTarget.removeEventListener('create', createHandler)
  }, [controls, options, chart])

  return <div style={chartStyle} ref={division} />
}