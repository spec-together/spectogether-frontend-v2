import { KakaoLoginButton } from "../../components/login/KakaoLoginButton.jsx";
import { PhoneLoginButton } from "../../components/login/PhoneLoginButton.jsx";
import { HeaderBrandLogo } from "../../components/header/HeaderBrandLogo.jsx";

export function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-bg-primary">
      <div className="items-center justify-center p-8 space-y-9 ">
        <HeaderBrandLogo />
        <div className="m-6 space-y-5">
          <KakaoLoginButton />
          <PhoneLoginButton />
        </div>
      </div>
    </div>
  );
}
