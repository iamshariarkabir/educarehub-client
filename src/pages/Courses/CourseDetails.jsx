import { useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router";
import { getCourseById, createEnrollment } from "../../api/lib";
import Container from "../../components/Shared/Container";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import {
  FaPlayCircle,
  FaDollarSign,
  FaClock,
  FaUserTie,
  FaInfinity,
  FaCertificate,
} from "react-icons/fa";

const placeholderWhatYouWillLearn = [
  "Master the core concepts and fundamental principles of the subject.",
  "Gain practical, hands-on experience through real-world examples.",
  "Develop the skills and confidence to apply your knowledge professionally.",
  "Learn industry best practices and modern techniques.",
  "Receive a certificate of completion to showcase your new expertise.",
];

const placeholderCurriculum = [
  { title: "Module 1: Introduction", lessons: 5 },
  { title: "Module 2: Core Concepts", lessons: 8 },
  { title: "Module 3: Advanced Topics", lessons: 12 },
  { title: "Module 4: Building the Project", lessons: 15 },
];

const CourseDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const {
    data: course,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["course", id],
    queryFn: () => getCourseById(id),
  });

  useEffect(() => {
    if (course?.title) {
      document.title = `EducareHub || ${course.title}`;
    }
  }, [course]);

  const mutation = useMutation({
    mutationFn: createEnrollment,
    onSuccess: () => {
      toast.success(
        "Enrollment successful! The course is now in your dashboard."
      );
      navigate("/dashboard/my-enrolled");
    },
    onError: (error) => {
      toast.error(`Enrollment failed: ${error.message}`);
    },
  });

  const handleEnroll = () => {
    const enrollmentData = {
      studentEmail: user?.email,
      courseId: course?._id,
      courseTitle: course?.title,
      courseImageUrl: course?.imageUrl,
    };
    mutation.mutate(enrollmentData);
  };

  if (isLoading) return <LoadingSpinner />;
  if (isError)
    return (
      <div className="text-center text-red-500 py-20">
        Error: {error.message}
      </div>
    );

  return (
    <div className="bg-base-100">
      <Container>
        <div className="py-20">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* --- Left Column: Course Information --- */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <p className="badge badge-primary mb-4">{course.category}</p>
                <h1 className="text-4xl font-bold mb-4">{course.title}</h1>
                <p className="text-lg text-gray-600 mb-6">
                  {course.description}
                </p>

                <div className="flex items-center gap-4 mb-8">
                  <div className="avatar">
                    <div className="w-12 rounded-full">
                      <img
                        src={course.instructorPhoto}
                        alt={course.instructorName}
                      />
                    </div>
                  </div>
                  <div>
                    <p className="font-bold">{course.instructorName}</p>
                    <p className="text-sm text-gray-500">Instructor</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="card bg-base-200 p-8 shadow-lg mt-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h2 className="text-2xl font-bold mb-4">What you'll learn</h2>
                <ul className="space-y-3">
                  {placeholderWhatYouWillLearn.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="text-primary mt-1">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              <motion.div
                className="mt-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <h2 className="text-2xl font-bold mb-4">Course Curriculum</h2>
                <div className="space-y-2">
                  {placeholderCurriculum.map((item, index) => (
                    <div
                      key={index}
                      className="collapse collapse-plus bg-base-200"
                    >
                      <input
                        type="radio"
                        name="my-accordion-3"
                        defaultChecked={index === 0}
                      />
                      <div className="collapse-title text-xl font-medium">
                        {item.title}
                      </div>
                      <div className="collapse-content">
                        <p>
                          {item.lessons} lessons in this module. Content will be
                          shown here.
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* --- Right Column: Action Card --- */}
            <div className="lg:sticky top-24 h-fit">
              <motion.div
                className="card bg-base-100 shadow-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <figure className="relative">
                  <img
                    src={course.imageUrl}
                    alt={course.title}
                    className="w-full h-56 object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                    <FaPlayCircle className="text-white text-6xl cursor-pointer opacity-70 hover:opacity-100 transition-opacity" />
                  </div>
                </figure>
                <div className="card-body">
                  <div className="flex justify-between items-center mb-4">
                    <span className="flex items-center gap-1 font-bold text-3xl text-primary">
                      <FaDollarSign /> {course.price}
                    </span>
                    {course.isFeatured && (
                      <span className="badge badge-lg badge-secondary">
                        Featured
                      </span>
                    )}
                  </div>
                  <button
                    onClick={handleEnroll}
                    className="btn btn-primary btn-lg w-full mb-4"
                    disabled={mutation.isLoading}
                  >
                    {mutation.isLoading ? "Processing..." : "Enroll Now"}
                  </button>
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-center gap-3">
                      <FaClock /> <strong>Duration:</strong> {course.duration}
                    </li>
                    <li className="flex items-center gap-3">
                      <FaUserTie /> <strong>Instructor:</strong>{" "}
                      {course.instructorName}
                    </li>
                    <li className="flex items-center gap-3">
                      <FaInfinity /> <strong>Access:</strong> Full Lifetime
                    </li>
                    <li className="flex items-center gap-3">
                      <FaCertificate /> <strong>Certificate:</strong> On
                      Completion
                    </li>
                  </ul>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default CourseDetails;