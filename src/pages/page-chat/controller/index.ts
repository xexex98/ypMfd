import auth from "src/api/auth";
import chats from "src/api/chats";
import router from "src/core/router";
import store from "src/core/store";

class ChatController {
  public async user() {
    try {
      await auth.user();
    } catch (error) {
      router.go("/");
      console.error("Error in: class ChatController -> user");
    }
  }
  public async getChats() {
    try {
      const res = (await chats.getChats()) as XMLHttpRequest;

      // await chats.deleteChat({
      //   chatId: 6787,
      // });

      store.set("chats", JSON.parse(res.response));
    } catch (error) {
      console.error(error);
    }
  }

  public async createChat(title: string) {
    try {
      await chats.createChat({ title });
    } catch (error) {
      console.error(error);
    }
  }
}

export default new ChatController();