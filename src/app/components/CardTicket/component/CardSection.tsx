import { calculateFlightTimes } from "@/utils/helpers/calculateFlightTimes";
import cls from "../styles.module.scss";
import { timeFormate } from "@/utils/helpers/timeFormate";
import { declOfNum } from "@/utils/helpers/declOfNum";
import { ISegments } from "@/store/reducers/ticketsReducer";


export const CardSection = ({ date, duration, stops, destination, origin }: ISegments) => {
  const { departure, arrival } =
    calculateFlightTimes(date, duration);

  const stopCount =
    stops.length > 0 ? `${stops.length} ` : "Без пересадок";
    
  return (
    <>
      <div className={cls.card__info_item}>
        <span
          className={cls.card__info_title}
        >{`${origin} - ${destination}`}</span>
        <span
          className={cls.card__info_desc}
        >{`${departure} - ${arrival}`}</span>
      </div>
      <div className={cls.card__info_item}>
        <span className={cls.card__info_title}>В пути</span>
        <span className={cls.card__info_desc}>
          {timeFormate(duration)}
        </span>
      </div>
      <div className={cls.card__info_item}>
        <span className={cls.card__info_title}>{`${stopCount}${declOfNum(
          stops.length
        )}`}</span>
        <div className={cls.card__info_desc}>
          {stops.map((elem, index) => (
            <span key={index}>{`${elem}${
              index !== stops.length - 1 ? ", " : ""
            }`}</span>
          ))}
        </div>
      </div>
    </>
  );
};
