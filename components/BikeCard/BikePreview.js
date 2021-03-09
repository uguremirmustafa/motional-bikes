import { useAnimation } from 'framer-motion';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import cn from './BikePreview.module.css';
export default function BikePreview({ bike }) {
  const { id, title, large_img, stolen_location, manufacturer_name, thumb } = bike;
  const [open, setOpen] = useState(false);
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.9,
  });
  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  return (
    <motion.div
      className={cn.container}
      ref={ref}
      animate={controls}
      initial="hidden"
      transition={{
        duration: 0.6,
        delay: 0.4,
        type: 'spring',
      }}
      variants={{
        visible: { opacity: 1, scale: 1 },
        hidden: { opacity: 0, scale: 0.9 },
      }}
      onClick={() => setOpen(!open)}
    >
      <div key={id} className={cn.inner_container}>
        <div className={cn.img_container}>
          <Image src={large_img} alt={title} layout="fill" objectFit="cover" />
        </div>
        <div className={cn.content1}>
          <h3>{title}</h3>
        </div>
        <motion.div
          className={cn.content2}
          animate={{
            height: open ? 100 : 0,
          }}
        >
          <h4>Manufacturer: {manufacturer_name}</h4>
          <span>Stolen @{stolen_location}</span>
        </motion.div>
      </div>
    </motion.div>
  );
}
