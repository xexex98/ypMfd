import auth from "src/api/auth";
import profile, { TUpdateProfile, TUpdateProfilePassword } from "src/api/profile";
import store from "src/core/store";

class ProfileController {
  public async logout() {
    try {
      await auth.logout();
    } catch (error) {
      console.error(error);
    }
  }
  public async user() {
    try {
      store.set("load", true);
      const res = (await auth.user()) as XMLHttpRequest;

      store.set("user", JSON.parse(res.response));
    } catch (error) {
      store.set("isUserError", true);
      console.error(error);
    } finally {
      store.set("load", false);
    }
  }
  public async updateProfile(data: TUpdateProfile) {
    try {
      store.set("loading", true);
      await profile.updateProfile(data);
      store.set("isProfileEditError", false);
    } catch (error) {
      store.set("isProfileEditError", true);
      console.error(error);
    } finally {
      store.set("loading", false);
    }
  }
  public async updateProfilePassword(data: TUpdateProfilePassword) {
    try {
      store.set("loading", true);

      await profile.updateProfilePassword(data);

      store.set("isPasswordEditError", false);
    } catch (error) {
      store.set("isPasswordEditError", true);
      console.error(error);
    } finally {
      store.set("loading", false);
    }
  }
}

export default new ProfileController();
