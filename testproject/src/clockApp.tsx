// import React, { useState, useRef } from 'react';
// import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

// export default function App() {
//   const [isRunning, setIsRunning] = useState(false);
//   const [time, setTime] = useState(0);
//   const intervalRef = useRef<number | null>(null);
//   const [lapTimes, setLapTimes] = useState<number[]>([]);

//   const startTimer = () => {
//     if (!isRunning) {
//       intervalRef.current = setInterval(() => {
//         setTime(prevTime => prevTime + 1);
//       }, 1000);
//       setIsRunning(true);
//     }
//   };

//   const stopTimer = () => {
//     if (isRunning) {
//       clearInterval(intervalRef.current);
//       setIsRunning(false);
//     }
//   };

//   const resetTimer = () => {
//     clearInterval(intervalRef.current);
//     setIsRunning(false);
//     setTime(0);
//   };

//   const formatTime = (time: number) => {
//     const minutes = Math.floor(time / 60);
//     const seconds = time % 60;
//     return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.timer}>{formatTime(time)}</Text>
//       <View style={styles.buttonContainer}>
//         <TouchableOpacity style={styles.button} onPress={startTimer}>
//           <Text style={styles.buttonText}>Start</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.button} onPress={stopTimer}>
//           <Text style={styles.buttonText}>Stop</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.button} onPress={resetTimer}>
//           <Text style={styles.buttonText}>Reset</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5FCFF',
//   },
//   timer: {
//     fontSize: 80,
//     marginBottom: 40,
//   },
//   buttonContainer: {
//     flexDirection: 'row',
//   },
//   button: {
//     backgroundColor: '#4CAF50',
//     padding: 10,
//     marginHorizontal: 10,
//     borderRadius: 5,
//   },
//   buttonText: {
//     color: 'white',
//     fontSize: 20,
//   },
// });
import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';

const App = () => {
  const [isTimerStart, setIsTimerStart] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [lapTimes, setLapTimes] = useState<number[]>([]);

  const interval = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleLap = () => {
    setIsTimerStart(false);
    setLapTimes(prevLapTimes => [...prevLapTimes, currentTime]);
  };

  useEffect(() => {
    if (isTimerStart) {
      interval.current = setTimeout(() => {
        setCurrentTime(prevTime => prevTime + 1000);
      }, 1000);
    } else if (!isTimerStart && currentTime !== 0) {
      if (interval.current) {
        clearTimeout(interval.current);
      }
    }
    return () => {
      if (interval.current) {
        clearTimeout(interval.current);
      }
    };
  }, [isTimerStart, currentTime]);

  const formatTime = (milliseconds: number) => {
    const seconds = Math.floor((milliseconds / 1000) % 60);
    const minutes = Math.floor((milliseconds / 1000 / 60) % 60);
    const hours = Math.floor((milliseconds / 1000 / 3600) % 24);

    const displaySeconds = seconds < 10 ? `0${seconds}` : seconds;
    const displayMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const displayHours = hours < 10 ? `0${hours}` : hours;

    return `${displayHours}:${displayMinutes}:${displaySeconds}`;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.timerWrapper}>
          <Text style={styles.timer}>{formatTime(currentTime)}</Text>
        </View>

        <View style={styles.buttonWrapper}>
          <TouchableHighlight
            style={styles.button}
            underlayColor="gray"
            onPress={() => {
              setIsTimerStart(prevState => !prevState);
            }}
          >
            <Text>{isTimerStart ? 'STOP' : 'START'}</Text>
          </TouchableHighlight>

          <TouchableHighlight
            style={styles.button}
            underlayColor="gray"
            onPress={() => {
              setIsTimerStart(false);
              handleLap();
            }}
          >
            <Text>LAP</Text>
          </TouchableHighlight>
        </View>
      </View>

      <View style={styles.footer}>
        {lapTimes.map((lapTime, index) => (
          <View key={index} style={styles.lap}>
            <Text style={styles.lapText}>{`Lap #${index + 1}`}</Text>
            <Text style={styles.lapText}>{formatTime(lapTime)}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 40,
  },
  header: {
    flex: 1,
  },
  footer: {
    flex: 1,
  },
  timerWrapper: {
    flex: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonWrapper: {
    flex: 3,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  lap: {
    justifyContent: 'space-around',
    flexDirection: 'row',
    backgroundColor: 'lightgray',
    padding: 10,
    marginTop: 10,
  },
  button: {
    borderWidth: 1,
    alignItems: 'center',
    height: 100,
    width: 100,
    borderRadius: 50,
    justifyContent: 'center',
  },
  timer: {
    fontSize: 60,
  },
  lapText: {
    fontSize: 30,
  },
});

export default App;