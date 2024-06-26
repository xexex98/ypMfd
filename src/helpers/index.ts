import Block from "src/core/block";
import trim from "src/helpers/trim";
import { ProfileEditInfoField } from "src/pages/page-profile/components";
import { RInput } from "src/partials";

const regexp = {
  email: /^[a-zA-Z0-9_.+-]+@[A-Za-z0-9]+([_.-][A-Za-z0-9]+)*\.[A-Za-z]{2,}$/,
  login: /^[a-zA-Z][a-zA-Z0-9-_]{2,19}$/,
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

  if (!value || (el && !regexp[name].test(value))) {
    el.children.ErrorLine.setProps({
      error: true,
      errorText: `Некорректно заполнено: ${el.props.label as string}`,
    });

    return false;
  }

  el.children.ErrorLine.setProps({ error: false, errorText: null });
  el.setProps({ value });
  return true;
}

export function validateForm(elements: Record<string, Block>) {
  const fields = Object.keys(elements).filter(
    (el) => elements[el] instanceof RInput || elements[el] instanceof ProfileEditInfoField
  );

  fields.forEach((el) => validate(elements[el].props.value as string, elements[el]));

  const isError = fields.some((el) => {
    return !elements[el].props.value;
  });

  return !isError;
}

export function isEqualPassword(lh: string, rh: string) {
  if (!lh || !rh) {
    return false;
  }
  if (trim(lh) !== trim(rh)) {
    return false;
  }
  return true;
}
