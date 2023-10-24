import "./App.css";
import React from 'react';

function App() {
  return (
    <>
      <div className='App'>
          <FlipClock />
      </div>
    </>
   
  );
}

export default App;

const AnimatedCard = ({ animation, digit }) => {
  return(
    <div className={`flipCard ${animation}`}>
      <span>{digit}</span>
    </div>
  );
};

// function component
const StaticCard = ({ position, digit }) => {
  return(
    <div className={position}>
      <span>{digit}</span>
    </div>
  );
};

// function component
const FlipUnitContainer = ({ digit, shuffle, unit }) => {	
  
  // assign digit values
  let currentDigit = digit;
  let previousDigit = digit;

  // to prevent a negative value
  if ( unit !== 'hours') {
    previousDigit = previousDigit === -1 
      ? 59 
      : previousDigit;
  } else {
    previousDigit = previousDigit === -1 
      ? 23 
      : previousDigit;
  }

  // add zero
  if ( currentDigit < 10 ) {
    currentDigit = `0${currentDigit}`;
  } 
  if ( previousDigit < 10 ) {
    previousDigit = `0${previousDigit}`;
  }

  // shuffle digits
  const digit1 = shuffle 
    ? previousDigit 
    : currentDigit;
  const digit2 = !shuffle 
    ? previousDigit 
    : currentDigit;

  // shuffle animations
  const animation1 = shuffle 
    ? 'fold' 
    : 'unfold';
  const animation2 = !shuffle 
    ? 'fold' 
    : 'unfold';

  return(
    <div className={'flipUnitContainer'}>
      <StaticCard 
        position={'upperCard'} 
        digit={currentDigit} 
        />
      <StaticCard 
        position={'lowerCard'} 
        digit={previousDigit} 
        />
      <AnimatedCard 
        digit={digit1}
        animation={animation1}
        />
      <AnimatedCard 
        digit={digit2}
        animation={animation2}
        />
        <span style={{marginLeft:"15px"}}>{unit}</span>
    </div>
  );
};

// class component
class FlipClock extends React.Component {
	
  constructor(props) {
		super(props);
    const time = new Date();
		this.state = {
      day :time.getDay(),
      dayShuffle:true,
			hours: time.getHours(),
			hoursShuffle: true,
			minutes: time.getMinutes(),
			minutesShuffle: true,
			seconds: time.getSeconds,
			secondsShuffle: true
		};
	}
  
	componentDidMount() {
		this.timerID = setInterval(
			() => this.updateTime(),
      //1000
		);
   // this.timerID=()=> this.updateTime()
	}
  
	componentWillUnmount() {
		clearInterval(this.timerID);
	}
  
	updateTime() {
		const time = new Date;
    const day = time.getDay();
		const hours =time.getHours();
		const minutes =time.getMinutes();
		const seconds =60-time.getSeconds();

    if( day !== this.state.day) {
			const dayShuffle = !this.state.dayShuffle;
			this.setState({
				day,
				dayShuffle
			});
		}
		if( hours !== this.state.hours) {
			const hoursShuffle = !this.state.hoursShuffle;
			this.setState({
				hours,
				hoursShuffle
			});
		}

		if( minutes !== this.state.minutes) {
			const minutesShuffle = !this.state.minutesShuffle;
			this.setState({
				minutes,
				minutesShuffle
			});
		}
		if( seconds !== this.state.seconds) {
			const secondsShuffle = !this.state.secondsShuffle;
			this.setState({
				seconds,
				secondsShuffle
			});
		}
	}
  
	render() {
		const { 
      day,
      dayShuffle,
      hours, 
      minutes, 
      seconds, 
      hoursShuffle, 
      minutesShuffle, 
      secondsShuffle 
    } = this.state;
		
    return(
			<div className={'flipClock'}>
        <FlipUnitContainer 
					unit={'Days'}
					digit={day} 
					shuffle={dayShuffle} 
					/>
				<FlipUnitContainer 
					unit={'Hours'}
					digit={hours} 
					shuffle={hoursShuffle} 
					/>
				<FlipUnitContainer 
					unit={'Minutes'}
					digit={minutes} 
					shuffle={minutesShuffle} 
					/>
				<FlipUnitContainer 
					unit={'Seconds'}
					digit={seconds} 
					shuffle={secondsShuffle} 
					/>
			</div>
		);
	}
}
