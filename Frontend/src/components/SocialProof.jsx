import React from 'react';
import { motion } from 'framer-motion';

const SocialProof = () => {
  const partners = [
    'Product Teams', 'Growth Marketers', 'Founders', 'UX Research', 'Customer Success'
  ];

  return (
    <section className="py-12 px-6">
      <div className="container mx-auto max-w-5xl text-center">
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-sm font-bold uppercase tracking-widest text-charcoal-muted mb-8"
        >
          Built for product teams, marketers, and founders
        </motion.p>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-40 grayscale hover:grayscale-0 transition-all duration-700">
          {partners.map((partner, i) => (
            <motion.div 
              key={partner}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-xl font-black tracking-tighter text-charcoal hover:scale-110 transition-transform cursor-default"
            >
              {partner}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SocialProof;
