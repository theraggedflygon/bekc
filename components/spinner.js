const Spinner = () => {
  return (
    <div className="text-center">
      <div className="w-full flex justify-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-tr from-blue-500 to-blue-200 animate-spin">
          <div className="h-12 w-12 rounded-full bg-white"></div>
        </div>
      </div>
      <div>Please wait. Your data is loading.</div>
    </div>
  );
};

export default Spinner;
