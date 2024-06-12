import styles from "./LabelText.module.css";

interface AsteriskedTextProps {
  text: string;
}

function AsteriskedText({ text }: AsteriskedTextProps) {
  return (
    <p>
      {text} <span className={styles.asterisk}>*</span>
    </p>
  );
}

export default AsteriskedText;
