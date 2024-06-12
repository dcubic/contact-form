import styles from "./App.module.css";
import AsteriskedText from "./components/labeltext/LabelText.tsx";

function App() {
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  function handleInactiveLabelClick(event: React.MouseEvent<HTMLElement>) {
    event.preventDefault();
  }

  return (
    <div className={styles.appContainer}>
      <h1>Contact Us</h1>
      <form onSubmit={handleSubmit}>
        <div className={styles.alignmentContainer}>
          <div>
            <label htmlFor="first-name-input" onClick={handleInactiveLabelClick}>
              <AsteriskedText text="First Name" />
            </label>
            <input id="first-name-input" className={styles.textInput}/>
          </div>
          <div>
            <label htmlFor="last-name-input" onClick={handleInactiveLabelClick}>
              <AsteriskedText text="Last Name" />
            </label>
            <input id="last-name-input" />
          </div>
        </div>
        <div>
          <label htmlFor="email-address-input" onClick={handleInactiveLabelClick}>
            <AsteriskedText text="Email Address" />
          </label>
          <input id="email-address-input" />
        </div>
        <div>
          <AsteriskedText text="Query Type" />
          <div className={styles.alignmentContainer}>
            <label htmlFor="general-enquiry-radio-input">
              <input
                id="general-enquiry-radio-input"
                type="radio"
                name="query-type"
              />
              General Enquiry
            </label>
            <label htmlFor="support-request-radio-input">
              <input
                id="support-request-radio-input"
                type="radio"
                name="query-type"
              />
              Support Request
            </label>
          </div>
        </div>
        <div>
          <label htmlFor="message-input" onClick={handleInactiveLabelClick}>
            <AsteriskedText text="Message" />
          </label>
          <input id="message-input" />
        </div>
        <div>
          <input id="consent-checkbox" type="checkbox" />
          <label htmlFor="consent-checkbox" onClick={handleInactiveLabelClick}>
            <AsteriskedText text="I consent to being contacted by the team" />
          </label>
        </div>
        <button>Submit</button>
      </form>
    </div>
  );
}

export default App;
