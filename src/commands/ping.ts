import type { Message } from "discord.js";
import { Command } from "@sapphire/framework";
import { ApplyOptions } from "@sapphire/decorators";

@ApplyOptions<Command.Options>({
  name: "ping",
  aliases: ["pong"],
  description: "Ping the bot",
})
export class PingCommand extends Command {
  public async messageRun(message: Message) {
    const msg = await message.channel.send("Pinging...");

    const content = `Pong from JavaScript! Bot Latency ${Math.round(
      this.container.client.ws.ping
    )}ms. API Latency ${msg.createdTimestamp - message.createdTimestamp}ms.`;

    await msg.edit(content);
  }
}
