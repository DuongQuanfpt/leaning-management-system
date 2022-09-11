import React from 'react';
import CountUp from 'react-countup';
import VisibilitySensor from 'react-visibility-sensor';

const Count = ({counter}) => {
    return ( 
        <CountUp end={counter}>
            {({ countUpRef, start }) => (
                <VisibilitySensor delayedCall onChange={start} >
                    <span ref={countUpRef} className="counter"></span>
                </VisibilitySensor>
            )}
        </CountUp>
	);
}
export default Count;