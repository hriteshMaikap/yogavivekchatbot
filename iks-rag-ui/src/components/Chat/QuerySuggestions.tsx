"use client";

interface QuerySuggestionsProps {
  suggestions: string[];
  predictedQuery?: string;
  onSelect: (query: string) => void;
}

export default function QuerySuggestions({ 
  suggestions, 
  predictedQuery, 
  onSelect 
}: QuerySuggestionsProps) {
  if (!suggestions.length && !predictedQuery) return null;

  return (
    <div className="space-y-2">
      {predictedQuery && (
        <div className="text-sm">
          <span className="text-muted-foreground">Did you mean: </span>
          <button
            onClick={() => onSelect(predictedQuery)}
            className="text-primary hover:underline"
          >
            {predictedQuery}
          </button>
        </div>
      )}
      {suggestions.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => onSelect(suggestion)}
              className="px-3 py-1.5 text-sm bg-muted text-foreground rounded-lg hover:bg-muted/70 transition-colors"
            >
              {suggestion}
            </button>
          ))}
        </div>
      )}
    </div>
  );
} 