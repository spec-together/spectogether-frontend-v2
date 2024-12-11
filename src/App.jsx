import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { UserProvider } from "./contexts/UserContext";
import { FeatureTestPage } from "./pages/FeatureTestPage.jsx";
import { NotFoundPage } from "./pages/error/NotFoundPage";
import { MainPage } from "./pages/MainPage.jsx";
import { SearchHeaderLayoutPage } from "./components/layouts/SearchHeaderLayoutPage.jsx";
import { ContestSpecificsPage } from "./pages/ContestSpecificsPage.jsx";
import { MyPage } from "./pages/MyPage.jsx";
import { PageHeaderLayoutPage } from "./components/layouts/PageHeaderLayoutPage.jsx";
import { StudyroomPage } from "./pages/StudyroomPage.jsx";
import { NewLoginPage } from "./pages/NewLoginPage.jsx";
import { NewRegisterPage } from "./pages/NewRegisterPage.jsx";
import { NewTermsAgreePage } from "./pages/NewTermsAgreePage.jsx";
import StudyroomVideocallPage from "./pages/StudyroomVideocallPage.jsx";
import { MyStudyroomListPage } from "./pages/MyStudyroomListPage.jsx";

function App() {
  return (
    <Router>
      <UserProvider>
        <Routes>
          {/* 404 */}
          <Route path="*" element={<NotFoundPage />} />

          {/* 로그인, 회원가입 페이지 */}
          <Route
            path="/login"
            element={
              <SearchHeaderLayoutPage>
                <NewLoginPage />
              </SearchHeaderLayoutPage>
            }
          />
          <Route
            path="/register"
            element={
              <SearchHeaderLayoutPage>
                <NewRegisterPage />
              </SearchHeaderLayoutPage>
            }
          />
          <Route
            path="/register/terms"
            element={
              <SearchHeaderLayoutPage>
                <NewTermsAgreePage />
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
          <Route path="/test-videocall" element={<StudyroomVideocallPage />} />

          <Route path="/test" element={<FeatureTestPage />} />
        </Routes>
      </UserProvider>
    </Router>
  );
}

export default App;
