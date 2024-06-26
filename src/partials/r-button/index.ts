import Block from "../../core/block";

import styles from "./style.module.css";

type TProps = {
  text: string;
  type?: string;
  events?: Record<string, EventListener>;
  disabled?: boolean;
};

export default class RButton extends Block {
  constructor(props: TProps) {
    super(props);
  }

  render() {
    return `
      <button
        class="${styles.btn} ${styles["btn-default"]}"
        type="{{ type }}"
        {{#if disabled}}disabled{{/if}}
      >
        {{ text }}
      </button>
  `;
  }
}
