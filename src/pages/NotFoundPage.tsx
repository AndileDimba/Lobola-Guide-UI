import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="flex-1 bg-paper font-reading text-lg leading-[1.65] text-ink lg:text-xl lg:leading-[1.7]">
      <div className="mx-auto max-w-[1120px] px-5 pb-16 pt-12 lg:px-8 lg:pb-24 lg:pt-20">
        <div className="max-w-[660px]">
          <p className="mb-3 text-[13px] font-medium uppercase leading-snug tracking-[0.16em] text-clay lg:mb-4">
            Page not found
          </p>
          <h1 className="font-display text-[2.75rem] font-semibold leading-[1.05] tracking-[-0.01em] lg:text-[4rem]">
            This page is not here
          </h1>
          <p className="mt-5 text-[1.3125rem] leading-[1.55] lg:mt-6 lg:text-2xl">
            We couldn't find the page you're looking for. It might have been moved or doesn't exist.
          </p>
          <div className="mt-8 flex flex-col gap-1 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-8 sm:gap-y-3">
            <Link
              to="/"
              className="inline-flex min-h-[52px] items-center justify-center bg-clay px-7 text-lg font-medium text-paper transition-colors hover:bg-clay-dark"
            >
              Return home
            </Link>
            <Link
              to="/guide/zulu"
              className="py-3 text-center text-lg underline decoration-1 underline-offset-[6px] hover:decoration-2"
            >
              Start the Zulu guide
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
