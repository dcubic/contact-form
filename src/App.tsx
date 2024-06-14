import styles from "./App.module.css";
import AsteriskedText from "./components/askteriskedtext/AsteriskedText.tsx";
import ErrorText from "./components/errortext/ErrorText.tsx";

import { FormEvent, useState } from "react";
import EmailValidator from "email-validator";

interface ErrorState {
  firstName: boolean;
  lastName: boolean;
  emailAddress: boolean;
  queryType: boolean;
  message: boolean;
  consentStatus: boolean;
}

const initialErrorState: ErrorState = {
  firstName: false,
  lastName: false,
  emailAddress: false,
  queryType: false,
  message: false,
  consentStatus: false,
};

function App() {
  const [errorState, setErrorState] = useState<ErrorState>(initialErrorState);

  function getQueryType(selectedInputElement: string): string {
    if (selectedInputElement === "support-request-radio-input") {
      return "supportRequest";
    } else if (selectedInputElement === "general-enquiry-radio-input") {
      return "generalEnquiry";
    } else {
      return "ERROR";
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget as HTMLFormElement;
    const formData = new FormData(form);

    const firstName = formData.get("firstName")?.toString();
    const lastName = formData.get("lastName")?.toString();
    const emailAddress = formData.get("emailAddress")?.toString();
    const message = formData.get("message")?.toString();
    const selectedInputElement = Array.from(form.elements).find(
      (element): element is HTMLInputElement => {
        const inputElement = element as HTMLInputElement;
        return inputElement.name === "queryType" && inputElement.checked;
      }
    );
    const selectedQueryType = selectedInputElement
      ? getQueryType(selectedInputElement.id)
      : undefined;
    const consentStatus = formData.get("consentStatus")?.toString();

    const newErrorState: ErrorState = {
      firstName: isGenericError(firstName),
      lastName: isGenericError(lastName),
      emailAddress: isEmailAddressInvalid(emailAddress),
      queryType: isGenericError(selectedQueryType),
      message: isGenericError(message),
      consentStatus: isGenericError(consentStatus),
    };

    const hasErrors = Object.values(newErrorState).some(
      (isError) => isError === true
    );

    if (!hasErrors) {
      // TODO logic to display Modal
    }

    setErrorState(newErrorState);
  }

  function isGenericError(valueString: string | undefined) {
    return !valueString || valueString === "";
  }

  function isEmailAddressInvalid(emailAddress: string | undefined) {
    if (emailAddress === undefined) return true;
    return !EmailValidator.validate(emailAddress);
  }

  function handleInactiveLabelClick(event: React.MouseEvent<HTMLElement>) {
    event.preventDefault();
  }

  return (
    <div className={styles.appContainer}>
      <h1 className={styles.title}>Contact Us</h1>
      <form onSubmit={(event) => handleSubmit(event)} className={styles.form}>
        <div className={styles.alignmentContainer}>
          <div className={styles.inputBlock}>
            <label
              htmlFor="first-name-input"
              onClick={handleInactiveLabelClick}
            >
              <AsteriskedText text="First Name" />
            </label>
            <input
              id="first-name-input"
              name="firstName"
              className={`${styles.textInput} ${styles.smallText} ${
                errorState.firstName && styles.errorBorder
              }`}
            />
            <ErrorText
              text={"This field is required"}
              errorState={errorState.firstName}
            />
          </div>
          <div className={styles.inputBlock}>
            <label htmlFor="last-name-input" onClick={handleInactiveLabelClick}>
              <AsteriskedText text="Last Name" />
            </label>
            <input
              id="last-name-input"
              name="lastName"
              className={`${styles.textInput} ${styles.smallText} ${
                errorState.lastName && styles.errorBorder
              }`}
            />
            <ErrorText
              text={"This field is required"}
              errorState={errorState.lastName}
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
            className={`${styles.textInput} ${styles.smallText} ${
              errorState.emailAddress && styles.errorBorder
            }`}
          />
          <ErrorText
            text={"Please enter a valid email address"}
            errorState={errorState.emailAddress}
          />
        </div>
        <div className={styles.queryTypeContainer}>
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
          <ErrorText
            text={"Please select a query type"}
            errorState={errorState.queryType}
          />
        </div>
        <div>
          <label htmlFor="message-input" onClick={handleInactiveLabelClick}>
            <AsteriskedText text="Message" />
          </label>
          <textarea
            id="message-input"
            name="message"
            className={`${styles.textInput} ${styles.smallText} ${
              styles.textArea
            } ${errorState.message && styles.errorBorder}`}
          />
          <ErrorText
            text={"This field is required"}
            errorState={errorState.message}
          />
        </div>
        <div className={styles.consentContainer}>
          <div className={styles.validConsentContainer}>
            <input
              id="consent-checkbox"
              type="checkbox"
              name="consentStatus"
              className={styles.checkboxInput}
            />
            <label
              htmlFor="consent-checkbox"
              onClick={handleInactiveLabelClick}
              className={styles.consentLabel}
            >
              <AsteriskedText text="I consent to being contacted by the team" />
            </label>
          </div>
          <ErrorText
            text={"To submit this form, please consent to being contacted"}
            errorState={errorState.consentStatus}
          />
        </div>
        <button className={styles.button}>Submit</button>
      </form>
    </div>
  );
}

export default App;
