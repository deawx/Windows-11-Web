import styles from "./DesktopItem.module.css";
import { Item } from "../../../Configs/DesktopItems.config";
import { useRef, useState } from "preact/hooks";
import useClickOutside from "../../../hooks/useClickOutside";
import { useStore } from "nanostores/preact";
import { OpenApps } from "../../../store/activeWindow";
// import { FileContextMenu } from "../../../Configs/ContextMenus/file.config";
// import { ContextMenu } from "../../ContextMenu";

export const DesktopItem = (props: Item) => {
  const [isActive, setIsActive] = useState(false);
  const ItemRef = useRef<HTMLDivElement>();
  const OpenedApps = useStore(OpenApps);

  useClickOutside(ItemRef, () => setIsActive(false));

  const onDBClickAction =
    props.action ||
    (() => {
      OpenApps.set({
        ...OpenedApps,
        [props.appId!]: {
          ...(OpenedApps[props.appId!] || {}),
          isActive: true,
        },
      });
      setIsActive(false);
    });
  return (
    <>
      {/* <ContextMenu items={FileContextMenu} containerRef={ItemRef} /> */}
      <div
        ref={ItemRef}
        id={props.context_menu_id}
        onClick={() => setIsActive(true)}
        onDblClick={onDBClickAction}
        class={[styles.desktop_item, isActive && styles.active].join(" ")}
      >
        <div id={props.context_menu_id} className={styles.desktop_item_icon}>
          <img id={props.context_menu_id} src={props.icon} alt={props.name} />
        </div>
        <div id={props.context_menu_id} class={styles.desktop_item_name}>
          {props.name}
        </div>
      </div>
    </>
  );
};