import {
  FC,
  useContext,
  useEffect,
  useState,
  Dispatch,
  SetStateAction,
} from "react";
import { PresetContext } from "@/app/page";
import styles from "./Timer2.module.scss";

type Timer2Props = {
  presetId: string;
  isStarted: boolean;
  finished: boolean;
  setFinished: Dispatch<SetStateAction<boolean>>;
  currentTimer: number;
  setCurrentTimer: Dispatch<SetStateAction<number>>;
  handleStop: () => void;
};

const Timer2: FC<Timer2Props> = ({
  presetId,
  isStarted,
  finished,
  setFinished,
  currentTimer,
  setCurrentTimer,
  handleStop,
}) => {
  const { presetState, presetDispatch } = useContext(PresetContext);
  const [timer1, setTimer1] = useState(
    presetState.data.find((item) => item.id === presetId).time1 * 60
  );
  const [timer2, setTimer2] = useState(
    presetState.data.find((item) => item.id === presetId).time2 * 60
  );
  const [timer3, setTimer3] = useState(
    presetState.data.find((item) => item.id === presetId).time3 * 60
  );

  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (!isPaused && isStarted) {
      interval = setInterval(() => {
        if (currentTimer === 1) {
          if (timer1 > 0) {
            setTimer1((prevTime) => prevTime - 1);
          } else {
            setCurrentTimer(2);
          }
        } else if (currentTimer === 2) {
          if (timer2 > 0) {
            setTimer2((prevTime) => prevTime - 1);
          } else {
            setCurrentTimer(3);
          }
        } else if (currentTimer === 3) {
          if (timer3 > 0) {
            setTimer3((prevTime) => prevTime - 1);
          } else {
            setCurrentTimer(0);
            setFinished(true);
          }
        }
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [currentTimer, timer1, timer2, timer3, isPaused, isStarted]);

  useEffect(() => {
    if (!isStarted) {
      handleStop;
    }
  }, [isStarted, handleStop]);

  const handlePause = () => {
    setIsPaused((prevState) => !prevState);
  };

  return (
    <div>
      {currentTimer === 1 && (
        <div className={styles.time_display_label}>
          {" "}
          Prep: <span className={styles.time_display}>{timer1}</span>
        </div>
      )}
      {currentTimer === 2 && (
        <div className={styles.time_display_label}>
          Meditate: <span className={styles.time_display}>{timer2}</span>
        </div>
      )}
      {currentTimer === 3 && (
        <div className={styles.time_display_label}>
          Rest: <span className={styles.time_display}>{timer3}</span>
        </div>
      )}
      {currentTimer === 0 && finished && (
        <div className={styles.time_display_label}>Finished</div>
      )}
      <button className={styles.block_link} onClick={handlePause}>
        {isPaused ? "Resume" : "Pause"}
      </button>
    </div>
  );
};
export default Timer2;
