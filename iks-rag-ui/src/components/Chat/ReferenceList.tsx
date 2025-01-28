import { Reference } from '@/types/chat';

interface ReferenceListProps {
  references: Reference[];
  isUserMessage: boolean;
}

export default function ReferenceList({ references }: ReferenceListProps) {
  return (
    <div className="mt-2 text-sm">
      <p className="font-semibold text-gray-700">References:</p>
      <ul className="list-disc list-inside space-y-1">
        {references.map((ref, index) => (
          <li key={index} className="text-gray-600">
            <a 
              href={ref.link}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-600"
            >
              {ref.source}
              {ref.text && <span className="text-gray-500"> - {ref.text}</span>}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
} 