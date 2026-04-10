import React from "react";
import '../styles/components/StepsControl.css';

export const StepsControl = ({ stepsQuantity, setStep, step }) => {
    return (
        <div className="steps">
            {
                Array.from({ length: stepsQuantity }, (_, index) =>
                (
                    <div key={index} className={`circle ${step == index ? "active" : ""}`}
                    onClick={() => setStep(index)}>
                    </div>)
                )
            }
        </div>
    );
}