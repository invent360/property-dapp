import React, {AwaitedReactNode, JSXElementConstructor, ReactElement, ReactNode, ReactPortal} from "react";
import {Badge} from "primereact/badge";


interface MenuItemProps {
    icon?: string;
    label: React.ReactNode;
    badge?: React.ReactNode;
    shortcut?: React.ReactNode;
}

const MenuItem: React.FC<MenuItemProps> = ({ icon, label, badge, shortcut }) => (
    <a className="flex align-items-center p-menuitem-link">
        {icon && <span className={icon} />}
        <span className="mx-2">{label}</span>
        {badge && <Badge className="ml-auto" value={badge} />}
        {shortcut && <span className="ml-auto border-1 surface-border border-round surface-100 text-xs p-1">{shortcut}</span>}
    </a>
);

export default MenuItem;
