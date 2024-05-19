import Block, { BlockProps } from "src/core/block";
import connect from "src/core/connect";
import store from "src/core/store";
import cloneDeep from "src/helpers/clone-deep";
import isEqual from "src/helpers/is-equal";
import isValidDate from "src/helpers/is-valid-date";
import controller from "src/pages/page-chat/controller";

import css from "./style.module.css";

class DialogsList extends Block {
  constructor() {
    super({
      events: {
        click: async (e) => {
          if (e.target) {
            const chatId = Number((e.target as HTMLElement).closest("li")?.getAttribute("data-id"));

            store.set("chatId", chatId);
            controller.changeChat();
            controller.getChatUsers(chatId);
          }
        },
      },
    });
  }

  public componentDidUpdate(oldProps: BlockProps, newProps: BlockProps): boolean {
    if (isEqual(oldProps, newProps)) {
      return false;
    }

    if (Array.isArray(this.props.chats)) {
      const chatsClone = cloneDeep([this.props.chats])[0];

      const chats = chatsClone.map((el) => {
        if (
          el.last_message &&
          typeof el.last_message.time === "string" &&
          isValidDate(el.last_message.time)
        ) {
          el.last_message.time = new Date(el.last_message.time).toLocaleDateString();
        }
        return el;
      });

      this.setProps({ chats });
    }
    return true;
  }

  public render(): string {
    return `
      <ul class="${css.dialogs}">
        {{#each chats}}
          <li data-id="{{ id }}">
            <div class="${css.dialog}">
              <div class="${css.border}"></div>

              <div class="${css.content}">
                <p class="${css.user}">{{ title }}</p>
                {{#if last_message.content}}
                  <p class="${css.message}">{{ last_message.content }}</p>
                {{else}}
                  <p class="${css.message}">Пора написать первое сообщение!</p>
                {{/if}}
              </div>
              <div class="${css.info}">
                <p class="${css.time}">{{ last_message.time }}</p>
                {{#if unread_count}}
                  <p class="${css.unread}">{{ unread_count }}</p>
                {{/if}}
              </div>
            </div>
          </li>
        {{/each}}
      </ul>
    `;
  }
}
// <div class="${css.avatar}"></div>

export default connect(({ chats, chatId }) => ({ chats, chatId }))(DialogsList);
