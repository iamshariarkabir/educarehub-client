import React, { useEffect } from "react";
import { motion, useInView, animate } from "framer-motion";

// Custom Counter Component (as provided in your example)
function Counter({ from = 0, to, duration = 3 }) {
  const ref = React.useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (inView) {
      animate(from, to, {
        duration: duration,
        onUpdate(value) {
          if (ref.current) {
            ref.current.textContent = Math.round(value).toLocaleString();
          }
        },
      });
    }
  }, [inView, from, to, duration]);

  return <span ref={ref} />;
}

const stats = [
  { id: 1, icon: "🎓", value: 1200, label: "Students Enrolled" },
  { id: 2, icon: "📚", value: 80, label: "Total Courses" },
  { id: 3, icon: "⭐", value: 3500, label: "Positive Reviews" },
  { id: 4, icon: "👩‍🏫", value: 45, label: "Expert Instructors" },
];

const WhyChooseUs = () => {
  return (
    <section className="py-20 bg-base-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
        {/* Left Side - Stats */}
        <motion.div
          className="grid grid-cols-2 gap-6"
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {stats.map((item, index) => (
            <motion.div
              key={item.id}
              className="bg-base-100 text-center shadow-lg rounded-2xl py-10 transition-transform duration-300 hover:-translate-y-2"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <div className="text-5xl mb-3">{item.icon}</div>
              <h3 className="text-4xl font-bold text-primary">
                <Counter to={item.value} />+
              </h3>
              <p className="mt-2">{item.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Right Side - Text Content */}
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <p className="text-[#f27f0c] uppercase tracking-widest font-semibold mb-2">
            Why Choose Us
          </p>
          <h2 className="text-4xl sm:text-5xl lg:text-5xl font-bold mb-4 leading-snug">
            Creating A Community Of Life Long Learners
          </h2>
          <p className="text-gray-600 mb-6">
            Our platform is dedicated to fostering a vibrant learning
            environment. We provide top-quality courses and resources to help
            you achieve your personal and professional goals.
          </p>
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="text-3xl">😊</div>
              <div>
                <h4 className="font-semibold text-lg">Trusted By Thousands</h4>
                <p className="text-gray-600 text-sm">
                  We have a proven track record of success with thousands of
                  satisfied students from around the globe.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="text-3xl">💡</div>
              <div>
                <h4 className="font-semibold text-lg">
                  Unlimited Resources & Strong Support
                </h4>
                <p className="text-gray-600 text-sm">
                  Gain access to a wealth of materials and get help from our
                  dedicated support team whenever you need it.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUs;