import { Button, chakra } from "@chakra-ui/react";
import { FaArrowLeft } from "react-icons/fa";
import { LuLogOut } from "react-icons/lu";

type BackButtonProps = {
  logoutIcon?: boolean;
  onClick?: () => void;
  className?: string;
};

export const BackButton = chakra(
  ({ logoutIcon, onClick, className }: BackButtonProps) => {
    return (
      <Button variant="plain" px={0} onClick={onClick} className={className}>
        {logoutIcon ? <LuLogOut /> : <FaArrowLeft />}
      </Button>
    );
  }
);
