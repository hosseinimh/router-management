import { dashboardPage as strings } from "../../../constants/strings/fa";
import { Dashboard as Entity } from "../../../http/entities";
import {
  setLoadingAction,
  setNotificationsAction,
} from "../../../state/layout/layoutActions";
import { setPagePropsAction } from "../../../state/page/pageActions";
import { BasePageUtils } from "../../../utils/BasePageUtils";

export class PageUtils extends BasePageUtils {
  constructor(state) {
    super("Dashboard", strings, null, state);
    this.entity = new Entity();
    this.initialPageProps = {
      totalShares: 0,
    };
  }

  onLoad() {
    super.onLoad();
    this.dispatch(setPagePropsAction(this.initialPageProps));
    // this.fillForm();
  }

  async fillForm(data = null) {
    this.dispatch(setLoadingAction(true));
    await this.fetchData(data);
    this.dispatch(setLoadingAction(false));
  }

  async fetchData() {
    try {
      let result = await this.entity.getReview();
      this.handleFetchResult(
        result,
        this.propsIfOK(result),
        this.propsIfNull()
      );
    } catch {}
  }

  propsIfOK(result) {
    this.dispatch(
      setNotificationsAction({
        systemNotifications: result.systemNotifications,
        userNotifications: result.userNotifications,
      })
    );
    return {
      totalShares: result?.totalShares ?? 0,
    };
  }
}
