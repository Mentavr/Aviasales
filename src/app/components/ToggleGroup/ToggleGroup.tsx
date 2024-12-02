import * as ToggleGroupRadix from "@radix-ui/react-toggle-group";
import cls from "./styles.module.scss";
import {
  setToggleFilter,
  toggleFilterSelector,
} from "@/store/reducers/filterReducer";
import { useAppSelector } from "@/utils/hooks/useAppSelector";
import { useAppDispatch } from "@/utils/hooks/useAppDispatch";

const ToggleGroup = () => {
  const handlerChangeToggle = (value: "cheap" | "fast" | "optimal") => {
    if (value) dispatch(setToggleFilter(value));
  };
  const currentToggle = useAppSelector(toggleFilterSelector);

  const dispatch = useAppDispatch();
  return (
    <ToggleGroupRadix.Root
      className={cls.group}
      type="single"
      value={currentToggle}
      aria-label="Text alignment"
      onValueChange={handlerChangeToggle}
    >
      <ToggleGroupRadix.Item className={cls.item} value="cheap">
        <span className={cls.item__text}>Самый дешевый</span>
      </ToggleGroupRadix.Item>
      <ToggleGroupRadix.Item className={cls.item} value="fast">
        <span className={cls.item__text}>Самый быстрый</span>
      </ToggleGroupRadix.Item>
      <ToggleGroupRadix.Item className={cls.item} value="optimal">
        <span className={cls.item__text}>Оптимальный</span>
      </ToggleGroupRadix.Item>
    </ToggleGroupRadix.Root>
  );
};

export default ToggleGroup;
