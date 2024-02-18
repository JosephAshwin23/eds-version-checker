import { mfeDataTestIdMap } from './utilities/mfeData';
import { edsLabel, waitForGlobal } from './utilities/utilities';

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

  document.addEventListener('onUrlChange', function (e: CustomEvent) {
    const data = e.detail;
    if (data.length > 1) {
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
      waitForGlobal({ key: 'mfeEdsVersion', sub: 'baseapp' }, () => {
        const mfeVersion = window.mfeEdsVersion['baseapp'];
        const label = BaseAppSidebarList.querySelector(
          '.eds-label-baseapp',
        ) as HTMLSpanElement;
        label.innerText = 'Base App EDS-' + mfeVersion;
      });
    } else {
      return;
    }

    const mfeName = window.location.href.split('.com/')[1].split('/')[0];

    if (mfeName) {
      const BaseAppSidebarObserver = new MutationObserver((observer) => {
        InjectEdsLabel(mfeName, observer);
      });

      BaseAppSidebarObserver.observe(BaseAppSidebar, {
        subtree: true,
        childList: true,
      });
    }
  }

  function InjectEdsLabel(mfeName: string, observer: MutationRecord[]) {
    for (const { addedNodes } of observer) {
      for (const node of Array.from(addedNodes)) {
        const linkParent = node as Node;
        const linkElement = linkParent?.firstChild as HTMLAnchorElement;
        if (linkElement?.classList?.contains('active')) {
          linkElement.appendChild(edsLabel(errorMessage));
          waitForGlobal({ key: 'mfeEdsVersion', sub: mfeName }, () => {
            const mfeVersion = window.mfeEdsVersion[mfeName];
            const label = (linkParent as Element).querySelector(
              '.eds-label',
            ) as HTMLSpanElement;
            label.innerText = 'EDS-' + mfeVersion;
            BaseAppSidebarObserver.disconnect();
          });
        }
      }
    }
  }

  function dispayEdsVersionOnTabChange(mfeName: string) {
    const mfeDataId = mfeDataTestIdMap[mfeName];
    if (mfeDataId) {
      const sideNavItem = document.querySelector(
        `li[data-testid='${mfeDataId}']`,
      );
      if (sideNavItem && !sideNavItem.querySelector('.eds-label')) {
        sideNavItem.firstChild.appendChild(edsLabel(errorMessage));
        waitForGlobal({ key: 'mfeEdsVersion', sub: mfeName }, () => {
          const mfeVersion = window.mfeEdsVersion[mfeName];
          const label = sideNavItem.querySelector(
            '.eds-label',
          ) as HTMLSpanElement;
          label.innerText = 'EDS-' + mfeVersion;
        });
      }
    }
  }

  function settingsSubMfe(mfeName: string) {
    const settingsApp = document.getElementById('settings-app');
    const settingsSidebar = settingsApp?.querySelector('.awd-sidebar__list');
    const mfeDataId = mfeDataTestIdMap[mfeName];
    if (mfeDataId && settingsSidebar) {
      const settingsSidebarItem = settingsSidebar.querySelector(
        `li[data-testid='${mfeDataId}']`,
      );
      if (!settingsSidebarItem.querySelector('.eds-label')) {
        settingsSidebarItem.firstChild.appendChild(edsLabel(errorMessage));
        waitForGlobal({ key: 'mfeEdsVersion', sub: mfeName }, () => {
          const mfeVersion = window.mfeEdsVersion[mfeName];
          const label = settingsSidebarItem.querySelector(
            '.eds-label',
          ) as HTMLSpanElement;
          label.innerText = 'EDS-' + mfeVersion;
        });
      }
    }
  }
})();
