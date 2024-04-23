import Handlebars from "handlebars";
import { v4 as uuidv4 } from "uuid";

import EventBus from "./event-bus.ts";

type TTarget = Record<string, unknown>;

class Block {
  static EVENTS = {
    INIT: "init",
    FLOW_CDM: "flow:component-did-mount",
    FLOW_CDU: "flow:component-did-update",
    FLOW_RENDER: "flow:render",
  };

  protected id = uuidv4();
  private _element: HTMLElement | null = null;
  private eventBus: () => EventBus;
  props;

  children: {
    [key: string]: Block | Element;
  };

  constructor(propsWithChildren = {}) {
    const eventBus = new EventBus();

    const { props, children } = this._getChildrenAndProps(propsWithChildren);

    // console.log(this._getChildrenAndProps(propsWithChildren));
    this.props = this._makePropsProxy({ ...props });
    this.children = children;

    this.eventBus = () => eventBus;

    this._registerEvents(eventBus);

    eventBus.emit(Block.EVENTS.INIT);
  }

  _addEvents() {
    const { events = {} } = this.props;

    Object.keys(events).forEach((eventName) => {
      this._element.addEventListener(eventName, events[eventName]);
    });
  }

  _registerEvents(eventBus: EventBus) {
    eventBus.on(Block.EVENTS.INIT, this._init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
  }

  private _init() {
    this.init();

    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  init() {}

  _componentDidMount() {
    this.componentDidMount();

    Object.values(this.children).forEach((child) => {
      child.dispatchComponentDidMount();
    });
  }

  componentDidMount() {}

  dispatchComponentDidMount() {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
  }

  _componentDidUpdate(oldProps, newProps) {
    const response = this.componentDidUpdate(oldProps, newProps);

    if (!response) {
      return;
    }
    this._render();
  }
  //TODO! add compare f(oldProps, newProps)
  componentDidUpdate() {
    return true;
  }

  _getChildrenAndProps(propsAndChildren) {
    const children = {};
    const props = {};

    Object.entries(propsAndChildren).forEach(([key, value]) => {
      if (value instanceof Block) {
        children[key] = value;
      } else {
        props[key] = value;
      }
    });

    return { children, props };
  }

  setProps = (nextProps) => {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
  };

  get element() {
    return this._element;
  }

  private _render() {
    const propsAndStubs = { ...this.props };

    // console.log(propsAndStubs);
    Object.entries(this.children).forEach(([key, child]) => {
      propsAndStubs[key] = `<div data-id="${child._id}"></div>`;
    });

    const fragment = this._createDocumentElement("template");

    fragment.innerHTML = Handlebars.compile(this.render())(propsAndStubs);
    const newElement = fragment.content.firstElementChild;

    Object.values(this.children).forEach((child) => {
      const stub = fragment.content.querySelector(`[data-id="${child._id}"]`);

      stub?.replaceWith(child.getContent());
    });

    if (this._element) {
      this._element.replaceWith(newElement);
    }

    this._element = newElement;

    this._addEvents();
  }

  render() {}

  getContent() {
    return this.element;
  }

  private _updateComponent(oldTarget, target) {
    this.eventBus().emit(Block.EVENTS.FLOW_CDU, oldTarget, target);
  }

  private _makePropsProxy(props: TTarget) {
    const updateComponentBind = this._updateComponent.bind(this);

    return new Proxy(props, {
      get(target, prop: string) {
        const value = target[prop];

        return typeof value === "function" ? value.bind(target) : value;
      },

      set(target, prop: string, value: TTarget[string]) {
        const oldTarget = { ...target };

        target[prop] = value;

        updateComponentBind(oldTarget, target);
        return true;
      },

      deleteProperty() {
        throw new Error("Нет доступа");
      },
    });
  }

  _createDocumentElement(tagName: string) {
    return document.createElement(tagName);
  }

  show(display = "block") {
    this.getContent()!.style.display = display;
  }

  hide() {
    this.getContent()!.style.display = "none";
  }
}

export default Block;