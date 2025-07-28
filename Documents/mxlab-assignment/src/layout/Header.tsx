import { useNavigate } from "react-router-dom";
import Logo from "@/assets/logo.png";
import { Button } from "@/components/ui/button";

const Header = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full flex justify-between border-b p-2">
      <div className="flex items-center space-x-2">
        <img src={Logo} className="w-8 h-8" />
        <div
          onClick={() => navigate("/")}
          className="font-extrabold text-2xl cursor-pointer"
        >
          mxlab
        </div>
      </div>
      <Button
        variant="outline"
        className="text-purple-600 bg-white border-purple-500 hover:text-purple-500 cursor-pointer"
      >
        로그아웃
      </Button>
    </div>
  );
};

export default Header;
