import {
  ChatMessage,
  Dialog,
  HeaderInfo,
  HeaderMenu,
  NewMessage,
  Search,
  SearchResult,
} from "src/pages/page-chat/components";
import Kebab from "src/pages/page-chat/components/kebab";
import Block from "src/reactivity/block";

import css from "./style.module.css";

export default class PageMessenger extends Block {
  constructor(props) {
    super({
      ...props,
      // Modal: new UserModal({ title: "Добавить" }),
      Search: new Search({
        result: "Андрей",
      }),

      Dialog: new Dialog({
        name: "Андрей",
        msg: "Друзья, у меня для вас особенный выпуск новостей!...",
        unread: "12",
        date: "14:12",
      }),

      Dialog2: new Dialog({
        name: "Андрей",
        msg: "Друзья, у меня для вас особенный выпуск новостей!...",
        unread: "12",
        date: "14:12",
      }),

      Dialog3: new Dialog({
        name: "Андрей",
        msg: "Друзья, у меня для вас особенный выпуск новостей!...",
        unread: "12",
        date: "14:12",
      }),

      Result: new SearchResult({
        result: "Андрей",
      }),

      Header: new HeaderInfo({
        name: "Андрей",
      }),

      HeaderKebab: new Kebab(),

      Menu: new HeaderMenu({
        name: "Андрей",
      }),
      Message1: new ChatMessage({
        content: "Привет! Смотри, тут всплыл интересный кусок лунной космической истории!!",
        type: "is-in",
      }),
      Message2: new ChatMessage({
        content: "Привет!",
        type: "is-out",
      }),
      NewMessageInput: new NewMessage(),
    });
  }

  render(): string {
    return `
      <main class="${css.messenger}">
        {{{ Modal }}}
        <ul class="${css.dialogs}">
          {{{ Search }}}
          {{{ Dialog }}}
          {{{ Dialog2 }}}
          {{{ Dialog3 }}}
          {{{ Result }}}
        </ul>
        <div class="${css.chat}">
          <div class="${css.header}">
            {{{ Header }}}
            {{{ HeaderKebab }}}
            {{{ Menu }}}
          </div>
          <div class="messenger-chat-messages">
            <div class="messenger-chat-messages-date">19 июня</div>
            {{{ Message1 }}}
            <div class="msg is-img">
              <img
                src="/src/assets/img/photo.png"
                alt="message-image"
              />
            </div>
            {{{ Message2 }}}
          </div>
          {{{ NewMessageInput }}}
        </div>
      </main>
    `;
  }
}
