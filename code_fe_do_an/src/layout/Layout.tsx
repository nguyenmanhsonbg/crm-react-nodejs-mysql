import Footer from "./footer/Footer";
import Header from "./header/Header";

export default function Layout({ children }: { children: React.ReactNode }) {
  

  return (
    <div className="flex flex-col">
      <Header />
      <img className="w-full" src="/banner.gif" />
      {children}
    </div>
  );

}
