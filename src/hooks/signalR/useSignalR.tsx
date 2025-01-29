// import { useCallback, useEffect, useState } from "react";
// import { ConnectionState, UseSignalRReturn } from "../../types/Types";
// import { HubConnection, HubConnectionState } from "@microsoft/signalr"; // Correct import
// import { createHubConnection } from "../../utils/signalR";

// export const useSignalR = (hubUrl: string): UseSignalRReturn => {
//   const [connection, setConnection] = useState<HubConnection | null>(null);
//   const [connectionState, setConnectionState] =
//     useState<ConnectionState>("disconnected");
//   const [messages, setMessages] = useState<
//     { user: string; message: string; timestamp: Date }[]
//   >([]);

//   const handleNewMessage = useCallback((user: string, message: string) => {
//     setMessages((prev) => [...prev, { user, message, timestamp: new Date() }]);
//     console.log("New message:", { user, message });
//   }, []);

//   const startConnection = useCallback(async () => {
//     try {
//       const newConnection = await createHubConnection(hubUrl);

//       newConnection.on("ReceiveMessage", handleNewMessage);

//       newConnection.onclose((error) => {
//         console.log("Connection closed:", error);
//         setConnectionState("disconnected");
//       });

//       newConnection.onreconnecting((error) => {
//         console.log("Reconnecting:", error);
//         setConnectionState("reconnecting");
//       });

//       newConnection.onreconnected((connectionId) => {
//         console.log("Reconnected with ID:", connectionId);
//         setConnectionState("connected");
//       });

//       setConnection(newConnection);
//       setConnectionState("connected");
//     } catch (error) {
//       console.error("Connection error:", error);
//       setConnectionState("error");
//     }
//   }, [hubUrl, handleNewMessage]);

//   useEffect(() => {
//     startConnection();
//     return () => {
//       if (connection) {
//         connection.stop();
//       }
//     };
//   }, [startConnection]);

//   const sendMessage = async (methodName: string, ...args: any[]) => {
//     if (connection?.state === HubConnectionState.Connected) {
//       try {
//         await connection.invoke(methodName, ...args);
//       } catch (error) {
//         console.error("Send error:", error);
//       }
//     }
//   };

//   return {
//     connectionState,
//     messages,
//     sendMessage,
//     error: connectionState === "error",
//   };
// };
