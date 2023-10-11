import React, { createRef, useEffect, useMemo, useRef, useState } from "react";
// import randomwords from 'random-words';  //not working
// var randomwords = require('random-words');  //not working
import { generate } from "random-words";
import UpperMenu from "./UpperMenu";
import { GlobalStyles } from "../Styles/global";
import { useTestMode } from "../Context/TestModeContext";
import Stats from "./Stats";

const TypingBox = () => {
  const { testTime } = useTestMode(); // from useContext
  const [countDown, setCountDown] = useState(testTime);
  const [testStart, setTestStart] = useState(false);
  const [testEnd, setTestEnd] = useState(false);
  const [currWordIndex, setCurrWordIndex] = useState(0);
  const [currCharIndex, setCurrCharIndex] = useState(0);
  const [intervelId, setIntervalId] = useState(null);
  const [correctChars, setCorrectChars] = useState(0); // correct chars count
  const [incorrectChars, setIncorrectChars] = useState(0); // incorrect chars count
  const [missedChars, setMissedChars] = useState(0); // missed chars count
  const [extraChars, setExtraChars] = useState(0); // mistakenly added extra chars count
  const [correctWords, setCorrectWords] = useState(0);
  const [graphData, setGraphData] = useState([]); // graph data
  const [wordsArray, setWordsArray] = useState(() => {
    return generate(70);
  });
  
  // const emptySpans = ()=>{
  //   return Array(wordsArray.length)
  //   .fill(0)
  //   .map((i) => createRef(null));
  // }
  const inputRef = useRef(null);
  // const [wordsSpanRef, setWordSpanRef] = useState(emptySpans());

  // giving referance to all the words element...which is in the wordsArray..
  // console.log(wordsArray);

  // giving referance to every word.
  const wordsSpanRef = useMemo(() => {
    return Array(wordsArray.length)
      .fill(0)
      .map((i) => createRef(null));
  }, [wordsArray]);

  // writing logic to make timer for typing test..
  const startTimer = () => {
    const intervalId = setInterval(timer, 1000);
    setIntervalId(intervalId);
    function timer() {
      setCountDown((latestCountDown) => {
        // logic to add graphData
        setCorrectChars((correctChars) => {
          setGraphData((graphData) => {
            // this will rerender again and again and this is not a good approach
            // because of this we will redundent value on the graph
            return [
              ...graphData,
              [
                testTime-latestCountDown+1, // test time on 0th index adding bcz want to start from 1
                (correctChars/5)/((testTime-latestCountDown+1)/60), // wpm data
                incorrectChars,
              ]
            ];
          });

          return correctChars;
        })
        if (latestCountDown === 1) {
          setTestEnd(true);
          clearInterval(intervalId);
          return 0;
        }

        return latestCountDown - 1;
      });
    }
  };

  // when we click on time mode on running typing test the whole website should reset again...
  const resetTest = () => {
    clearInterval(intervelId);
    setCountDown(testTime);
    setCurrCharIndex(0);
    setCurrWordIndex(0);
    setTestStart(false);
    setTestEnd(false);
    setWordsArray(generate(70));
    // setWordSpanRef(emptySpans())
    setGraphData([]);
    setCorrectChars(0);
    setCorrectWords(0);
    setExtraChars(0);
    setIncorrectChars(0);
    setMissedChars(0);
    resetWordsSpanRefClassName();
    focusInput();
  };
  const resetWordsSpanRefClassName = () => {
    wordsSpanRef.map((i) => {
      Array.from(i.current.childNodes).map((j) => {
        j.className = "";
      });
    });
    wordsSpanRef[0].current.childNodes[0].className = "current";
  };

  // handling user input / user interection.. And using childNodes of current word



  const handleUserInput = (e) => {
    // console.log(e.target.value);
    if (!testStart) {
      startTimer();
      setTestStart(true);
    }

    const allCurrChars = wordsSpanRef[currWordIndex].current.childNodes;
    // writing logic for space button..
    if (e.keyCode === 32) {
      // calculate correct words..
      let correctCharsInWord =
        wordsSpanRef[currWordIndex].current.querySelectorAll(".correct");
      if (correctCharsInWord.length === allCurrChars.length) {
        setCorrectWords(correctWords + 1);
      }

      // logic to remove curser from end..
      if (allCurrChars.length <= currCharIndex) {
        // curser present as a right one
        allCurrChars[currCharIndex - 1].classList.remove("current-right");
      } else {
        // removing curser from inbetween the word, if pressed space
        allCurrChars[currCharIndex].classList.remove("current");
      }

      wordsSpanRef[currWordIndex + 1].current.childNodes[0].className =
        "current";
      setCurrWordIndex(currWordIndex + 1);
      setCurrCharIndex(0);
      return;
    }
    // writing logic for backSpace button...removing typing mistakes
    if (e.keyCode === 8) {
      if (currCharIndex !== 0) {
        // when we are at the end of the word logic for backspace..
        if (allCurrChars.length === currCharIndex) {
          if (allCurrChars[currCharIndex - 1].className.includes("extra")) {
            allCurrChars[currCharIndex - 1].remove();
            allCurrChars[currCharIndex - 2].className += " current-right";
          } else {
            allCurrChars[currCharIndex - 1].className = "current";
          }
          setCurrCharIndex(currCharIndex - 1);
          return;
        }
        allCurrChars[currCharIndex].className = "";
        allCurrChars[currCharIndex - 1].className = "current";
        setCurrCharIndex(currCharIndex - 1);
      }
      return;
    }

    // suppose by mistake someone keep typing even if word ended, so instead of pressing space, person is pressing other alphabets, so it should be indicated.. so this logic is for that feature..
    if (currCharIndex === allCurrChars.length) {
      let newSpan = document.createElement("span");
      newSpan.innerText = e.key;
      newSpan.className = "incorrect extra current-right";
      allCurrChars[currCharIndex - 1].classList.remove("current-right");
      wordsSpanRef[currWordIndex].current.append(newSpan);
      setCurrCharIndex(currCharIndex + 1);
      setExtraChars(extraChars + 1); // counting mistakenly extra added chars
      return;
    }

    // logic to check correct and incorrect
    if (e.key === allCurrChars[currCharIndex].innerText) {
      allCurrChars[currCharIndex].className = "correct";
      setCorrectChars(correctChars + 1); // adding correct chars
    } else {
      // console.log("incorrect input");
      allCurrChars[currCharIndex].className = "incorrect";
      setIncorrectChars(incorrectChars + 1); // adding incorrect chars
    }

    // moving forward logic after each character..
    if (currCharIndex + 1 === allCurrChars.length) {
      // when we will be on the end of the word this class will be added..
      allCurrChars[currCharIndex].className += " current-right";
    } else {
      // apart from the end of the word this class will be added.
      allCurrChars[currCharIndex + 1].className = "current";
    }
    setCurrCharIndex(currCharIndex + 1);
  };

  // using useRef to make input always on focus.
  const focusInput = () => {
    inputRef.current.focus();
  };

  // function to calculate words per minute (WPM)
  const calculateWPM = () => {
    return Math.round(correctChars / 5 / (testTime / 60));
  };
  const calculateAcc = () => {
    return Math.round((correctWords / currWordIndex) * 100);
  };

  // updating testTime in countDown value
  useEffect(() => {
    resetTest();
  }, [testTime]);

  useEffect(() => {
    focusInput();
    wordsSpanRef[0].current.childNodes[0].className = "current";
  }, []);

  return (
    <div>
      <GlobalStyles />
      {testEnd ? (
        <Stats
          wpm={calculateWPM()}
          accuracy={calculateAcc()}
          correctChars={correctChars}
          incorrectChars={incorrectChars}
          missedChars={missedChars}
          extraChars={extraChars}
          graphData={graphData}
        />
      ) : (
        <div className="typing-area">
          <UpperMenu countDown={countDown} />
          <div className="type-box" onClick={focusInput}>
            <div className="words">
              {wordsArray.map((word, i) => (
                <span className="word" key={i} ref={wordsSpanRef[i]}>
                  {word.split("").map((char, i) => (
                    <span key={i} className="single-char">{char}</span>
                  ))}
                </span>
              ))}
            </div>
          </div>
          <input
            type="text"
            className="hidden-input"
            ref={inputRef}
            onKeyDown={handleUserInput}
          />
        </div>
      )}
    </div>
  );
};

export default TypingBox;
