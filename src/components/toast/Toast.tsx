/// <reference types="vite-plugin-svgr/client" />

import { createPortal } from "react-dom";
import styles from "./Toast.module.css";
import { useState, useEffect } from "react";
import SuccessIcon from '../../assets/images/icon-success-check.svg?react'

interface ToastProps {
  displaySignal: boolean;
}

const displayTime = 1500;

function Toast({ displaySignal }: ToastProps) {
  const [shouldDisplay, setShouldDisplay] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    if (!hasMounted) {
        setHasMounted(true);
    } else {
        setShouldDisplay(true);
        const timer = setTimeout(() => {
            setShouldDisplay(false);
        }, displayTime);

        return () => {
            clearTimeout(timer);
        }
    }
  }, [displaySignal]);

  const toastContainer = document.getElementById("toast");
  if (!toastContainer) return null;

  return createPortal(<div className={`${styles.toastContainer} ${shouldDisplay && styles.displayed}`}>
    <div className={styles.headerContainer}>
        <SuccessIcon />
        <h2 className={styles.header}>Message Sent!</h2>
    </div>
    <p className={styles.text}>Thanks for completing the form. We'll be in touch soon!</p>
  </div>, toastContainer);
}

export default Toast;
