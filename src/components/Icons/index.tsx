import VideoSettingsIcon from "@mui/icons-material/VideoSettings";
import { SvgIcon, SvgIconProps } from "@mui/material";

import { IconBaseProps } from "react-icons";
import {
  AiFillLock,
  AiFillSound,
  AiOutlineAim,
  AiOutlineCalendar,
} from "react-icons/ai";
import { BiErrorCircle, BiPlayCircle, BiTimeFive } from "react-icons/bi";
import { BsCheck } from "react-icons/bs";
import { FaRegUser } from "react-icons/fa";
import { FiSettings } from "react-icons/fi";
import { GoHome } from "react-icons/go";

import { MdOutlineEdit } from "react-icons/md";

import { TfiControlPause, TfiSave } from "react-icons/tfi";
import { TiArrowLeft, TiArrowRight } from "react-icons/ti";
import { VscMenu, VscSettings } from "react-icons/vsc";

export const Icons = {
  Lock: (props: IconBaseProps) => <AiFillLock {...props} />,

  Menu: (props: IconBaseProps) => <VscMenu {...props} />,
  Home: (props: IconBaseProps) => <GoHome {...props} />,
  Settings: (props: IconBaseProps) => (
    <VscSettings {...props} style={{ transform: "rotate(90deg)" }} />
  ),
  Error: (props: IconBaseProps) => <BiErrorCircle {...props} />,
  Sound: (props: IconBaseProps) => <AiFillSound {...props} />,
  Play: (props: IconBaseProps) => <BiPlayCircle {...props} />,

  Pause: (props: IconBaseProps) => <TfiControlPause {...props} />,

  Gears: (props: IconBaseProps) => <FiSettings {...props} />,

  PlayGear: (props: SvgIconProps) => {
    return <SvgIcon {...props} component={VideoSettingsIcon} />;
  },
  Calendar: (props: IconBaseProps) => <AiOutlineCalendar {...props} />,
  Time: (props: IconBaseProps) => <BiTimeFive {...props} />,
  Save: (props: IconBaseProps) => <TfiSave {...props} />,
  Aim: (props: IconBaseProps) => <AiOutlineAim {...props} />,
  Edit: (props: IconBaseProps) => <MdOutlineEdit {...props} />,
  User: (props: IconBaseProps) => <FaRegUser {...props} />,
  RightArrow: (props: IconBaseProps) => <TiArrowRight {...props} />,
  LeftArrow: (props: IconBaseProps) => <TiArrowLeft {...props} />,
  Checked: (props: IconBaseProps) => <BsCheck {...props} />,
};
