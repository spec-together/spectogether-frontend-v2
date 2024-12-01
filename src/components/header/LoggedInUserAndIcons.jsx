import { MessageIcon } from "../icons/MessageIcon";
import { AlarmIcon } from "../icons/AlarmIcon";
import { UserIcon } from "../icons/UserIcon";

export const LoggedInUserAndIcons = ({ user }) => {
  return (
    <div className="mr-[1.53rem] flex flex-row items-center">
      <div className="flex flex-row items-center justify-center ml-3 space-x-[0.81rem]">
        <AlarmIcon />
        <MessageIcon />
        <UserIcon />
      </div>
      <div className="ml-[0.81rem] flex flex-row items-center space-x-1">
        <span className="font-basic tracking-tighter text-[#5C5C5C] font-medium text-xl">
          환영합니다,
        </span>
        <span className="font-basic tracking-tight text-[#000000] font-semibold text-2xl">
          {user.username}
        </span>
        <span className="font-basic tracking-tighter text-[#5C5C5C] font-medium text-xl">
          님.
        </span>
      </div>
    </div>
  );
};
