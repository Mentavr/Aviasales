import { useStateContext } from "@/utils/hooks/useStateContext";
import { CardTicket } from "../CardTicket/CardTicket";
import cls from "./styles.module.scss";

export const CardsTickets = () => {
  const { getFilterTickets } = useStateContext();
  const tickets = getFilterTickets();

  return (
    <div className={cls.cards}>
      {tickets.map(({ price, carrier, segments }, index) => {
        return (
          <CardTicket
            key={index}
            price={price}
            carrier={carrier}
            segments={segments}
          />
        );
      })}
    </div>
  );
};
