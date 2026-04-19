import { Star } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Sarah MacLeod',
    role: 'Food Blogger',
    quote: 'The best cappuccino I&apos;ve had outside of Rome. Café Zecchino brings authentic Italian craftsmanship to Glasgow.',
    rating: 5,
    image: '👩‍💼',
  },
  {
    id: 2,
    name: 'James Robertson',
    role: 'Regular Customer',
    quote: 'Perfect spot for morning coffee or an afternoon break. The atmosphere is warm, the staff is lovely, and the pastries are divine.',
    rating: 5,
    image: '👨‍💼',
  },
  {
    id: 3,
    name: 'Emma Gonzalez',
    role: 'Business Owner',
    quote: 'I bring all my important meetings here. The intimate ambiance and exceptional service make every visit memorable.',
    rating: 5,
    image: '👩‍🔬',
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-accent text-sm font-medium tracking-wide mb-4">WHAT CUSTOMERS SAY</p>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">
            Loved by Glasgow
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Join thousands of customers who have experienced the magic of Café Zecchino
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-card rounded-2xl p-8 border border-border hover:border-primary hover:shadow-lg transition-all duration-300"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array(testimonial.rating)
                  .fill(0)
                  .map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                  ))}
              </div>

              {/* Quote */}
              <p className="text-foreground text-lg font-serif mb-6 italic">
                "{testimonial.quote}"
              </p>

              {/* Author */}
              <div className="border-t border-border pt-6">
                <div className="flex items-center gap-4">
                  <div className="text-4xl">{testimonial.image}</div>
                  <div>
                    <p className="font-semibold text-foreground">{testimonial.name}</p>
                    <p className="text-muted-foreground text-sm">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Badges */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 pt-12 border-t border-border">
          <div className="text-center">
            <p className="text-3xl font-serif font-bold text-primary mb-2">4.9★</p>
            <p className="text-muted-foreground text-sm">Google Reviews</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-serif font-bold text-primary mb-2">2.5K+</p>
            <p className="text-muted-foreground text-sm">Reviews</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-serif font-bold text-primary mb-2">15+</p>
            <p className="text-muted-foreground text-sm">Years Operating</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-serif font-bold text-primary mb-2">100%</p>
            <p className="text-muted-foreground text-sm">Customer Satisfaction</p>
          </div>
        </div>
      </div>
    </section>
  );
}
