import { useEffect, useState, useCallback } from "react";

type UseTypingEffectProps = {
  words: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  delay?: number;
};

const useTypingEffect = ({
  words,
  typingSpeed = 100,
  deletingSpeed = 100,
  delay = 1800,
}: UseTypingEffectProps): string => {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);
  const [text, setText] = useState("");

  useEffect(() => {
    if (words.length === 0) return;

    const currentWord = words[index];

    // Typing phase
    if (!reverse && subIndex <= currentWord.length) {
      const timeout = setTimeout(() => {
        setText(currentWord.substring(0, subIndex));
        setSubIndex((prev) => prev + 1);
      }, typingSpeed);

      return () => clearTimeout(timeout);
    }

    // Delay before deleting phase
    if (!reverse && subIndex > currentWord.length) {
      const timeout = setTimeout(() => {
        setReverse(true);
      }, delay);

      return () => clearTimeout(timeout);
    }

    // Deleting phase
    if (reverse && subIndex >= 0) {
      const timeout = setTimeout(() => {
        setText(currentWord.substring(0, subIndex));
        setSubIndex((prev) => prev - 1);
      }, deletingSpeed);

      return () => clearTimeout(timeout);
    }

    // Move to the next word after deleting is complete
    if (reverse && subIndex < 0) {
      setReverse(false);
      setIndex((prev) => (prev + 1) % words.length);
      setSubIndex(0);
    }
  }, [subIndex, index, reverse, words, typingSpeed, deletingSpeed, delay]);

  return text;
};

export default useTypingEffect;
