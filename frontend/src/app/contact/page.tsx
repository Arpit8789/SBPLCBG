import ApplicationForm from '@/components/ApplicationForm';

export default function ContactPage() {
  return (
    <div className="page-shell">
      <div className="page-header">
        <div className="grid-container">
          <h1 className="mb-6 font-['Outfit'] text-5xl font-bold text-white glow-text md:text-6xl">Start Your Fuel Business Today</h1>
          <p className="mx-auto max-w-3xl text-[18px] leading-[1.9] text-green-100/60 md:text-[20px]">
            Take the first step towards building your own multi-energy fuel empire. Fill out the application form below and our team will get in touch.
          </p>
        </div>
      </div>
      <ApplicationForm />
    </div>
  );
}
