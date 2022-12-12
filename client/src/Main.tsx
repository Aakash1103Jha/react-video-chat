import { useState, type FC } from "react";
import { useAppContext } from "./context/AppContext";

const Main: FC = () => {
	const { myVideo, userVideo, callUser, answerCall, stream, callAccepted, callEnded, receivingCall, meId } =
		useAppContext();
	const [val, setVal] = useState("");

	return (
		<main>
			<div>
				{stream && (
					<video
						style={{ background: "var(--smoke)", border: "1px solid black", width: "300px" }}
						playsInline
						muted
						autoPlay
						ref={myVideo}></video>
				)}
				{callAccepted && !callEnded ? (
					<video
						style={{ background: "var(--smoke)", border: "1px solid black", width: "300px" }}
						playsInline
						autoPlay
						ref={userVideo}></video>
				) : null}
			</div>
			<div>
				<p>{meId}</p>
				<input
					onChange={(e) => {
						setVal(e.target.value);
					}}
					value={val}
				/>
				<button onClick={() => callUser(val)}>CALL</button>
				{receivingCall && <button onClick={answerCall}>ANSWER</button>}
			</div>
		</main>
	);
};

export default Main;
