import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import BuildIcon from "@mui/icons-material/Build";
import MemoryIcon from "@mui/icons-material/Memory";
import { FooterLinkItem } from "./FooterLinkItem";
import { Timer } from "@mui/icons-material";

export const FooterView = () => {
  return (
    <div className="flex justify-between items-center bg-white border-t border-gray-300 rounded-lg shadow-2xl overflow-hidden">
      <FooterLinkItem to="/memories" icon={MemoryIcon} label="思い出" />
      <FooterLinkItem to="/profile" icon={PersonIcon} label="プロフィール" />
      <FooterLinkItem to="/" icon={HomeIcon} label="ホーム" />
      <FooterLinkItem to="/pomodoro" icon={Timer} label="ポモドーロ" />
      <FooterLinkItem to="/development" icon={BuildIcon} label="開発者" />
    </div>
  );
};
