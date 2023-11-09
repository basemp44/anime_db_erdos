import './Timer.css';

interface ITimer{
  time: number
}

function Timer({
  time
}: ITimer) {
  const [h1, h2] = Math.floor(time/3600%100).toString().padStart(2, '0');
  const [m1, m2] = Math.floor(time/60%60).toString().padStart(2, '0');
  const [s1, s2, _, ms1, ms2] = (time % 60).toFixed(2).padStart(5, '0');
  return (
    <div className="timer">
      <span className='container'><span className='inner'>{h1}</span></span>
      <span className='container'><span className='inner'>{h2}</span></span>
      <span className='container'><span className='inner'>:</span></span>
      <span className='container'><span className='inner'>{m1}</span></span>
      <span className='container'><span className='inner'>{m2}</span></span>
      <span className='container'><span className='inner'>:</span></span>
      <span className='container'><span className='inner'>{s1}</span></span>
      <span className='container'><span className='inner'>{s2}</span></span>
      <span className='container'><span className='inner'>.</span></span>
      <span className='container'><span className='inner'>{ms1}</span></span>
      <span className='container'><span className='inner'>{ms2}</span></span>
    </div>
  );
}


export {
  Timer
}