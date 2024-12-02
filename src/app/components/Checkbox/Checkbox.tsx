import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import clsx from "clsx";
import cls from "./style.module.scss";
import { CheckIcon } from "@/assets/icons/CheckIcon";

interface ICheckbox
  extends React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> {
  classNameWrapper?: string;
  label?: string;
}

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  ICheckbox
>(({ className, classNameWrapper, onChange, label, id, ...props }, ref) => (
  <div className={clsx(cls.checkbox, classNameWrapper)}>
    <CheckboxPrimitive.Root
      ref={ref}
      className={clsx(
        cls.checkbox__border,
        props.checked && cls.checkbox__border_checked,
        className
      )}
      onChange={onChange}
      {...props}
    >
      <CheckboxPrimitive.Indicator className={cls.checkbox__iconWrapper}>
        <CheckIcon className={cls.checkbox__icon} />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
    <label htmlFor={id}>{label}</label>
  </div>
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };
