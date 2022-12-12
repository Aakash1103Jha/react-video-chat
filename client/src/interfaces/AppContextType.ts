import { Socket } from "socket.io-client";

export interface AppContextType {
	stream: MediaStream | undefined;
	socket: Socket;
	myVideo: any;
	userVideo: any;
	connectionRef: any;
	callAccepted: boolean;
	callEnded: boolean;
	receivingCall: boolean;
	meId: string;

	callUser: (id: string) => void;
	answerCall: () => void;
	leaveCall: () => void;
}
