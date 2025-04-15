import { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // react-router-dom을 사용합니다.
import { Button } from "../components/ui/button"; // Button 컴포넌트가 별도로 있어야 합니다.
import { SearchAccordion } from "../components/search-accordion"; // SearchAccordion 컴포넌트가 별도로 있어야 합니다.
import { Logo, LogoutButton } from "../components/header"; // Logo, LogoutButton 컴포넌트가 별도로 있어야 합니다.

const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // 컴포넌트가 마운트될 때 로그인 상태를 localStorage에서 가져옵니다.
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user'); // 로그아웃 시 로그인 정보 제거
    setIsLoggedIn(false); // 상태 변경
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="container mx-auto py-4 px-4">
        <div className="flex items-center justify-between gap-2">
          <Logo />
          {/* 로그아웃 버튼은 로그인 상태일 때만 표시 */}
          {isLoggedIn && (
            <div className="gap-2">
              <LogoutButton onLogout={handleLogout} />
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto py-7 px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Main Content Area */}
          <div className="md:col-span-2 bg-gradient-to-br from-fuchsia-50 to-teal-50 rounded-xl p-6 shadow-sm">
            <h2 className="text-2xl font-bold text-fuchsia-800 mb-4">🚀 내 방을 찾는 모험을 떠나보아요</h2>
            <p className="text-gray-700 mb-4">
              방방체크는 방을 직접 보러 가는 <strong>현장 방문 단계</strong>에서 <strong>꼭 확인해야 할 체크리스트</strong>를 제공합니다. <br />
              사용자가 실수 없이 꼼꼼하게 방을 확인할 수 있도록 도와드립니다.<br />
              단순한 정보 제공을 넘어, 여러분의 라이프스타일과 조건에 꼭 맞는 방을 찾기 위한 여정을 함께합니다.<br />
              방 찾기 프로젝트를 함께 하려면 로그인을 해주세요.
            </p>
            <h2 className="text-xl font-bold text-fuchsia-800 mb-4">
              방을 구하는 과정을 단계별로 살펴보세요. <br />
            </h2>
            <SearchAccordion />
          </div>

          {/* Sidebar */}
          <div className="flex flex-col gap-6">
            <div className="bg-gradient-to-br from-teal-50 to-emerald-50 rounded-xl p-6 shadow-sm">
              {!isLoggedIn ? (
                <>
                  <h2 className="text-xl font-bold text-teal-700 mb-6">로그인</h2>
                  <div className="space-y-4">
                    {/* 로그인 상태가 아니면 로그인, 회원가입 버튼 표시 */}
                    <Link to="/login">
                      <Button className="w-full bg-fuchsia-600 hover:bg-fuchsia-700 mb-2">로그인</Button>
                    </Link>
                    <Link to="/signup">
                      <Button variant="outline" className="w-full bg-white text-teal-600 border-teal-200 hover:bg-teal-50">
                        회원가입
                      </Button>
                    </Link>
                    <div className="flex justify-center pt-2">
                      <Link to="#" className="text-sm text-gray-500 hover:text-fuchsia-600">
                        비밀번호를 잊으셨나요?
                      </Link>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {/* 로그인 상태일 때는 '프로젝트' 버튼 표시 */}
                  <h2 className="text-xl font-bold text-teal-700 mb-6">프로젝트</h2>
                  <div className="space-y-4">
                    <Link to="/projects">
                      <Button className="w-full bg-fuchsia-600 hover:bg-fuchsia-700 mb-2">프로젝트</Button>
                    </Link>
                  </div>
                </>
              )}
            </div>

            <div className="bg-gradient-to-br from-fuchsia-50 to-pink-50 rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-bold text-fuchsia-700 mb-4">방방체크</h2>
              <ul className="space-y-2">
                <li className="text-sm text-gray-700 pb-2 border-b border-pink-100">
                  비어있는 집보다 비어있는 체크리스트가 더 무섭다...
                </li>
                <li className="text-sm text-gray-700 pb-2 border-b border-pink-100">
                  "이 정도면 괜찮겠지?" → 자취 3개월 후의 나: 😐
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main> {/* 이제 main 태그가 제대로 닫힘 */}

      {/* Footer */}
      <footer className="fixed bottom-0 left-0 w-full bg-gray-50 py-6 shadow-md z-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-gray-600 text-sm">© 2025 방방체크. All rights reserved.</p>
            </div>
            <div className="flex gap-4">
              <Link to="#" className="text-sm text-gray-600 hover:text-fuchsia-600">
                이용약관
              </Link>
              <Link to="#" className="text-sm text-gray-600 hover:text-fuchsia-600">
                개인정보처리방침
              </Link>
              <Link to="#" className="text-sm text-gray-600 hover:text-fuchsia-600">
                고객센터
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
