import { type FC, ComponentPropsWithRef, useContext, createContext, useEffect, useState, useRef } from "react";
import { connect } from "socket.io-client";
import Peer from "simple-peer";

import { AppContextType } from "../interfaces/AppContextType";
import { EVENTS } from "../config/events";

const socket = connect("http://192.168.1.4:4003");

const AppContext = createContext<AppContextType>({
	stream: undefined,
	socket: socket,
	myVideo: undefined,
	userVideo: undefined,
	connectionRef: undefined,
	callAccepted: false,
	receivingCall: false,
	callEnded: false,
	meId: "",

	callUser: (id: string) => {},
	answerCall: () => {},
	leaveCall: () => {},
});

export const useAppContext = () => useContext(AppContext);

export const AppProvider: FC<ComponentPropsWithRef<"main">> = ({ children }) => {
	const [stream, setStream] = useState<MediaStream | undefined>();
	const [meId, setMeId] = useState("");
	const [receivingCall, setReceivingCall] = useState(false);
	const [caller, setCaller] = useState("");
	const [name, setName] = useState("");
	const [callerSignal, setCAllerSignal] = useState<any>();
	const [callAccepted, setCallAccepted] = useState(false);
	const [callEnded, setCallEnded] = useState(false);

	const myVideo = useRef<any>();
	const userVideo = useRef<any>();
	const connectionRef = useRef<any>();

	const getUserMediaStream = async () => {
		try {
			const _stream_ = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
			setStream(_stream_);
			myVideo.current.srcObject = _stream_;
		} catch (error) {
			return console.error((error as Error).message);
		}
	};
	useEffect(() => {
		getUserMediaStream();
		// socket.on(EVENTS.ME, (id) => setMeId(id));
		// socket.on(EVENTS.NEW_CALL, (data) => {
		// 	setReceivingCall(true);
		// 	setCaller(data.from);
		// 	setName(data.name);
		// 	setCAllerSignal(data.signal);
		// });
	}, []);

	useEffect(() => {
		socket.on(EVENTS.ME, (id) => setMeId(id));
		socket.on(EVENTS.NEW_CALL, (data) => {
			setReceivingCall(true);
			setCaller(data.from);
			setName(data.name);
			setCAllerSignal(data.signal);
		});
	}, []);

	/**
	 * We create a new peer connection, and then we send a signal to the server to tell it that we want to
	 * call a user
	 * @param {string} id - The id of the user you want to call.
	 */
	const callUser = (id: string) => {
		const peer = new Peer({
			initiator: true,
			trickle: false,
			stream: stream,
		});
		peer.on("signal", (data) => {
			socket.emit(EVENTS.NEW_CALL, {
				userToCall: id,
				signalData: data,
				from: meId,
				name: name,
			});
		});
		peer.on("stream", (_stream_) => (userVideo.current.srcObject = _stream_));
		socket.on(EVENTS.CALL_ACCEPTED, (_signal_) => {
			setCallAccepted(true);
			peer.signal(_signal_);
		});
		connectionRef.current = peer;
	};

	/**
	 * When the user answers the call, we create a new peer connection, send the signal to the caller, and
	 * set the user's video stream to the stream we received from the caller
	 */
	const answerCall = () => {
		setCallAccepted(true);
		const peer = new Peer({
			initiator: false,
			trickle: false,
			stream: stream,
		});
		peer.on("signal", (data) => {
			socket.emit(EVENTS.ANSWER_CALL, { signal: data, to: caller });
		});
		peer.on("stream", (_stream_) => (userVideo.current.srcObject = _stream_));
		peer.signal(callerSignal);
		connectionRef.current = peer;
	};

	/**
	 * It sets the callEnded state to true and then destroys the connection
	 */
	const leaveCall = () => {
		setCallEnded(true);
		connectionRef.current.destroy();
	};
	return (
		<AppContext.Provider
			value={{
				meId,
				stream,
				socket,
				receivingCall,
				callAccepted,
				callEnded,
				myVideo,
				userVideo,
				connectionRef,
				callUser,
				answerCall,
				leaveCall,
			}}>
			{children}
		</AppContext.Provider>
	);
};
