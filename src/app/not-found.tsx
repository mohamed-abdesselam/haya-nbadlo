// import NullData from "@/components/nullData";
import dynamic from 'next/dynamic';

const NullData = dynamic(() => import('@/components/nullData'), {
  ssr: false, // Disable server-side rendering for this component
});

export default function NotFound() {
  return (
    <html>
      <body>
        <NullData msg="Something went wrong!" />
      </body>
    </html>
  );
}
