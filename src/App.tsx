import styles from "./App.module.css";
import AsteriskedText from "./components/askteriskedtext/AsteriskedText.tsx";

import { FormEvent } from 'react';

function App() {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget as HTMLFormElement;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    console.log(data);
  }

  function handleInactiveLabelClick(event: React.MouseEvent<HTMLElement>) {
    event.preventDefault();
  }

  return (
    <div className={styles.appContainer}>
      <h1 className={styles.title}>Contact Us</h1>
      <form onSubmit={event => handleSubmit(event)} className={styles.form}>
        <div className={styles.alignmentContainer}>
          <div>
            <label
              htmlFor="first-name-input"
              onClick={handleInactiveLabelClick}
            >
              <AsteriskedText text="First Name" />
            </label>
            <input
              id="first-name-input"
              name="firstName"
              className={`${styles.textInput} ${styles.smallText}`}
            />
          </div>
          <div>
            <label htmlFor="last-name-input" onClick={handleInactiveLabelClick}>
              <AsteriskedText text="Last Name" />
            </label>
            <input
              id="last-name-input"
              name="lastName"
              className={`${styles.textInput} ${styles.smallText}`}
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="email-address-input"
            onClick={handleInactiveLabelClick}
          >
            <AsteriskedText text="Email Address" />
          </label>
          <input
            id="email-address-input"
            name="emailAddress"
            className={`${styles.textInput} ${styles.smallText}`}
          />
        </div>
        <div>
          <AsteriskedText text="Query Type" />
          <div className={styles.alignmentContainer}>
            <label
              htmlFor="general-enquiry-radio-input"
              className={styles.radioInputLabel}
            >
              <input
                id="general-enquiry-radio-input"
                type="radio"
                name="queryType"
                className={styles.radioInput}
              />
              General Enquiry
            </label>
            <label
              htmlFor="support-request-radio-input"
              className={styles.radioInputLabel}
            >
              <input
                id="support-request-radio-input"
                type="radio"
                name="queryType"
                className={styles.radioInput}
              />
              Support Request
            </label>
          </div>
        </div>
        <div>
          <label htmlFor="message-input" onClick={handleInactiveLabelClick}>
            <AsteriskedText text="Message" />
          </label>
          <textarea
            id="message-input"
            name="message"
            className={`${styles.textInput} ${styles.smallText} ${styles.textArea}`}
          />
        </div>
        <div className={styles.consentContainer}>
          <input
            id="consent-checkbox"
            type="checkbox"
            name="consentStatus"
            className={styles.checkboxInput}
          />
          <label htmlFor="consent-checkbox" onClick={handleInactiveLabelClick} className={styles.consentLabel}>
            <AsteriskedText text="I consent to being contacted by the team" />
          </label>
        </div>
        <button className={styles.button}>Submit</button>
      </form>
    </div>
  );
}

export default App;