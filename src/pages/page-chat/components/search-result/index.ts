import Block, { BlockProps } from "src/core/block";
import connect from "src/core/connect";
import { RESOURCES } from "src/core/const";
import store from "src/core/store";
import isEqual from "src/helpers/is-equal";
import isValidDate from "src/helpers/is-valid-date";
import controller from "src/pages/page-chat/controller";

import css from "./style.module.css";

type TLastMessage = Record<string, unknown>;
class SearchResult extends Block {
  constructor() {
    super({
      events: {
        click: async (e) => {
          if (e.target) {
            const chatId = Number((e.target as HTMLElement).closest("li")?.getAttribute("data-id"));

            store.set("chatId", chatId);
            await controller.changeChat();
            await controller.getChatUsers(chatId);
          }
        },
      },
    });
  }

  public componentDidUpdate(oldProps: BlockProps, newProps: BlockProps): boolean {
    if (isEqual(oldProps, newProps)) {
      return false;
    }

    if (Array.isArray(this.props.foundChats)) {
      const chatsClone = structuredClone(this.props.foundChats);

      const foundChats = chatsClone.map((el: TLastMessage) => {
        const last_message = el.last_message as TLastMessage;

        if (
          last_message &&
          typeof last_message.time === "string" &&
          isValidDate(last_message.time)
        ) {
          last_message.time = new Date(last_message.time).toLocaleDateString();
        }
        return el;
      });

      this.setProps({ foundChats });
    }
    return true;
  }

  render(): string {
    return `
      <ul>
        {{#each foundChats}}
          <li data-id="{{ id }}">
            <div class="${css.dialog}">
              <div class="${css.border}"></div>
              <div class="${css.avatar}">
                {{#if avatar}}
                  <img src="${RESOURCES}{{avatar}}" />
                {{/if}}
              </div>
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

export default connect(({ foundChats, chatId }) => ({ foundChats, chatId }))(SearchResult);
