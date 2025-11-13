const SkeletonLoader = () => {
  return (
    <div className="animate-pulse space-y-4 rounded-lg border border-base-300 p-4">
      <div className="h-40 rounded bg-base-300"></div>
      <div className="space-y-3">
        <div className="h-6 rounded bg-base-300"></div>
        <div className="h-4 w-3/4 rounded bg-base-300"></div>
        <div className="h-4 w-1/2 rounded bg-base-300"></div>
      </div>
    </div>
  );
};

export default SkeletonLoader;
