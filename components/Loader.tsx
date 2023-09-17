import Image from 'next/image';

const Loader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <Image
        src="assets/icons/loader.svg"
        width={50}
        height={50}
        alt="loader"
        className="object-contain"
        priority={true}
      />
    </div>
  );
};

export default Loader;
