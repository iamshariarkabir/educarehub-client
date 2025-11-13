import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllCourses } from "../../api/lib";
import Container from "../../components/Shared/Container";
import CourseCard from "../../components/Cards/CourseCard";
import SkeletonLoader from "../../components/Shared/SkeletonLoader";
import { motion } from "framer-motion";

const categories = [
  "All",
  "Web Development",
  "Data Science",
  "Design",
  "Marketing",
]; // Example categories

const AllCourses = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    document.title = "EducareHub | All Courses";
  }, []);

  const { data: courses = [], isLoading } = useQuery({
    queryKey: ["courses", selectedCategory],
    queryFn: () =>
      getAllCourses(selectedCategory === "All" ? null : selectedCategory),
  });

  return (
    <div className="py-16">
      <Container>
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold">Our Courses</h1>
          <p className="text-lg text-gray-600 mt-2">
            Find the perfect course to kickstart your career.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex justify-center flex-wrap gap-2 mb-10">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`btn ${
                selectedCategory === category ? "btn-primary" : "btn-ghost"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Courses Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, index) => (
              <SkeletonLoader key={index} />
            ))}
          </div>
        ) : (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {courses.length > 0 ? (
              courses.map((course) => (
                <CourseCard key={course._id} course={course} />
              ))
            ) : (
              <p className="text-center col-span-3 text-xl">
                No courses found for this category.
              </p>
            )}
          </motion.div>
        )}
      </Container>
    </div>
  );
};

export default AllCourses;
