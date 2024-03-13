import NavBar from "./NavBar";
import HeroSection from "./HeroSection";
import MainButtons from "./MainButtons";

function Header() {
  return (
    <>
      <div className="header">
        <NavBar />
        <HeroSection />
        <MainButtons />
      </div>
    </>
  );
}

export default Header;
