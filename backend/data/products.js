const products = [
  {
    name: 'Neuronet Implant',
    image: '/images/neuronet.jpg',
    description:
      'Device that can be surgically implanted into the brain to enhance cognitive abilities, allowing users to process information and learn at an accelerated rate',
    brand: 'NexGen Innovations',
    category: 'Implants',
    price: Math.floor(Math.random() * 900) + 100,
    countInStock: Math.floor(Math.random() * 10),
    rating: Math.floor(Math.random() * 4) + 1,
    numReviews: Math.floor(Math.random() * 100),
  },
  {
    name: 'Chrono-Distortion Field Generator',
    image: '/images/cdfg.jpg',
    description:
      'Device that creates a field of distorted time, allowing users to slow down or speed up time within a specific area',
    brand: 'Quantum Dynamics',
    category: 'Electronics',
    price: Math.floor(Math.random() * 900) + 100,
    countInStock: Math.floor(Math.random() * 10),
    rating: Math.floor(Math.random() * 4) + 1,
    numReviews: Math.floor(Math.random() * 100),
  },
  {
    name: 'Molecular Disassembler',
    image: '/images/molecular-disassembler.jpg',
    description:
      'handheld device that can break down any matter into its constituent atoms, allowing users to disintegrate objects or materials.',
    brand: 'Synthetix Solutions',
    category: 'Electronics',
    price: Math.floor(Math.random() * 900) + 100,
    countInStock: Math.floor(Math.random() * 10),
    rating: Math.floor(Math.random() * 4) + 1,
    numReviews: Math.floor(Math.random() * 100),
  },
  {
    name: 'Holo-Transmitter',
    image: '/images/holo-transmitter.jpg',
    description:
      'Communication device that creates a holographic projection of the user, allowing them to appear in multiple locations at once',
    brand: 'AstroGen',
    category: 'Electronics',
    price: Math.floor(Math.random() * 900) + 100,
    countInStock: Math.floor(Math.random() * 10),
    rating: Math.floor(Math.random() * 4) + 1,
    numReviews: Math.floor(Math.random() * 100),
  },
  {
    name: 'Gravimetric Inverter:',
    image: '/images/gravimetric-inverter.jpg',
    description:
      'Device that can manipulate gravitational forces, allowing users to create artificial gravity fields or even reverse the effects of gravity altogether',
    brand: 'Logitech',
    category: 'Electronics',
    price: Math.floor(Math.random() * 900) + 100,
    countInStock: Math.floor(Math.random() * 10),
    rating: Math.floor(Math.random() * 4) + 1,
    numReviews: Math.floor(Math.random() * 100),
  },
  {
    name: 'Gravity Boots',
    image: '/images/gravity-boots.jpg',
    description:
      'Boots that generate a magnetic field, allowing the wearer to walk on walls and ceilings.',
    brand: 'AstroGen',
    category: 'Boots',
    price: Math.floor(Math.random() * 900) + 100,
    countInStock: Math.floor(Math.random() * 10),
    rating: Math.floor(Math.random() * 4) + 1,
    numReviews: Math.floor(Math.random() * 100),
  },
  {
    name: 'Time-Freezer Watch',
    image: '/images/tfw.jpg',
    description:
      'Wristwatch that can temporarily freeze time for a few seconds, allowing the wearer to react quickly to dangerous situations.',
    brand: 'NexGen Innovations',
    category: 'Electronics',
    price: Math.floor(Math.random() * 900) + 100,
    countInStock: Math.floor(Math.random() * 10),
    rating: Math.floor(Math.random() * 4) + 1,
    numReviews: Math.floor(Math.random() * 100),
  },
  {
    name: 'Invisibility Cloak',
    image: '/images/invisibility-cloak.jpg',
    description:
      'Cloak made of a special material that bends light around the wearer, making them invisible.',
    brand: 'NexGen Innovations',
    category: 'Clothing',
    price: Math.floor(Math.random() * 900) + 100,
    countInStock: Math.floor(Math.random() * 10),
    rating: Math.floor(Math.random() * 4) + 1,
    numReviews: Math.floor(Math.random() * 100),
  },
  {
    name: 'Mind-Reader Glasses',
    image: '/images/mrg.jpg',
    description:
      'Glasses that can scan the brainwaves of those around the wearer, allowing them to "read" the thoughts and emotions of others.',
    brand: 'Synthetix Solutions',
    category: 'Misc',
    price: Math.floor(Math.random() * 900) + 100,
    countInStock: Math.floor(Math.random() * 10),
    rating: Math.floor(Math.random() * 4) + 1,
    numReviews: Math.floor(Math.random() * 100),
  },
  {
    name: 'Hyper-Translation Earbuds',
    image: '/images/htext-earbuds.jpg',
    description:
      'earbuds that instantly translate any language into the wearer\'s native tongue, allowing them to understand and communicate with anyone regardless of language barriers.',
    brand: 'Quantum Dynamics',
    category: 'Electronics',
    price: Math.floor(Math.random() * 900) + 100,
    countInStock: Math.floor(Math.random() * 10),
    rating: Math.floor(Math.random() * 4) + 1,
    numReviews: Math.floor(Math.random() * 100),
  },
];

export default products;
