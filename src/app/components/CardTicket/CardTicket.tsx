import { ITickets } from "@/store/reducers/ticketsReducer";
import cls from "./styles.module.scss";
import { numberWithSpace } from "@/utils/helpers/numberWithSpace";
import { CardSection } from "./component/CardSection";

export const CardTicket = ({ price, carrier, segments }: ITickets) => {
  return (
    <div className={cls.card}>
      <div className={cls.card__head}>
        <div className={cls.card__head_price_wrapper}>
          <span className={cls.card__head_price}>{`${numberWithSpace(
            price
          )} Р`}</span>
        </div>
        <div className={cls.card__head_logo_wrapper}>
          <img
            className={cls.card__head_logo}
            src={`https://pics.avs.io/99/36/${carrier}.png`}
            alt="logo company"
          />
        </div>
      </div>
      <div className={cls.card__wrapper}>
        {segments.map(
          ({ origin, destination, date, stops, duration }, index) => {
            return (
              <CardSection
                key={index}
                date={date}
                duration={duration}
                stops={stops}
                destination={destination}
                origin={origin}
              />
            );
          }
        )}
      </div>
    </div>
  );
};
