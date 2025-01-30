import * as signalR from "@microsoft/signalr";

const hubUrl = "https://settl-api.azurewebsites.net/otphub";

class SignalRService {
  private connection: signalR.HubConnection;

  constructor() {
    this.connection = new signalR.HubConnectionBuilder()
      .withUrl(hubUrl, {
        accessTokenFactory: () => localStorage.getItem("bearer") || "", // Retrieve token
        withCredentials: true, // If cross-origin credentials are required
      })
      .withAutomaticReconnect() // Enables auto-reconnect
      .configureLogging(signalR.LogLevel.Information)
      .build();

    this.startConnection();
  }

  private async startConnection(): Promise<void> {
    try {
      await this.connection.start();
      console.log("✅ SignalR Connected!");
    } catch (err) {
      console.error("❌ SignalR Connection Error:", err);
      setTimeout(() => this.startConnection(), 5000); // Retry after 5 seconds
    }
  }

  public async stopConnection(): Promise<void> {
    try {
      await this.connection.stop();
      console.log("⚠ SignalR Disconnected");
    } catch (err) {
      console.error("❌ SignalR Stop Error:", err);
    }
  }

  public on<T>(event: string, callback: (data: T) => void): void {
    this.connection.on(event, callback);
  }

  public off(event: string): void {
    this.connection.off(event);
  }

  public async sendMessage<T>(method: string, data: T): Promise<void> {
    try {
      await this.connection.invoke(method, data);
    } catch (err) {
      console.error("❌ SignalR Send Error:", err);
    }
  }
}

export default new SignalRService();
