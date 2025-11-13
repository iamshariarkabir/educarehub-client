import { Link } from "react-router";
import { motion } from "framer-motion";

const CourseCard = ({ course }) => {
  const { _id, title, imageUrl, price, description, instructorName } = course;

  return (
    <motion.div
      className="card bg-base-100 shadow-xl border border-transparent h-[450px] hover:border-primary transition-all duration-300"
      whileHover={{ y: -5 }}
    >
      <figure className="px-6 pt-6">
        <img
          src={imageUrl}
          alt={title}
          className="rounded-xl h-48 w-full object-cover"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p className="text-sm text-gray-500">By {instructorName}</p>
        <p>
          {description.length > 100
            ? `${description.substring(0, 100)}...`
            : description}
        </p>
        <div className="card-actions justify-between items-center mt-4">
          <p className="text-xl font-bold text-primary">${price}</p>
          <Link to={`/course/${_id}`}>
            <button className="btn btn-primary btn-sm">View Details</button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default CourseCard;
