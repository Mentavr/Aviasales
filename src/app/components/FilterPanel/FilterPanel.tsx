import { useDispatch, useSelector } from "react-redux";
import { selectorGetOptions, setOptions } from "@/store/reducers/filterReducer";
import { Checkbox } from "../Checkbox/Checkbox";
import cls from "./style.module.scss";

export const FilterPanel = () => {
  const dispatch = useDispatch();
  const options = useSelector(selectorGetOptions);

  const handleChange = (id: string) => {
    dispatch(setOptions(id));
  };

  return (
    <form className={cls.filter}>
      <div className={cls.filter__wrapper}>
        <span className={cls.filter__text}>Количество пересадок</span>
        {Object.entries(options).map(([key, { label, checked }]) => (
          <Checkbox
            classNameWrapper={cls.filter__checkbox}
            key={key}
            label={label}
            checked={checked}
            onClick={() => handleChange(key)}
          />
        ))}
      </div>
    </form>
  );
};
