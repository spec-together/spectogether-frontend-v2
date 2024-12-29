export const Footer = () => {
  return (
    <footer className="w-full font-basic border-t border-[#e5e5e5] py-5 text-center text-sm text-[#666]">
      <div className="mb-5">여러분의 모든 도전을 응원합니다.</div>

      <div className="flex justify-center gap-2.5 mb-4">
        <span>고객센터: 010-9344-8561</span>
        <span>|</span>
        <span>대표메일: saveearth1@cau.ac.kr</span>
        <span>|</span>
        <span>
          주소: 서울특별시 금천구 가산로 70 청년취업사관학교 금천캠퍼스
        </span>
      </div>

      <div className="flex justify-center gap-2.5 mb-4">
        <span>SeSAC 금천캠퍼스 2024</span>
        <span>|</span>
        <span>Full Stack Developer Course</span>
        <span>|</span>
        <span>박경운, 최재원, 서가은</span>
        <span>|</span>
        <span>Copyright © 스펙투게더 2024</span>
      </div>

      <div className="text-xs text-[#888]">
        업로드되어 있는 모든 정보는 주최기관에 의하여 등록된 정보이며,
        스펙투게더는 해당 정보에 대해 책임을 지지 않습니다.
      </div>
    </footer>
  );
};
