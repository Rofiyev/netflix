import { redirect } from "next/navigation";

const HomePage = () => {
  return redirect("/browse");
};

export default HomePage;
