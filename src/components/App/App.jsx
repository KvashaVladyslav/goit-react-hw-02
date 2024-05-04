import Description from "../Description/Description"
import Options from "../Options/Options"
import Feedback from "../Feedback/Feedback"
import Notification from "../Notification/Notification"
import { useEffect, useState } from "react"

export default function App() {

    const [feedback, setFeedback] = useState(() => {
        const localStorageData = localStorage.getItem("feedback")
        if (localStorageData !== null) {
            return JSON.parse(localStorageData)
        }
        return ({
            good: 0,
            neutral: 0,
            bad: 0
    })
    });

    const updateFeedback = (feedbackType) => {
        setFeedback((feedback) => ({
            ...feedback, [feedbackType]: feedback[feedbackType] + 1
        }))
    };

    const handleReset = () => setFeedback({ good: 0, neutral: 0, bad: 0 });
    const totalFeedback = feedback.good + feedback.neutral + feedback.bad;
    const positiveFeedback = Math.round((feedback.good / totalFeedback) * 100);

    useEffect(() => {
        localStorage.setItem("feedback", JSON.stringify(feedback))
    }, [feedback]
    );

    return (
        <div>
            <Description />
            <Options updateFeedback={updateFeedback} handleReset={handleReset} totalFeedback={totalFeedback}/>
            {totalFeedback !== 0 ? <Feedback feedback={feedback} positiveFeedback={positiveFeedback} totalFeedback={totalFeedback} />  : <Notification />}
        </div>
    )
}