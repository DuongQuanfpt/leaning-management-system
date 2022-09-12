import React from 'react'
import CountUp from 'react-countup'
import VisibilitySensor from 'react-visibility-sensor'

const CounterUp = ({ counter }) => {
  return (
    <CountUp end={counter} delay={0}>
      {({ countUpRef, start }) => (
        <VisibilitySensor delayedCall onChange={start}>
          <span ref={countUpRef} className="counter"></span>
        </VisibilitySensor>
      )}
    </CountUp>
  )
}
export default CounterUp
