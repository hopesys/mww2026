'use client';

type SectionProps = {
  id?: string;
  className?: string;
  children: React.ReactNode;
};

export function Section({ id, className = '', children }: SectionProps) {
  return (
    <section
      id={id}
      className={`py-16 md:py-24 ${className}`}
    >
      <div className="container mx-auto max-w-6xl px-4">
        {children}
      </div>
    </section>
  );
}

