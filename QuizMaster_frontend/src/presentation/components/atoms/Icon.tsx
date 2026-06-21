import { Link } from "react-router";

export const Icon = () => {
  return (
    <>
      <Link className="h-9/10 lg:h-full" to={"/playerDashboard"}>
        <img
            className="w-full h-full object-contain"
            src="/images/Icon_color_bordered.png"
            alt="Icon"
          />
      </Link>
    </>
  );
};
