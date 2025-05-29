'use client';
import { FaTelegramPlane } from 'react-icons/fa';
import { FaWhatsapp } from 'react-icons/fa';
import { FaFacebookF } from 'react-icons/fa';
import { FaTwitter } from 'react-icons/fa';

interface Props {
  title: string;
  url: string;
}

export default function ShareButtons({ title, url }: Props) {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(`امتحان کن: ${title}`);

  return (
    <div className="mt-8 space-y-2">
      <p className="font-semibold text-gray-700 dark:text-gray-300">اشتراک‌گذاری در شبکه‌های اجتماعی:</p>
      <div className="flex gap-4 text-2xl">
        <a
          href={`https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:text-blue-600"
        >
          <FaTelegramPlane />
        </a>
        <a
          href={`https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-green-500 hover:text-green-600"
        >
          <FaWhatsapp />
        </a>
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-800 hover:text-blue-900"
        >
          <FaFacebookF />
        </a>
        <a
          href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sky-500 hover:text-sky-600"
        >
          <FaTwitter />
        </a>
      </div>
    </div>
  );
}
