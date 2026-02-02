import { RestaurantMenuProps } from './component';

export const previewData: RestaurantMenuProps = {
  title: 'Our Menu',
  subtitle: 'Authentic Italian cuisine crafted with fresh, locally-sourced ingredients',
  categories: [
    {
      category: 'Appetizers',
      description: 'Start your meal with these delicious small plates',
      items: [
        {
          name: 'Bruschetta',
          description: 'Toasted bread topped with fresh tomatoes, garlic, basil, and olive oil',
          price: '$12',
          vegetarian: true,
          popular: true
        },
        {
          name: 'Calamari Fritti',
          description: 'Crispy fried squid served with marinara sauce and lemon',
          price: '$16',
          spicy: true
        },
        {
          name: 'Caprese Salad',
          description: 'Fresh mozzarella, tomatoes, and basil drizzled with balsamic glaze',
          price: '$14',
          vegetarian: true
        },
        {
          name: 'Arancini',
          description: 'Sicilian rice balls filled with cheese and peas, deep-fried to perfection',
          price: '$13',
          vegetarian: true
        }
      ]
    },
    {
      category: 'Main Courses',
      description: 'Hearty dishes made with traditional recipes',
      items: [
        {
          name: 'Spaghetti Carbonara',
          description: 'Classic Roman pasta with eggs, pecorino cheese, and guanciale',
          price: '$22',
          popular: true
        },
        {
          name: 'Margherita Pizza',
          description: 'San Marzano tomatoes, fresh mozzarella, basil, and extra virgin olive oil',
          price: '$18',
          vegetarian: true,
          popular: true
        },
        {
          name: 'Osso Buco',
          description: 'Braised veal shanks with vegetables, white wine, and broth',
          price: '$34'
        },
        {
          name: 'Penne Arrabbiata',
          description: 'Penne pasta in a spicy tomato sauce with garlic and red chilies',
          price: '$19',
          vegetarian: true,
          spicy: true
        }
      ]
    }
  ]
};
