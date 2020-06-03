import React from 'react'

import { Chart, useChartControls, CC } from './Chart'

const options = { url: `http://127.0.0.1:9000` }
const updateOptions = { background: true }

const App = () => {
  const controls = useChartControls<CC>({ initOnDemand: true })
  return (
    <>
      <button onClick={() => controls.create()}>Create Chart</button>
      <button onClick={() => controls.update()}>Update Chart</button>
      <button onClick={() => controls.destroy()}>Destroy Chart</button>
      <Chart height={500} options={options} updateOptions={updateOptions} controls={controls} />
    </>
  )
}

export default App
