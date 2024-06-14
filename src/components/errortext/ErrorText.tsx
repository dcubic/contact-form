import styles from "../../App.module.css";

interface ErrorTextProps {
  text: string;
  errorState: boolean;
}

function ErrorText({ text, errorState }: ErrorTextProps) {
  return errorState ? (
    <p className={`${styles.smallText} ${styles.errorColour}`}>{text}</p>
  ) : (
    <></>
  );
}

export default ErrorText;