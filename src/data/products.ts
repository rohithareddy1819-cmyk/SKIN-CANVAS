export interface ProductData {
  id: number;
  name: string;
  brand: string;
  category: string;
  matchScore: number;
  price: number;
  originalPrice: number;
  rating: number;
  reviews: number;
  size: string;
  image: string;
  keyIngredients: string[];
  matchReasons: string[];
  attributes: {
    hydration: string;
    texture: string;
    sensitivity: string;
  };
  retailers: {
    name: string;
    price: number;
    logo: string;
  }[];
}

export const products: ProductData[] = [
  {
    id: 1,
    name: 'Hydrating Serum',
    brand: 'Aqualis',
    category: 'Serums',
    matchScore: 94,
    price: 899,
    originalPrice: 1099,
    rating: 4.7,
    reviews: 2847,
    size: '50ml',
    image: 'https://images.pexels.com/photos/8101534/pexels-photo-8101534.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    keyIngredients: ['Hyaluronic Acid', 'Glycerin', 'Panthenol'],
    matchReasons: ['Hydration support', 'Lightweight texture', 'Suitable for sensitive skin', 'Fits your routine'],
    attributes: { hydration: 'Excellent', texture: 'Light', sensitivity: 'Low' },
    retailers: [
      { name: 'Nykaa', price: 899, logo: 'Nykaa' },
      { name: 'Amazon', price: 949, logo: 'Amazon' },
      { name: 'Brand Website', price: 1099, logo: 'Brand' },
      { name: 'Sephora', price: 1149, logo: 'Sephora' },
    ],
  },
  {
    id: 2,
    name: 'Nourishing Serum',
    brand: 'Floreum',
    category: 'Serums',
    matchScore: 91,
    price: 749,
    originalPrice: 899,
    rating: 4.6,
    reviews: 1953,
    size: '40ml',
    image: 'https://images.pexels.com/photos/29675492/pexels-photo-29675492.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    keyIngredients: ['Niacinamide', 'Squalane', 'Ceramides'],
    matchReasons: ['Barrier support', 'Medium texture', 'Good for combination skin'],
    attributes: { hydration: 'Good', texture: 'Medium', sensitivity: 'Low' },
    retailers: [
      { name: 'Nykaa', price: 749, logo: 'Nykaa' },
      { name: 'Amazon', price: 799, logo: 'Amazon' },
      { name: 'Brand Website', price: 849, logo: 'Brand' },
      { name: 'Sephora', price: 899, logo: 'Sephora' },
    ],
  },
  {
    id: 3,
    name: 'Radiance Serum',
    brand: 'Ovelle',
    category: 'Serums',
    matchScore: 87,
    price: 999,
    originalPrice: 1299,
    rating: 4.5,
    reviews: 3201,
    size: '50ml',
    image: 'https://images.pexels.com/photos/27357181/pexels-photo-27357181.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    keyIngredients: ['Vitamin C', 'Ferulic Acid', 'Peptides'],
    matchReasons: ['Tone improvement', 'Light texture', 'Antioxidant support'],
    attributes: { hydration: 'Good', texture: 'Light', sensitivity: 'Medium' },
    retailers: [
      { name: 'Nykaa', price: 999, logo: 'Nykaa' },
      { name: 'Amazon', price: 1049, logo: 'Amazon' },
      { name: 'Brand Website', price: 1299, logo: 'Brand' },
      { name: 'Sephora', price: 1149, logo: 'Sephora' },
    ],
  },
  {
    id: 4,
    name: 'Gentle Gel Cleanser',
    brand: 'Aqualis',
    category: 'Cleansers',
    matchScore: 89,
    price: 549,
    originalPrice: 699,
    rating: 4.5,
    reviews: 4120,
    size: '150ml',
    image: 'https://images.pexels.com/photos/16378446/pexels-photo-16378446.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    keyIngredients: ['Amino Acids', 'Aloe Vera', 'Chamomile'],
    matchReasons: ['Gentle cleansing', 'pH-balanced', 'Non-stripping'],
    attributes: { hydration: 'Good', texture: 'Light', sensitivity: 'Low' },
    retailers: [
      { name: 'Nykaa', price: 549, logo: 'Nykaa' },
      { name: 'Amazon', price: 599, logo: 'Amazon' },
      { name: 'Brand Website', price: 699, logo: 'Brand' },
      { name: 'Sephora', price: 649, logo: 'Sephora' },
    ],
  },
  {
    id: 5,
    name: 'Barrier Repair Cream',
    brand: 'Floreum',
    category: 'Moisturizers',
    matchScore: 92,
    price: 1199,
    originalPrice: 1499,
    rating: 4.8,
    reviews: 1856,
    size: '50ml',
    image: 'https://images.pexels.com/photos/4173450/pexels-photo-4173450.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    keyIngredients: ['Ceramides', 'Cholesterol', 'Fatty Acids'],
    matchReasons: ['Barrier support', 'Rich texture', 'Long-lasting hydration'],
    attributes: { hydration: 'Excellent', texture: 'Rich', sensitivity: 'Low' },
    retailers: [
      { name: 'Nykaa', price: 1199, logo: 'Nykaa' },
      { name: 'Amazon', price: 1249, logo: 'Amazon' },
      { name: 'Brand Website', price: 1499, logo: 'Brand' },
      { name: 'Sephora', price: 1349, logo: 'Sephora' },
    ],
  },
  {
    id: 6,
    name: 'Mineral Shield SPF 50',
    brand: 'Ovelle',
    category: 'Sunscreens',
    matchScore: 88,
    price: 699,
    originalPrice: 849,
    rating: 4.4,
    reviews: 5672,
    size: '50ml',
    image: 'https://images.pexels.com/photos/32110926/pexels-photo-32110926.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    keyIngredients: ['Zinc Oxide', 'Green Tea', 'Vitamin E'],
    matchReasons: ['Broad spectrum', 'No white cast', 'Suitable for sensitive skin'],
    attributes: { hydration: 'Good', texture: 'Light', sensitivity: 'Low' },
    retailers: [
      { name: 'Nykaa', price: 699, logo: 'Nykaa' },
      { name: 'Amazon', price: 749, logo: 'Amazon' },
      { name: 'Brand Website', price: 849, logo: 'Brand' },
      { name: 'Sephora', price: 799, logo: 'Sephora' },
    ],
  },
];

export interface SkinMetric {
  label: string;
  value: number;
  max: number;
  unit?: string;
}

export const skinMetrics: SkinMetric[] = [
  { label: 'Hydration', value: 78, max: 100 },
  { label: 'Texture', value: 71, max: 100 },
  { label: 'Tone', value: 64, max: 100 },
];

export const skinTags = ['Combination', 'Dehydrated', 'Sensitive'];

export const skinPriorities = [
  { rank: 1, text: 'Improve hydration' },
  { rank: 2, text: 'Support the skin barrier' },
  { rank: 3, text: 'Improve texture' },
];

export interface SkinAvoidance {
  item: string;
  reason: string;
  badge: string;
}

export const skinAvoidances: SkinAvoidance[] = [
  {
    item: 'Harsh Sulfates & Stripping Alcohols',
    reason: 'Depletes protective natural lipids, worsening dehydration and moisture loss.',
    badge: 'Barrier Stress',
  },
  {
    item: 'Synthetic Fragrances & Dyes',
    reason: 'High potential for triggering reactive flare-ups, redness, and micro-irritation.',
    badge: 'Sensitivity Risk',
  },
  {
    item: 'Abrasive Physical Scrubs',
    reason: 'Can cause micro-tears on sensitive skin and compromise textural uniformity.',
    badge: 'Micro-Tears',
  },
];

export interface RoutineStep {
  step: string;
  productType: string;
  reason: string;
}

export interface Routine {
  period: string;
  steps: RoutineStep[];
}

export const routines: Routine[] = [
  {
    period: 'Morning',
    steps: [
      { step: 'Cleanse', productType: 'Gentle Gel Cleanser', reason: 'Start with a clean base without stripping your skin\'s natural oils.' },
      { step: 'Hydrate', productType: 'Hydrating Serum', reason: 'Your analysis suggests hydration is one of your current priorities.' },
      { step: 'Protect', productType: 'Mineral Shield SPF 50', reason: 'Daily sun protection supports skin health and prevents further damage.' },
    ],
  },
  {
    period: 'Evening',
    steps: [
      { step: 'Cleanse', productType: 'Gentle Gel Cleanser', reason: 'Remove the day\'s buildup gently, preserving your skin barrier.' },
      { step: 'Treat', productType: 'Nourishing Serum', reason: 'Overnight barrier support with ceramides tailored to your profile.' },
      { step: 'Repair', productType: 'Barrier Repair Cream', reason: 'Seal in moisture and support overnight recovery.' },
    ],
  },
];

export interface ChartPoint {
  label: string;
  value: number;
}

export const hydrationTrend: ChartPoint[] = [
  { label: 'Day 1', value: 58 },
  { label: 'Day 7', value: 62 },
  { label: 'Day 14', value: 67 },
  { label: 'Day 21', value: 72 },
  { label: 'Day 28', value: 75 },
  { label: 'Day 35', value: 77 },
  { label: 'Day 42', value: 82 },
];

export const textureTrend: ChartPoint[] = [
  { label: 'Day 1', value: 55 },
  { label: 'Day 7', value: 58 },
  { label: 'Day 14', value: 62 },
  { label: 'Day 21', value: 65 },
  { label: 'Day 28', value: 68 },
  { label: 'Day 35', value: 70 },
  { label: 'Day 42', value: 74 },
];
