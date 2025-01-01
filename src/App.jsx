import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { UserProvider } from "./contexts/UserContext";
import { FeatureTestPage } from "./pages/FeatureTestPage.jsx";
import { NotFoundPage } from "./pages/error/NotFoundPage";
import { MainPage } from "./pages/main/MainPage.jsx";
import { SearchHeaderLayoutPage } from "./pages/layouts/SearchHeaderLayoutPage.jsx";
import { ContestSpecificsPage } from "./pages/event/ContestSpecificsPage.jsx";
import { MyPage } from "./pages/mypage/MyPage.jsx";
import { PageHeaderLayoutPage } from "./pages/layouts/PageHeaderLayoutPage.jsx";
import { StudyroomPage } from "./pages/studyroom/StudyroomPage.jsx";
import { LoginPage } from "./pages/login/LoginPage.jsx";
import { RegisterPage } from "./pages/register/RegisterPage.jsx";
import { TermsAgreePage } from "./pages/register/TermsAgreePage.jsx";
import { StudyroomVideocallPage } from "./pages/studyroom/StudyroomVideocallPage.jsx";
import { MyStudyroomListPage } from "./pages/mypage/MyStudyroomListPage.jsx";
import { ResetPasswordPage } from "./pages/findpw/ResetPasswordPage.jsx";

// QueryClient 생성
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <UserProvider>
          <Routes>
            {/* 404 */}
            <Route path="*" element={<NotFoundPage />} />

            {/* 로그인, 비밀번호 찾기, 회원가입 페이지 */}
            <Route
              path="/login"
              element={
                <SearchHeaderLayoutPage>
                  <LoginPage />
                </SearchHeaderLayoutPage>
              }
            />
            <Route
              path="/find/pw"
              element={
                <SearchHeaderLayoutPage>
                  <ResetPasswordPage />
                </SearchHeaderLayoutPage>
              }
            />
            <Route
              path="/register"
              element={
                <SearchHeaderLayoutPage>
                  <RegisterPage />
                </SearchHeaderLayoutPage>
              }
            />
            <Route
              path="/register/terms"
              element={
                <SearchHeaderLayoutPage>
                  <TermsAgreePage />
                </SearchHeaderLayoutPage>
              }
            />

            {/* 공모전 페이지 */}
            <Route
              path="/contest/:contestId"
              element={
                <SearchHeaderLayoutPage>
                  <ContestSpecificsPage />
                </SearchHeaderLayoutPage>
              }
            />

            {/* 메인페이지 */}
            <Route
              path="/"
              element={
                <SearchHeaderLayoutPage>
                  <MainPage />
                </SearchHeaderLayoutPage>
              }
            />

            {/* 스터디룸 */}
            <Route
              path="/studyroom"
              element={
                <PageHeaderLayoutPage>
                  <MyStudyroomListPage />
                </PageHeaderLayoutPage>
              }
            />
            <Route
              path="/studyroom/:studyroomId"
              element={
                <PageHeaderLayoutPage>
                  <StudyroomPage />
                </PageHeaderLayoutPage>
              }
            />
            <Route
              path="/studyroom/:studyroomId/video"
              element={
                <PageHeaderLayoutPage>
                  <StudyroomVideocallPage />
                </PageHeaderLayoutPage>
              }
            />

            {/* 마이페이지 */}
            <Route
              path="/mypage"
              element={
                <PageHeaderLayoutPage>
                  <MyPage />
                </PageHeaderLayoutPage>
              }
            />

            {/* 기능 테스트용 페이지들 */}
            <Route
              path="/test-videocall"
              element={<StudyroomVideocallPage />}
            />

            <Route path="/test" element={<FeatureTestPage />} />
          </Routes>
        </UserProvider>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
