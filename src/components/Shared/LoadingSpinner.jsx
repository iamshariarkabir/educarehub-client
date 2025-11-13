const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-300px)]">
      <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-primary"></div>
    </div>
  );
};

export default LoadingSpinner;
