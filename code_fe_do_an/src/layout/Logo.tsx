import { NavLink } from "react-router-dom";

export default function Logo() {
  return (
    <div>
      <NavLink
        to={"/"}
        className="flex items-center gap-5 text-lg font-semibold md:text-base"
      >
        <img className="size-24" src="/logo.png" />
        <div>
          <div className="text-[#084fc2]">Quản Lý</div>
          <div className="text-[#084fc2]">Phòng Máy</div>
        </div>
        {/* <span className="text-3xl font-semibold">DNLS</span> */}
      </NavLink>
    </div>
  );
}
