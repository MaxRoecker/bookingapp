import type { Property } from '../typings';

export const nil: Property = {
  id: '',
  name: '',
  description: '',
  value: 0,
  rating: 0,
  offsetDays: 0,
  thumbnail: '',
  images: [],
};

export const peninsulaCottage: Property = {
  id: 'peninsula-cottage',
  name: 'Peninsula Cottage',
  description: `Relax in this unique and peaceful place. A huge plot of land surrounded by water, excellent for walks, picnics, reading in a hammock and connecting with nature. Nearby you will find waterfalls, restaurants, boat trips, kayaking, pedal boats and a path suitable for cycling.`,
  value: 54000,
  rating: 500,
  offsetDays: 1,
  thumbnail: 'https://picsum.photos/id/49/800/600',
  images: [
    'https://picsum.photos/id/49/800/600',
    'https://picsum.photos/id/37/800/600',
    'https://picsum.photos/id/76/800/600',
  ],
};

export const oceanHouse: Property = {
  id: 'ocean-house',
  name: 'Ocean House',
  description: `We are in a privileged location, when you open the window, you will have the beauty of the sea and still surrounded by the Atlantic forest, enjoying the sunset from the balcony. The house is prepared to welcome you with the feel of a guesthouse, including bed linen and bath towels.`,
  value: 36000,
  rating: 487,
  offsetDays: 1,
  thumbnail: 'https://picsum.photos/id/74/800/600',
  images: [
    'https://picsum.photos/id/74/800/600',
    'https://picsum.photos/id/12/800/600',
    'https://picsum.photos/id/77/800/600',
  ],
};

export const sierraCabin: Property = {
  id: 'sierra-cabin',
  name: 'Sierra Cabin',
  description: `Mixing country style, with a contemporary, traditional and updated look and a rustic/modern touch, replicating the aesthetics and architecture of Patagonian log cabins, we designed and built our loft cabin.`,
  value: 45000,
  rating: 495,
  offsetDays: 2,
  thumbnail: 'https://picsum.photos/id/118/800/600',
  images: [
    'https://picsum.photos/id/118/800/600',
    'https://picsum.photos/id/29/800/600',
    'https://picsum.photos/id/66/800/600',
  ],
};

export const treeNook: Property = {
  id: 'tree-nook',
  name: 'Tree Nook',
  description: `The experience of living moments in a house high in the trees is indescribable! We believe that nature is our home and with a lot of love and care for it, we want to offer our guests this same energy.`,
  value: 64000,
  rating: 500,
  offsetDays: 3,
  thumbnail: 'https://picsum.photos/id/424/800/600',
  images: [
    'https://picsum.photos/id/424/800/600',
    'https://picsum.photos/id/28/800/600',
    'https://picsum.photos/id/229/800/600',
  ],
};

export const metropolisStudio: Property = {
  id: 'metropolis-studio',
  name: 'Metropolis Studio',
  description: `Studio with high standard decoration designed for short or long stays. Perfect for couples, people traveling alone for leisure/work.`,
  value: 33000,
  rating: 491,
  offsetDays: 1,
  thumbnail: 'https://picsum.photos/id/249/800/600',
  images: [
    'https://picsum.photos/id/249/800/600',
    'https://picsum.photos/id/238/800/600',
    'https://picsum.photos/id/43/800/600',
    'https://picsum.photos/id/84/800/600',
  ],
};

export const propertyById = new Map<Property['id'], Property>([
  [peninsulaCottage.id, peninsulaCottage],
  [oceanHouse.id, oceanHouse],
  [sierraCabin.id, sierraCabin],
  [treeNook.id, treeNook],
  [metropolisStudio.id, metropolisStudio],
]);
