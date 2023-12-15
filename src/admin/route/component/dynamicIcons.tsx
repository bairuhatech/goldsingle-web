import React from "react";
import { IconBaseProps, IconType } from "react-icons";
import { CgUnavailable } from "react-icons/cg";
import { SlHome } from "react-icons/sl";

import { PiShoppingCartSimple } from "react-icons/pi";
import { CgProfile } from "react-icons/cg";
import { FiUsers } from "react-icons/fi";
import { LuLayoutDashboard } from "react-icons/lu";
import { FaWpforms } from "react-icons/fa";
function DynamicIcon(props: any) {
  type IconName =
    | "PiShoppingCartSimple"
    | "LuLayoutDashboard"
    | "CgUnavailable"
    | "SlHome"
    | "FiUsers"
    | "CgProfile"
    | "FaWpforms";

  interface IconProps {
    iconName: IconName;
    size?: number;
    color?: string;
  }

  function Icon({ iconName, size = 26, color = "red" }: IconProps) {
    const icons: Record<IconName, IconType> = {
      PiShoppingCartSimple: PiShoppingCartSimple,
      LuLayoutDashboard: LuLayoutDashboard,
      CgUnavailable: CgUnavailable,
      SlHome: SlHome,
      FaWpforms: FaWpforms,
      FiUsers: FiUsers,

      CgProfile: CgProfile,
    };

    if (!icons.hasOwnProperty(iconName)) {
      console.warn(
        `Icon '${iconName}' not found. Rendering default icon instead.`
      );
      iconName = "CgUnavailable"; // set default icon name
    }

    const IconComponent = icons[iconName];

    return <IconComponent size={size} color={props.color} />;
  }

  return <Icon iconName={props.name} size={props.size} />;
}
export default DynamicIcon;
