
export interface BusinessImage {
    src: string;
    alt: string;
    category: string;
}

// High-quality, bright, "shiny" images from Unsplash (using source.unsplash.com or direct IDs for reliability)
export const businessImages: BusinessImage[] = [
    { category: 'Coffee', src: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=800&auto=format&fit=crop', alt: 'Bright Coffee Shop' },
    { category: 'Retail', src: 'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?q=80&w=800&auto=format&fit=crop', alt: 'Modern Retail Store' },
    { category: 'Clinic', src: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=800&auto=format&fit=crop', alt: 'Clean Medical Clinic' },
    { category: 'Salon', src: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=800&auto=format&fit=crop', alt: 'Luxury Salon' },
    { category: 'Restaurant', src: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=800&auto=format&fit=crop', alt: 'Bright Restaurant Interior' },
    { category: 'Gym', src: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?q=80&w=800&auto=format&fit=crop', alt: 'Sunny Gym' },
    { category: 'Office', src: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&auto=format&fit=crop', alt: 'Modern Office' },
];

export const industryQueues: Record<string, string[]> = {
    'Cafe': ['John D. (Latte)', 'Emily R. (Cappuccino)', 'Mike T. (Espresso)', 'Chloe S. (Iced Tea)'],
    'Retail': ['Maria K. (Returns)', 'Alex G. (Pickup)', 'Ben L. (Checkout)', 'Sarah P. (Support)'],
    'Clinic': ['David C. (Check-up)', 'Lisa M. (Follow-up)', 'Tom H. (New Patient)', 'Laura W. (Results)'],
    'Salon': ['Jessica B. (Haircut)', 'Kevin F. (Coloring)', 'Olivia P. (Styling)', 'Daniel R. (Wash)'],
    'Restaurant': ['The Smiths (Table for 4)', 'Anna V. (Takeout #102)', 'Chris P. (Reservation)', 'Group of 6'],
    'Gym': ['Mike (Bench Press)', 'Sarah (Treadmill)', 'Yoga Class Group', 'Personal Training'],
    'Default': ['Maria K.', 'Alex G.', 'Ben L.', 'Chloe T.'],
};
