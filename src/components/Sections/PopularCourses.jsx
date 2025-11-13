import { useQuery } from "@tanstack/react-query";
import { getFeaturedCourses } from "../../api/lib";
import Container from "../Shared/Container";
import CourseCard from "../Cards/CourseCard";
import SkeletonLoader from "../Shared/SkeletonLoader";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5 },
  },
};

const PopularCourses = () => {
  const { data: courses = [], isLoading } = useQuery({
    queryKey: ["featured-courses"],
    queryFn: getFeaturedCourses,
  });

  return (
    <div className="my-20">
      <Container>
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold">Our Popular Courses</h2>
          <p className="text-lg text-gray-600 mt-2">
            Discover the most sought-after courses by our community.
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, index) => (
              <SkeletonLoader key={index} />
            ))}
          </div>
        ) : (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {courses.map((course) => (
              <motion.div key={course._id} variants={itemVariants}>
                <CourseCard course={course} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </Container>
    </div>
  );
};

export default PopularCourses;
