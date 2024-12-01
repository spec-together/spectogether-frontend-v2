import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { LoginPage } from "./pages/login/LoginPage.jsx";
import { RegisterPage } from "./components/register/RegisterPage";
import { UserProvider } from "./contexts/UserContext";
import { FeatureTestPage } from "./pages/FeatureTestPage.jsx";
import { LocalLoginPage } from "./pages/login/LocalLoginPage.jsx";
import { ResetPasswordPage } from "./pages/lostandfound/ResetPasswordPage";
import { FindIdPage } from "./pages/lostandfound/FindIdPage";
import { NotFoundPage } from "./pages/error/NotFoundPage";
import { TermsPage } from "./components/register/TermsPage";
import { ChatListPage } from "./pages/chat/ChatListPage.jsx";
import { ChatPage } from "./pages/chat/ChatPage.jsx";
import { EmailCheckNonUser } from "./components/register/EmailCheck.jsx";
import { VideoCallPage } from "./pages/videocall/VideoCallPage";
import { GroupCallPage } from "./pages/videocall/GroupCallPage";
import { MeetPage } from "./pages/meet/MeetPage";
import { MeetroomPage } from "./pages/meet/MeetroomPage";
import { SetSpecificProfilePage } from "./components/register/SetSpecificProfilePage";
import KakaoMapPage from "./components/location/NaverMap.jsx";
import { MainPage } from "./pages/MainPage.jsx";
import { SearchHeaderLayoutPage } from "./components/layouts/SearchHeaderLayoutPage.jsx";
import { ContestSpecificsPage } from "./pages/ContestSpecificsPage.jsx";
import { MyPage } from "./pages/MyPage.jsx";
import { PageHeaderLayoutPage } from "./components/layouts/PageHeaderLayoutPage.jsx";
import { StudyroomPage } from "./pages/StudyroomPage.jsx";
import { NewLoginPage } from "./pages/NewLoginPage.jsx";
import { NewRegisterPage } from "./pages/NewRegisterPage.jsx";
import { NewTermsAgreePage } from "./pages/NewTermsAgreePage.jsx";

function App() {
  return (
    <Router>
      <UserProvider>
        <Routes>
          <Route path="*" element={<NotFoundPage />} />
          <Route
            path="/"
            element={
              <SearchHeaderLayoutPage>
                <MainPage />
              </SearchHeaderLayoutPage>
            }
          />
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
          <Route
            path="/contest/:contestId"
            element={
              <SearchHeaderLayoutPage>
                <ContestSpecificsPage />
              </SearchHeaderLayoutPage>
            }
          />
          <Route
            path="/mypage"
            element={
              <PageHeaderLayoutPage>
                <MyPage />
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

          <Route path="/test" element={<FeatureTestPage />} />
          <Route path="/email-check" element={<EmailCheckNonUser />} />
          <Route
            path="/register/specific"
            element={<SetSpecificProfilePage />}
          />
          <Route path="/find/id" element={<FindIdPage />} />
          <Route path="/find/pw" element={<ResetPasswordPage />} />
          <Route path="/chat" element={<ChatListPage />} />
          <Route path="/chat/:chatroomId" element={<ChatPage />} />
          <Route path="/videocall" element={<VideoCallPage />} />
          <Route path="/groupcall" element={<GroupCallPage />} />
          <Route path="/meet" element={<MeetPage />} />
          <Route path="/meet/:meetroomId" element={<MeetroomPage />} />
          <Route path="/kakaomap" element={<KakaoMapPage />} />
        </Routes>
      </UserProvider>
    </Router>
  );
}

export default App;
