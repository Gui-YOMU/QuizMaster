import { Link } from "react-router";

export const Icon = () => {
  return (
    <>
      <Link to={"/playerDashboard"}>
        <div className="h-full">
          <img
            className="w-full h-full object-contain"
            src="/images/Icon_color_bordered.png"
            alt="Icon"
          />
        </div>
      </Link>
    </>
  );
};
