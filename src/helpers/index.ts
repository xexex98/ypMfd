import Block from "src/core/block";
import { ProfileEditInfoField } from "src/pages/page-profile/components";
import { RInput } from "src/partials";

//TODO! Поправить сообщения об ошибке, на более узкие

const regexp = {
  email: /^[a-zA-Z0-9_.+-]+@[A-Za-z0-9]+([_.-][A-Za-z0-9]+)*\.[A-Za-z]{2,}$/,
  login: /^[A-Za-z][A-Za-z0-9_-]{2,19}$/,
  first_name: /^[A-ZЁА-Я][a-zA-ZЁA-Яёа-я-]+$/,
  second_name: /^[A-ZЁА-Я][a-zA-ZЁA-Яёа-я-]+$/,
  display_name: /^[A-ZЁА-Я][a-zA-ZЁA-Яёа-я-]+$/,
  phone: /^(\+)?\d{10,15}$/,
  password: /^(?=.*[A-Z])(?=.*[0-9])[A-Za-z0-9]{8,40}$/,
  oldPassword: /^(?=.*[A-Z])(?=.*[0-9])[A-Za-z0-9]{8,40}$/,
  newPassword: /^(?=.*[A-Z])(?=.*[0-9])[A-Za-z0-9]{8,40}$/,
  repeatNewPassword: /^(?=.*[A-Z])(?=.*[0-9])[A-Za-z0-9]{8,40}$/,
  password_check: /^(?=.*[A-Z])(?=.*[0-9])[A-Za-z0-9]{8,40}$/,
} as const;

type TRegexp = keyof typeof regexp;

export function validate(value: string, el: Block) {
  const name = el.props.name as TRegexp;

  if ((el && !regexp[name].test(value)) || !String(value)) {
    el.setProps({
      error: true,
      errorText: `Некорректно заполнено: ${el.props.label}`,
    });

    return false;
  }

  el.setProps({ error: false, errorText: null, value });
  return true;
}

export function validateForm(elements: Record<string, Block>) {
  const fields = Object.keys(elements).filter(
    (el) => elements[el] instanceof RInput || elements[el] instanceof ProfileEditInfoField
  );

  const isError = fields.some((el) => {
    // console.log(elements[el].props.error, elements[el].props.value);
    return !elements[el].props.value || elements[el].props.error;
  });

  return !isError;
}
