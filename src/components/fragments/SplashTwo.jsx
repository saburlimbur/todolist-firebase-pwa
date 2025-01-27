import React from 'react';
import { motion } from 'motion/react';
import imageSplashTwo from '../../assets/rb_2150417391.png';

function SplashTwo() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-screen px-6">
      <div className="max-w-[600px] mx-auto flex flex-col gap-3 justify-center">
        <h1 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">Nikmati setiap fitur yang ada pada aplikasi ini</h1>
        <p className="text-sm sm:text-xl text-gray-500">Mari mulai sekarang dan nikmati kemudahan dalam pengelolaan catatan mu</p>
      </div>
      <motion.img
        src={imageSplashTwo}
        className="mt-6 mb-4 w-[90%] sm:w-[90%] md:w-[80%] lg:w-[70%] xl:w-[60%] 2xl:w-[60%]"
        initial={{ opacity: 0, y: 0, scale: 0.1 }}
        animate={{
          opacity: 1,
          y: [0, -5, 5, 0],
          scale: 1,
        }}
        transition={{
          opacity: { duration: 0.8 },
          y: { duration: 2, repeat: Infinity, repeatType: 'loop' },
          scale: { duration: 1 },
        }}
      />
    </div>
  );
}

export default SplashTwo;
