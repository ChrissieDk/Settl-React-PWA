import {
  HubConnectionBuilder,
  HttpTransportType,
  LogLevel,
} from "@microsoft/signalr";

export const createHubConnection = async (): Promise<signalR.HubConnection> => {
  const token = localStorage.getItem("bearer");
  console.log("Retrieved token from localStorage:", token);

  const hubUrl = "https://settl-api.azurewebsites.net/otphub";

  if (!token) {
    throw new Error("No authentication token found");
  }

  const connection = new HubConnectionBuilder()
    .withUrl(hubUrl, {
      accessTokenFactory: () => token,
      transport: HttpTransportType.WebSockets,
      skipNegotiation: true,
      withCredentials: true,
    })
    .withAutomaticReconnect({
      nextRetryDelayInMilliseconds: (retryContext) => {
        return Math.min(retryContext.elapsedMilliseconds * 2, 10000);
      },
    })
    .configureLogging(LogLevel.Information)
    .build();

  try {
    await connection.start();
    console.log("Connection started with ID:", connection.connectionId);
    return connection;
  } catch (error) {
    console.error("Connection failed:", error);
    throw error;
  }
};
