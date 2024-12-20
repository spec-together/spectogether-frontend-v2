import { useState } from "react";
import { CategoryIcon } from "../icons/CategoryIcon";
import { PlusIcon } from "../icons/PlusIcon";
import { CreateStudyroomModal } from "../modals/CreateStudyroomModal";

export const MenuBar = () => {
  const [isCreateStudyroomModalOpen, setIsCreateStudyroomModalOpen] =
    useState(false);

  return (
    <div className="flex flex-row w-full mt-2">
      <div className="flex flex-row items-center justify-center space-x-[0.69rem] ml-14">
        <CategoryIcon />
        <span className="font-pretendard font-normal text-[1.5rem]">
          카테고리
        </span>
      </div>
      <div className="flex-grow"></div>
      <div
        onClick={() => setIsCreateStudyroomModalOpen(true)}
        className="cursor-pointer flex flex-row items-center border border-[#0010A3] rounded-lg space-x-[0.5rem] px-[0.63rem] py-[0.31rem] mr-10"
      >
        <PlusIcon />
        <span className="text-lg font-basic">스터디 만들기</span>
      </div>
      <CreateStudyroomModal
        isOpen={isCreateStudyroomModalOpen}
        onClose={() => setIsCreateStudyroomModalOpen(false)}
      />
    </div>
  );
};
