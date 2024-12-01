/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "bg-primary": "#f2f9f9", // 바탕색
        "container-bg-primary": "#bfe0e2", // Container 기본 색
        "input-bg": "#f2f9f9", // Input 내부 색
        "input-border": "#92cace", // Input 테두리 기본 색
        "input-border-hover": "#3b757f", // Input 테두리 호버 색
        "input-border-focused": "#3b757f", // Input 테두리 포커스 색
        "text-primary": "#3C3C3C", // 기본 글자 색깔
        "text-secondary": "#5A5A5A", // 보조 글자 색깔
        "text-inactivated": "#A3A3A3", // 비활성화된 글자 색깔
        "button-bg-primary": "#5faab1", // 버튼 기본 색
        "button-bg-focused": "#438e96", // 버튼 포커스 색
        "button-bg-hover": "#438e96", // 버튼 호버 색
        "button-border-hover": "#92cace", // 버튼 테두리 호버 색
        "button-border-focused": "#92cace", // 버튼 테두리 포커스 색
        "brand-color-jinhan-blue": "#0010A3",
      },
    },
    fontFamily: {
      gmarket: ["Gmarket Sans", "sans-serif"],
      basic: ["AppleSDGothicNeo", "NotoSansKR", "sans-serif"],
      pretendard: ["Pretendard", "NotoSansKR", "sans-serif"],
    },
  },
  plugins: [],
};
