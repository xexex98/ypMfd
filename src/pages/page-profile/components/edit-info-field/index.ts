import ProfileEditInput from "src/pages/page-profile/components/edit-info-input";
import ErrorLine from "src/partials/r-input/error-line";
import Block from "src/reactivity/block";

import css from "./style.module.css";

type Props = {
  label: string;
  name: string;
};

export default class ProfileEditInfoField extends Block {
  constructor(props: Props) {
    super({
      ...props,
      Input: new ProfileEditInput({
        ...props,
        events: {
          blur: props.onBlur,
        },
      }),
      ErrorLine: new ErrorLine({
        errorText: props.errorText,
      }),
    });
  }

  componentDidUpdate(oldProps: any, newProps: any): boolean {
    if (oldProps === newProps) {
      return false;
    }

    this.children.ErrorLine.setProps(newProps);

    return true;
  }

  render() {
    return `
      <div class="${css.field} {{#if error}}input-error{{/if}}">
        <label for={{name}} class="${css.label}" >
          {{ label }}
          {{{ Input }}}
        </label>
        {{{ ErrorLine }}}
      </div>
    `;
  }
}