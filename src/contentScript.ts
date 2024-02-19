import { mfeDataTestIdMap } from './utilities/mfeData';
import {
  AddMfeVersionOnLabel,
  edsLabel,
  getMfeName,
} from './utilities/utilities';

declare global {
  interface Window {
    mfeEdsVersion: Record<string, string>;
  }
}

(() => {
  const errorMessage = 'Not available';

  window.addEventListener('load', () => {
    displayEdsVersionOnLoad();
  });

  //Gets triggered whenever there is a change in the url
  document.addEventListener('onUrlChange', function (e: CustomEvent) {
    const data = e.detail;
    if (data.length > 1) {
      // handles mfe under settings page
      settingsSubMfe(data[1]);
      return;
    }
    dispayEdsVersionOnTabChange(data[0]);
  });

  function displayEdsVersionOnLoad() {
    const BaseAppSidebar = document.getElementById('cn-main-nav');
    const BaseAppSidebarList = BaseAppSidebar?.querySelector(
      '& > ul',
    ) as HTMLUListElement;

    if (BaseAppSidebarList) {
      BaseAppSidebarList.appendChild(
        edsLabel(`Base App - ${errorMessage}`, true),
      );
      AddMfeVersionOnLabel('baseapp', BaseAppSidebarList, true);
    } else {
      return;
    }

    let mfeName = window.location.href.split('.com/')[1].split('/')[0];

    mfeName = getMfeName(mfeName);

    if (mfeName) {
      const BaseAppSidebarObserver = new MutationObserver((observer) => {
        InjectEdsLabel(mfeName, BaseAppSidebarObserver, observer);
      });

      BaseAppSidebarObserver.observe(BaseAppSidebar, {
        subtree: true,
        childList: true,
      });
    }
  }

  function InjectEdsLabel(
    mfeName: string,
    observingElement: MutationObserver,
    observer: MutationRecord[],
  ) {
    for (const { addedNodes } of observer) {
      for (const node of Array.from(addedNodes)) {
        const linkParent = node as Node;
        const linkElement = linkParent?.firstChild as HTMLAnchorElement;
        if (linkElement?.classList?.contains('active')) {
          linkElement.appendChild(edsLabel(errorMessage));
          AddMfeVersionOnLabel(mfeName, linkElement);
          observingElement.disconnect();
        }
      }
    }
  }

  function dispayEdsVersionOnTabChange(mfeName: string) {
    const mfeDataId = mfeDataTestIdMap[mfeName];
    mfeName = getMfeName(mfeName);
    if (mfeDataId) {
      const sideNavItem = document.querySelector(
        `li[data-testid='${mfeDataId}']`,
      );
      if (sideNavItem && !sideNavItem.querySelector('.eds-label')) {
        sideNavItem.firstChild.appendChild(edsLabel(errorMessage));
        AddMfeVersionOnLabel(mfeName, sideNavItem);
      }
    }
  }

  function settingsSubMfe(mfeName: string) {
    const settingsApp = document.getElementById('settings-app');
    const settingsSidebar = settingsApp?.querySelector('.awd-sidebar__list');
    const mfeDataId = mfeDataTestIdMap[mfeName];
    mfeName = getMfeName(mfeName);
    if (mfeDataId && settingsSidebar) {
      const settingsSidebarItem = settingsSidebar.querySelector(
        `li[data-testid='${mfeDataId}']`,
      );
      if (!settingsSidebarItem.querySelector('.eds-label')) {
        settingsSidebarItem.firstChild.appendChild(edsLabel(errorMessage));
        AddMfeVersionOnLabel(mfeName, settingsSidebarItem);
      }
    }
  }
})();
