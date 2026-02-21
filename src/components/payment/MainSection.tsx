import ConstrainedBox from "@/components/core/constrained-box";
import ResponsiveBox from "@/components/core/ResponsiveBox";

const PaymentMainSection = () => {
  return (
    <ResponsiveBox
      classNames="dark:bg-[var(--bgColor)] bg-[var(--bgColor)] dark:bg-grid-white/[0.1] bg-grid-white/[0.1] min-h-screen items-center justify-center relative overflow-hidden rounded-md"
      id="payment"
    >
      <ConstrainedBox classNames="px-4 py-8 z-20 items-center justify-center">
        <p className="text-center text-2xl lg:text-3xl font-semibold mt-4 max-w-screen-md">
          Thank you for choosing me to work on your project - I appreciate your
          trust and partnership!
        </p>
        <p className="text-center text-base mt-4 mb-8 max-w-screen-md">
          Securely pay for your website, mobile app, or backend API development
          project. I specialize in creating high-quality, customized solutions
          tailored to your needs.
        </p>

        <div className="mt-8">
          <p className="text-center text-sm mb-4">
            Have questions about payment? Contact me on WhatsApp:
          </p>
          <a
            href="https://wa.me/8801641151403?text=Hi, I would like to know more about your services and payment options."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#25D366] hover:bg-[#20ba5a] text-white font-semibold rounded-lg transition-colors"
          >
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-4.869 1.36c-1.396.766-2.612 1.996-3.465 3.51C3.258 10.902 3 12.47 3 12.474c0 .033.005 1.13.007 2.85.002 1.72-.002 2.8.008 2.827.009.027.033.053.06.053.027 0 1.107.004 2.827.002 1.72-.002 2.8.002 2.827-.008.027-.009.053-.033.053-.06v-.004c.002-.033.246-1.603 1.096-3.119.851-1.517 2.077-2.745 3.473-3.511A9.885 9.885 0 0121.5 12.474c0-.033-.246-1.603-1.096-3.119C19.553 7.838 18.327 6.61 16.93 5.843a9.965 9.965 0 00-4.859-1.364Z" />
            </svg>
            Contact on WhatsApp
          </a>
        </div>
      </ConstrainedBox>
    </ResponsiveBox>
  );
};

export default PaymentMainSection;
