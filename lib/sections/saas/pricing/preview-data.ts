import { SaasPricingProps } from './component';

export const previewData: SaasPricingProps = {
  title: 'Choose Your Plan',
  subtitle: 'Start free and scale as you grow. All plans include our core features.',
  tiers: [
    {
      name: 'Starter',
      price: '$0',
      description: 'Perfect for trying out our platform',
      features: [
        'Up to 3 projects',
        'Basic analytics',
        'Community support',
        '1 GB storage',
        'Email notifications'
      ],
      cta: 'Get Started',
      ctaLink: '#signup'
    },
    {
      name: 'Pro',
      price: '$29',
      description: 'Best for growing teams',
      features: [
        'Unlimited projects',
        'Advanced analytics',
        'Priority support',
        '100 GB storage',
        'Custom integrations',
        'Team collaboration',
        'API access'
      ],
      cta: 'Start Free Trial',
      ctaLink: '#signup',
      popular: true
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      description: 'For large-scale operations',
      features: [
        'Everything in Pro',
        'Dedicated support',
        'Unlimited storage',
        'SLA guarantee',
        'Advanced security',
        'Custom contracts',
        'On-premise option'
      ],
      cta: 'Contact Sales',
      ctaLink: '#contact'
    }
  ]
};
