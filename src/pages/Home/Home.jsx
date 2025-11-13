import { useEffect } from "react";
import HomeBanner from "../../components/Banners/HomeBanner";
import PopularCourses from "../../components/Sections/PopularCourses";
import WhyChooseUs from "../../components/Sections/WhyChooseUs";
import Connection from "../../components/Sections/Connection";

const Home = () => {
  useEffect(() => {
    document.title = "EducareHub | Home";
  }, []);

  return (
    <div>
      <HomeBanner />
      <PopularCourses />
      <WhyChooseUs />
      <Connection />
    </div>
  );
};

export default Home;
