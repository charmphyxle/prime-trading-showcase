/**
 * About Section Component
 * 
 * Company overview with humanized copy
 */

export const About = () => {
  return (
    <section id="about" className="py-12 md:py-16 lg:py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-6 md:mb-8 text-foreground gradient-text px-4">
            About Prime Trading PNG Limited
          </h2>
          
          <div className="space-y-4 md:space-y-6 text-base md:text-lg leading-relaxed text-muted-foreground px-4">
            <p className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
              Prime Trading PNG Limited is a Port Moresby-based trading company specializing in wholesale 
              and retail distribution of modular (container) housing solutions, jumbo bags, and spare parts 
              for heavy vehicles. We combine locally-aware service with reliable international supply chains 
              to deliver durable products built for PNG conditions.
            </p>
            
            <p className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
              Operating across Papua New Guinea, we understand the unique challenges of the region's terrain, 
              climate, and logistics. Our team works directly with mining operations, construction companies, 
              and government agencies to provide cost-effective solutions that arrive on time and perform 
              under demanding conditions.
            </p>
            
            <p className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
              Whether you need temporary workforce accommodation, bulk material handling systems, or critical 
              replacement parts for your fleet, Prime Trading PNG delivers quality products backed by local 
              expertise and responsive customer service.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
