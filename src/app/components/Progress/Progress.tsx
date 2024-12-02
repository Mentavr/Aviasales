import { useEffect, useState } from "react";
import * as ProgressRadix from "@radix-ui/react-progress";
import cls from "./styles.module.scss";

interface IProgress {
  isLoading: boolean;
  length?: number;
}

const Progress = ({ isLoading, length }: IProgress) => {
  const [progress, setProgress] = useState(0);
  const [isProgress, setIsProgress] = useState<boolean>(true);

  useEffect(() => {
    if (!isLoading) {
      setProgress(100);
      setTimeout(() => {
        setIsProgress(false);
      }, 1000);
    }
  }, [isLoading]);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        const increment = length ? length / length : 3.3;
        const nextProgress = Math.min(prev + increment * 1.5, 100);
        return nextProgress;
      });
    }, 500);

    if (progress >= 94 && isLoading) {
      setProgress(95);
      return () => clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [length, progress, isLoading]);

  return (
    isProgress && (
      <div className={cls.progress}>
        <ProgressRadix.Root className={cls.wrapper} value={progress}>
          <ProgressRadix.Indicator
            className={cls.indicator}
            style={{ transform: `translateX(-${100 - progress}%)` }}
          />
        </ProgressRadix.Root>
      </div>
    )
  );
};

export default Progress;
