import styles from "./AskteriskedText.module.css";

interface AsteriskedTextProps {
  text: string;
}

function AsteriskedText({ text }: AsteriskedTextProps) {
  return (
    <p className={styles.text}>
      {text} <span className={styles.asterisk}>*</span>
    </p>
  );
}

export default AsteriskedText;
