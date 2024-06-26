import Block from "src/core/block";
import store from "src/core/store";
import MenuButton from "src/pages/page-chat/components/menu-button";
import controller from "src/pages/page-chat/controller";

import css from "./style.module.css";

type TProps = {
  onAdd: () => void;
  onRemove: () => void;
  onChangeAvatar: () => void;
};

export default class HeaderMenu extends Block {
  constructor(props: TProps) {
    super({
      ...props,
      Add: new MenuButton({ events: { click: props.onAdd }, title: "Добавить пользователя" }),
      Remove: new MenuButton({ events: { click: props.onRemove }, title: "Удалить пользователя" }),
      ChangeAvatar: new MenuButton({
        events: { click: props.onChangeAvatar },
        title: "Изменить аватар чата",
      }),
      RemoveChat: new MenuButton({
        events: {
          click: async () => {
            const chatId = store.getState().chatId as number;

            await controller.deleteChat(chatId);
          },
        },
        title: "Удалить чат",
      }),
    });
  }

  render(): string {
    return `
      <ul class="${css.container} {{#if show}}${css.show}{{/if}}">
        <li class="${css.item}">
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <line
              x1="5.99988"
              y1="0.5"
              x2="5.99988"
              y2="11.5"
              stroke="rgb(var(--primary-color))"
              stroke-width="1.5"
            />
            <line
              x1="0.499878"
              y1="6"
              x2="11.4999"
              y2="6"
              stroke="rgb(var(--primary-color))"
              stroke-width="1.5"
            />
          </svg>
          {{{ Add }}}
        </li>
        <li class="${css.item}">
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <line
              x1="5.99988"
              y1="0.5"
              x2="5.99988"
              y2="11.5"
              stroke="rgb(var(--primary-color))"
              stroke-width="1.5"
            />
            <line
              x1="0.499878"
              y1="6"
              x2="11.4999"
              y2="6"
              stroke="rgb(var(--primary-color))"
              stroke-width="1.5"
            />
          </svg>
          {{{ Remove }}}
        </li>
        <li class="${css.item}">
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <line
              x1="5.99988"
              y1="0.5"
              x2="5.99988"
              y2="11.5"
              stroke="rgb(var(--primary-color))"
              stroke-width="1.5"
            />
            <line
              x1="0.499878"
              y1="6"
              x2="11.4999"
              y2="6"
              stroke="rgb(var(--primary-color))"
              stroke-width="1.5"
            />
          </svg>
          {{{ ChangeAvatar }}}
        </li>
        <li class="${css.item}">
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <line
            x1="5.99988"
            y1="0.5"
            x2="5.99988"
            y2="11.5"
            stroke="rgb(var(--primary-color))"
            stroke-width="1.5"
          />
          <line
            x1="0.499878"
            y1="6"
            x2="11.4999"
            y2="6"
            stroke="rgb(var(--primary-color))"
            stroke-width="1.5"
          />
        </svg>
        {{{ RemoveChat }}}
      </li>
      </ul>
    `;
  }
}
