import { mfeNameMap } from "./mfeData";

declare global {
  interface Window {
    [key: string]: Record<string, string>;
  }
}

export function waitForGlobal(
  { key, sub }: { key: string; sub?: string },
  callback: () => void,
) {
  if ((window)[key]) {
    if (sub) {
      if ((window)[key][sub]) {
        callback();
      } else {
        setTimeout(() => {
          waitForGlobal({ key, sub }, callback);
        }, 100);
      }
    } else {
      callback();
    }
  } else {
    setTimeout(() => {
      waitForGlobal({ key, sub }, callback);
    }, 100);
  }
}

export function getMfeName(name: string) {
   const mfeName = mfeNameMap[name];
   return mfeName ? mfeName : name;
}
 
export function edsLabel(edsVersion: string, isBaseApp = false) {
    const label = document.createElement("small");
    label.innerText = edsVersion;
    label.style.whiteSpace = "nowrap";
    label.style.background = "#1a1f23";
    label.style.fontSize = "10px";
    label.style.padding = "4px 5px";
    label.style.borderRadius = "6px";
    label.style.color = "white";
    label.style.order = '20';
  
    if (!isBaseApp) {
      label.style.position = "absolute";
      label.style.right = "6px";
      label.classList.add("eds-label");
    } else {
      label.style.marginTop = "40px";
      label.classList.add("eds-label-baseapp");
    }
    return label;
} 

export function AddMfeVersionOnLabel(mfeName: string, htmlElement: Element, isBaseApp = false) {
  waitForGlobal({ key: 'mfeEdsVersion', sub: mfeName }, () => {
    const mfeVersion = window.mfeEdsVersion[mfeName];
    const label = htmlElement.querySelector(  
      isBaseApp ? '.eds-label-baseapp' : '.eds-label'
    ) as HTMLSpanElement;
    label.innerText = isBaseApp ? 'Base App EDS-' + mfeVersion : 'EDS-' + mfeVersion;
  });
}
